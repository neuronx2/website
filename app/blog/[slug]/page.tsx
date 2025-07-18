import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { notFound } from 'next/navigation'
import Link from 'next/link'

type RelatedItem = {
  slug: string
  title: string
  excerpt: string
}

async function getRelated(folder: string, slugs: string[]): Promise<RelatedItem[]> {
  const items = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const filePath = path.join(process.cwd(), 'content', folder, `${slug}.md`)
        const fileContent = await fs.promises.readFile(filePath, 'utf8')
        const { data } = matter(fileContent)
        return {
          slug,
          title: data.title,
          excerpt: data.excerpt,
        }
      } catch {
        return null
      }
    })
  )

  return items.filter(Boolean) as RelatedItem[]
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'content/blogs')
  const filenames = await fs.promises.readdir(blogDir)

  return filenames.map((name) => ({
    slug: name.replace(/\.md$/, ''),
  }))
}

export default async function TestSlugPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>
}) {
  console.log('🟢 TestSlugPage is running')
  const awaitedParams = await Promise.resolve(params)
  const slug = decodeURIComponent(awaitedParams.slug)
  const filePath = path.join(process.cwd(), 'content/blogs', `${slug}.md`)

  try {
    await fs.promises.access(filePath)
  } catch {
    return notFound()
  }

  const fileContent = await fs.promises.readFile(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  const processed = await remark().use(html).process(content)

  const relatedSkills = await getRelated('skills', data.relatedSkills || [])
  const relatedIndustries = await getRelated('industries', data.relatedIndustries || [])
  const relatedProjects = await getRelated('projects', data.relatedProjects || [])

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{data.date}</p>
      <article
        className="prose mb-6"
        dangerouslySetInnerHTML={{ __html: processed.toString() }}
      />
      <div className="flex flex-wrap gap-4">
        {relatedSkills.map((item) => (
          <Link key={item.slug} href={`/expertise/skills/${item.slug}`}>
            <button>{item.title}</button>
          </Link>
        ))}
        {relatedIndustries.map((item) => (
          <Link key={item.slug} href={`/expertise/industry/${item.slug}`}>
            <button>{item.title}</button>
          </Link>
        ))}
        {relatedProjects.map((item) => (
          <Link key={item.slug} href={`/projects/${item.slug}`}>
            <button>{item.title}</button>
          </Link>
        ))}
      </div>
    </main>
  )
}