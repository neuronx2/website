import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { notFound } from 'next/navigation'
import Link from 'next/link'

type Props = {
  params: { slug: string }
}

type RelatedItem = {
  slug: string
  title: string
  excerpt: string
}

async function getRelated(folder: string, slugs: string[]): Promise<RelatedItem[]> {
  return slugs.map((slug) => {
    const filePath = path.join(process.cwd(), 'content', folder, `${slug}.md`)
    if (!fs.existsSync(filePath)) return null

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
    }
  }).filter(Boolean) as RelatedItem[]
}

export default async function ProjectPage({ params }: Props) {
  const slug = params.slug
  const filePath = path.join(process.cwd(), 'content/projects', `${slug}.md`)

  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  const processed = await remark().use(html).process(content)

  const [relatedSkills, relatedIndustries, relatedBlogs] = await Promise.all([
    getRelated('skills', data.relatedSkills || []),
    getRelated('industries', data.relatedIndustries || []),
    getRelated('blogs', data.relatedBlogs || []),
  ])

  return (
    <>
      <main className="max-w-5xl mx-auto py-20 px-4 grid gap-8 md:grid-cols-3 bg-gray-50 min-h-screen">
        <div className="md:col-span-2">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-800">{data.title}</h1>
            <p className="text-sm text-gray-500">{data.date}</p>
          </div>
          <article
            className="prose prose-base p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:bg-blue-50 transition duration-300"
            dangerouslySetInnerHTML={{ __html: processed.toString() }}
          />
        </div>

        <aside className="space-y-6">
          {relatedSkills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-green-800">Related Skillsets</h2>
              <div className="grid gap-2">
                {relatedSkills.map((item) => (
                  <Link key={item.slug} href={`/expertise/skills/${item.slug}`}>
                    <div className="cursor-pointer bg-green-100 hover:bg-green-300 text-center py-3 rounded-lg shadow transition duration-300">
                      🧠 {item.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedIndustries.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-yellow-800">Related Industries</h2>
              <div className="grid gap-2">
                {relatedIndustries.map((item) => (
                  <Link key={item.slug} href={`/expertise/industry/${item.slug}`}>
                    <div className="cursor-pointer bg-yellow-100 hover:bg-yellow-300 text-center py-3 rounded-lg shadow transition duration-300">
                      🏭 {item.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedBlogs.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-purple-800">Related Blogs</h2>
              <div className="grid gap-2">
                {relatedBlogs.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}`}>
                    <div className="cursor-pointer bg-purple-100 hover:bg-purple-300 text-center py-3 rounded-lg shadow transition duration-300">
                      📝 {item.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </main>
    </>
  )
}

export async function generateStaticParams() {
  const projectsDir = path.join(process.cwd(), 'content/projects');
  const files = fs.readdirSync(projectsDir);

  return files
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      slug: file.replace(/\.md$/, ''),
    }));
}