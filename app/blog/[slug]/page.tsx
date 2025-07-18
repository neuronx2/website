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
      const filePath = path.join(process.cwd(), 'content', folder, `${slug}.md`)
      try {
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
  return filenames
    .filter((name) => name.endsWith('.md'))
    .map((name) => ({ slug: name.replace(/\.md$/, '') }))
}

export default async function BlogPostPage(
  props: { params: Promise<{ slug: string }> } // Vercel-compatible
) {
  const { slug } = await props.params
  const decoded = decodeURIComponent(slug)
  const filePath = path.join(process.cwd(), 'content/blogs', `${decoded}.md`)

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
    <main className="max-w-2xl mx-auto py-8 px-4 text-gray-800 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{data.date}</p>
      <article
        className="prose prose-base max-w-none mb-6 bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300"
        dangerouslySetInnerHTML={{ __html: processed.toString() }}
      />
      <div className="flex flex-wrap gap-4 mb-6">
        {relatedSkills.map((item) => (
          <Link key={item.slug} href={`/expertise/skills/${item.slug}`}>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
              {item.title}
            </button>
          </Link>
        ))}
        {relatedIndustries.map((item) => (
          <Link key={item.slug} href={`/expertise/industry/${item.slug}`}>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200">
              {item.title}
            </button>
          </Link>
        ))}
        {relatedProjects.map((item) => (
          <Link key={item.slug} href={`/projects/${item.slug}`}>
            <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">
              {item.title}
            </button>
          </Link>
        ))}
      </div>
    </main>
  )
}