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

export default async function BlogPostPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug)
  const filePath = path.join(process.cwd(), 'content/blogs', `${slug}.md`)

  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  const processed = await remark().use(html).process(content)

  const [relatedSkills, relatedIndustries, relatedProjects] = await Promise.all([
    getRelated('skills', data.relatedSkills || []),
    getRelated('industries', data.relatedIndustries || []),
    getRelated('projects', data.relatedProjects || []),
  ])

  return (
    <main className="max-w-3xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{data.date}</p>
      <article
        className="prose prose-lg max-w-none mb-10"
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