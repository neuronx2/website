import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { remark } from 'remark'
import html from 'remark-html'

type Props = {
  params: { slug: string }
}

export default async function SkillDetailPage({ params }: Props) {
  const slug = params.slug
  const filePath = path.join(process.cwd(), 'content/skills', `${slug}.md`)

  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  const getTitleFromFile = (folder: string, filename: string) => {
    const file = fs.readFileSync(path.join(process.cwd(), `content/${folder}`, `${filename}.md`), 'utf8')
    return matter(file).data.title
  }

  const projectTitleMap = Object.fromEntries((data.relatedProjects || []).map((p: string) => [p, getTitleFromFile('projects', p)]))
  const blogTitleMap = Object.fromEntries((data.relatedBlogs || []).map((b: string) => [b, getTitleFromFile('blogs', b)]))
  const industryTitleMap = Object.fromEntries((data.relatedIndustries || []).map((i: string) => [i, getTitleFromFile('industries', i)]))

  const processedContent = await remark().use(html).process(content)

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
            dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
          />
        </div>

        <aside className="space-y-6">
          {data.relatedIndustries?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-green-800">Related Industries</h2>
              <div className="grid gap-2">
                {data.relatedIndustries.map((industry: string) => (
                  <Link key={industry} href={`/expertise/industry/${industry}`}>
                    <div className="cursor-pointer bg-green-100 hover:bg-green-300 text-center py-3 rounded-lg shadow transition duration-300">
                      🏭 {industryTitleMap[industry]}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {data.relatedProjects?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-yellow-800">Related Projects</h2>
              <div className="grid gap-2">
                {data.relatedProjects.map((project: string) => (
                  <Link key={project} href={`/projects/${project}`}>
                    <div className="cursor-pointer bg-yellow-100 hover:bg-yellow-300 text-center py-3 rounded-lg shadow transition duration-300">
                      📁 {projectTitleMap[project]}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </aside>
      </main>
      {data.relatedBlogs?.length > 0 && (
        <section className="max-w-5xl mx-auto mt-12 space-y-6 px-4">
          <h2 className="text-lg font-semibold mb-2 text-purple-800">Related Blogs</h2>
          <div className="grid gap-2">
            {data.relatedBlogs.map((blog: string) => (
              <Link key={blog} href={`/blog/${blog}`}>
                <div className="cursor-pointer bg-purple-100 hover:bg-purple-300 text-center py-3 rounded-lg shadow transition duration-300">
                  📝 {blogTitleMap[blog]}
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
  const skillsDir = path.join(process.cwd(), 'content/skills');
  const files = fs.readdirSync(skillsDir);

  return files
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      slug: file.replace(/\.md$/, ''),
    }));
}