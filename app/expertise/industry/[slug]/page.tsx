import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import Image from 'next/image'
import Link from 'next/link'

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const slug = decodeURIComponent(resolvedParams.slug)

  const filePath = path.join(process.cwd(), 'content/industries', `${slug}.md`)
  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  const processed = await remark().use(html).process(content)

  const getTitles = (dir: string, slugs: string[]) => {
    return slugs.map((slug) => {
      const filePath = path.join(process.cwd(), `content/${dir}`, `${slug}.md`)
      if (!fs.existsSync(filePath)) return { slug, title: slug }
      const file = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(file)
      return { slug, title: data.title || slug }
    })
  }

  const skills = data.relatedSkills ? getTitles('skills', data.relatedSkills) : []
  const projects = data.relatedProjects ? getTitles('projects', data.relatedProjects) : []
  const blogs = data.relatedBlogs ? getTitles('blogs', data.relatedBlogs) : []

  return (
    <>
      <main className="max-w-5xl mx-auto py-20 px-4 grid gap-8 md:grid-cols-3 bg-gray-50 min-h-screen">
        <div className="md:col-span-2">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-800">{data.title}</h1>
            {data.thumbnail && (
              <div className="relative w-full h-48 mt-4">
                <Image
                  src={`/images/${data.thumbnail}`}
                  alt={data.title}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            )}
          </div>

          <article
            className="prose prose-base p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:bg-blue-50 transition duration-300"
            dangerouslySetInnerHTML={{ __html: processed.toString() }}
          />
        </div>

        <aside className="space-y-6">
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-green-800">Related Skillsets</h2>
              <div className="grid gap-2">
                {skills.map(({ slug, title }) => (
                  <Link key={slug} href={`/expertise/skills/${slug}`}>
                    <div className="cursor-pointer bg-green-100 hover:bg-green-300 text-center py-3 rounded-lg shadow transition duration-300">
                      🧠 {title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-yellow-800">Related Projects</h2>
              <div className="grid gap-2">
                {projects.map(({ slug, title }) => (
                  <Link key={slug} href={`/projects/${slug}`}>
                    <div className="cursor-pointer bg-yellow-100 hover:bg-yellow-300 text-center py-3 rounded-lg shadow transition duration-300">
                      📁 {title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </main>

      {blogs.length > 0 && (
        <section className="max-w-5xl mx-auto mt-12 space-y-6 px-4">
          <h2 className="text-lg font-semibold mb-2 text-purple-800">Related Blogs</h2>
          <div className="grid gap-2">
            {blogs.map(({ slug, title }) => (
              <Link key={slug} href={`/blog/${slug}`}>
                <div className="cursor-pointer bg-purple-100 hover:bg-purple-300 text-center py-3 rounded-lg shadow transition duration-300">
                  📝 {title}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export async function generateStaticParams() {
  const industriesDir = path.join(process.cwd(), 'content/industries')
  const files = fs.readdirSync(industriesDir)

  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace(/\.md$/, ''),
    }))
}