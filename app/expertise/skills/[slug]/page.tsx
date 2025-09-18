import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { remark } from 'remark'
import html from 'remark-html'

type Props = {
  params: Promise<{ slug: string }>
}

const colorClasses = {
  green: 'border-green-100 bg-green-50 text-green-700 hover:border-green-200 hover:bg-green-100',
  blue: 'border-blue-100 bg-blue-50 text-blue-700 hover:border-blue-200 hover:bg-blue-100',
  purple: 'border-purple-100 bg-purple-50 text-purple-700 hover:border-purple-200 hover:bg-purple-100',
}

const baseChip = 'flex w-full items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium text-left transition-colors'

export default async function SkillDetailPage({ params }: Props) {
  const awaitedParams = await params
  const slug = awaitedParams.slug
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
    <main className="max-w-5xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <div className="mb-10 flex flex-col gap-8 md:flex-row">
        <div className="flex-1 space-y-6 md:pr-8">
          <article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
          />
        </div>
        <aside className="w-full max-w-xs space-y-6 md:w-64">
          {data.thumbnail && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
              <Image
                src={`/images/${data.thumbnail}`}
                alt={data.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {data.relatedIndustries?.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-green-700">🏭 Related Industries</h2>
              <div className="mt-2 flex flex-col gap-2">
                {data.relatedIndustries.map((industry: string) => (
                  <Link
                    key={industry}
                    href={`/expertise/industry/${industry}`}
                    className={`${baseChip} ${colorClasses.green}`}
                  >
                    <span role="img" aria-hidden="true">🏭</span>
                    <span className="flex-1 truncate">{industryTitleMap[industry]}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {data.relatedProjects?.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">📁 Related Projects</h2>
              <div className="mt-2 flex flex-col gap-2">
                {data.relatedProjects.map((project: string) => (
                  <Link
                    key={project}
                    href={`/projects/${project}`}
                    className={`${baseChip} ${colorClasses.blue}`}
                  >
                    <span role="img" aria-hidden="true">📁</span>
                    <span className="flex-1 truncate">{projectTitleMap[project]}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {data.relatedBlogs?.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-purple-700">📝 Related Blogs</h2>
              <div className="mt-2 flex flex-col gap-2">
                {data.relatedBlogs.map((blog: string) => (
                  <Link
                    key={blog}
                    href={`/blog/${blog}`}
                    className={`${baseChip} ${colorClasses.purple}`}
                  >
                    <span role="img" aria-hidden="true">📝</span>
                    <span className="flex-1 truncate">{blogTitleMap[blog]}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const skillsDir = path.join(process.cwd(), 'content/skills')
  const files = fs.readdirSync(skillsDir)

  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace(/\.md$/, ''),
    }))
}
