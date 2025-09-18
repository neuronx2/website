import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type RelatedItem = {
  slug: string
  title: string
  excerpt: string
}

const colorClasses = {
  blue: 'border-blue-100 bg-blue-50 text-blue-700 hover:border-blue-200 hover:bg-blue-100',
  green: 'border-green-100 bg-green-50 text-green-700 hover:border-green-200 hover:bg-green-100',
  purple: 'border-purple-100 bg-purple-50 text-purple-700 hover:border-purple-200 hover:bg-purple-100',
}

const baseChip =
  'flex w-full items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium text-left transition-colors'

const resolveImagePath = (thumbnail?: string) => {
  if (!thumbnail) return ''
  const trimmed = thumbnail.replace(/^\/+/, '')
  if (trimmed.startsWith('images/')) return `/${trimmed}`
  if (trimmed.startsWith('projects/')) return `/images/projects/${trimmed.replace(/^projects\//, '')}`
  return `/images/${trimmed}`
}

async function getRelated(folder: string, slugs: string[]): Promise<RelatedItem[]> {
  return slugs
    .map((slug) => {
      const filePath = path.join(process.cwd(), 'content', folder, `${slug}.md`)
      if (!fs.existsSync(filePath)) return null
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
      }
    })
    .filter(Boolean) as RelatedItem[]
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params
  const slug = awaitedParams.slug
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
    <main className="max-w-5xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{data.date}</p>
      <div className="mb-10 flex flex-col gap-8 md:flex-row">
        <div className="flex-1 space-y-6 md:pr-8">
          <article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: processed.toString() }}
          />
        </div>
        <aside className="w-full max-w-xs space-y-6 md:w-64">
          {data.thumbnail && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
              <Image
                src={resolveImagePath(data.thumbnail)}
                alt={data.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {relatedSkills.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">🧠 Related Skillsets</h2>
              <div className="mt-2 flex flex-col gap-2">
                {relatedSkills.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/expertise/skills/${item.slug}`}
                    className={`${baseChip} ${colorClasses.blue}`}
                  >
                    <span role="img" aria-hidden="true">
                      🧠
                    </span>
                    <span className="flex-1 truncate">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedIndustries.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-green-700">🏭 Related Industries</h2>
              <div className="mt-2 flex flex-col gap-2">
                {relatedIndustries.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/expertise/industry/${item.slug}`}
                    className={`${baseChip} ${colorClasses.green}`}
                  >
                    <span role="img" aria-hidden="true">
                      🏭
                    </span>
                    <span className="flex-1 truncate">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedBlogs.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-purple-700">📝 Related Blogs</h2>
              <div className="mt-2 flex flex-col gap-2">
                {relatedBlogs.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className={`${baseChip} ${colorClasses.purple}`}
                  >
                    <span role="img" aria-hidden="true">
                      📝
                    </span>
                    <span className="flex-1 truncate">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const projectsDir = path.join(process.cwd(), 'content/projects')
  const files = fs.readdirSync(projectsDir)

  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace(/\.md$/, ''),
    }))
}
