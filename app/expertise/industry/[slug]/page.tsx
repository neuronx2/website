import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import Image from 'next/image'
import Link from 'next/link'

const colorClasses = {
  blue: 'border-blue-100 bg-blue-50 text-blue-700 hover:border-blue-200 hover:bg-blue-100',
  yellow: 'border-yellow-100 bg-yellow-50 text-yellow-700 hover:border-yellow-200 hover:bg-yellow-100',
}

const baseChip = 'flex w-full items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium text-left transition-colors'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function IndustryDetailPage({ params }: Props) {
  const awaitedParams = await params
  const slug = decodeURIComponent(awaitedParams.slug)

  const filePath = path.join(process.cwd(), 'content/industries', `${slug}.md`)
  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  const processed = await remark().use(html).process(content)

  const getTitles = (dir: string, slugs: string[]) =>
    slugs
      .map((entry) => {
        const entryPath = path.join(process.cwd(), `content/${dir}`, `${entry}.md`)
        if (!fs.existsSync(entryPath)) return { slug: entry, title: entry }
        const entryContent = fs.readFileSync(entryPath, 'utf8')
        const { data } = matter(entryContent)
        return { slug: entry, title: data.title || entry }
      })

  const skills = data.relatedSkills ? getTitles('skills', data.relatedSkills) : []
  const projects = data.relatedProjects ? getTitles('projects', data.relatedProjects) : []

  return (
    <main className="max-w-5xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <div className="mb-10 flex flex-col gap-8 md:flex-row">
        <article className="prose prose-lg flex-1 md:pr-8" dangerouslySetInnerHTML={{ __html: processed.toString() }} />
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

          {skills.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-700">🧠 Related Skillsets</h3>
              <div className="mt-2 flex flex-col gap-2">
                {skills.map(({ slug, title }) => (
                  <Link
                    key={slug}
                    href={`/expertise/skills/${slug}`}
                    className={`${baseChip} ${colorClasses.blue}`}
                  >
                    <span role="img" aria-hidden="true">🧠</span>
                    <span className="flex-1 truncate">{title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-yellow-700">📁 Related Projects</h3>
              <div className="mt-2 flex flex-col gap-2">
                {projects.map(({ slug, title }) => (
                  <Link
                    key={slug}
                    href={`/projects/${slug}`}
                    className={`${baseChip} ${colorClasses.yellow}`}
                  >
                    <span role="img" aria-hidden="true">📁</span>
                    <span className="flex-1 truncate">{title}</span>
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
  const industriesDir = path.join(process.cwd(), 'content/industries')
  const files = fs.readdirSync(industriesDir)

  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace(/\.md$/, ''),
    }))
}
