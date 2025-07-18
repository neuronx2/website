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

// ** This is the complete, working, and formatted file **
export default async function TestSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = decodeURIComponent(params.slug)
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
  const relatedBlogs = await getRelated('blogs', data.relatedBlogs || [])

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      {/* Article Content Section */}
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{data.date}</p>
      <article
        className="prose mb-10" // Added a larger bottom margin for separation
        dangerouslySetInnerHTML={{ __html: processed.toString() }}
      />
      
      {/* Related Sections - Styled to match the screenshot */}
      <div className="space-y-8">
        {/* Related Skills Section (Green) */}
        {relatedSkills.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Related Skillsets</h2>
            <div className="flex flex-col gap-2">
              {relatedSkills.map((item) => (
                <Link key={item.slug} href={`/expertise/skills/${item.slug}`}>
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-green-100 text-green-800 font-medium hover:bg-green-200 transition-colors">
                    <span className="text-lg">🧠</span> {/* Placeholder for icon */}
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Industries Section (Yellow) */}
        {relatedIndustries.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Related Industries</h2>
            <div className="flex flex-col gap-2">
              {relatedIndustries.map((item) => (
                <Link key={item.slug} href={`/expertise/industry/${item.slug}`}>
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-yellow-100 text-yellow-800 font-medium hover:bg-yellow-200 transition-colors">
                    <span className="text-lg">🏛️</span> {/* Placeholder for icon */}
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Related Blogs/Projects Section (Purple) */}
        {(relatedBlogs.length > 0 || relatedProjects.length > 0) && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Related Projects & Blogs</h2>
            <div className="flex flex-col gap-2">
              {relatedProjects.map((item) => (
                <Link key={item.slug} href={`/projects/${item.slug}`}>
                  <div className="flex flex-col gap-1 p-4 rounded-xl bg-purple-100 text-purple-800 font-medium hover:bg-purple-200 transition-colors">
                    <span className="text-lg">✍️</span> {/* Placeholder for icon */}
                    <span className="font-bold">{item.title}</span>
                    <span className="text-sm">{item.excerpt}</span>
                  </div>
                </Link>
              ))}
               {relatedBlogs.map((item) => (
                <Link key={item.slug} href={`/blogs/${item.slug}`}>
                  <div className="flex flex-col gap-1 p-4 rounded-xl bg-purple-100 text-purple-800 font-medium hover:bg-purple-200 transition-colors">
                    <span className="text-lg">✍️</span> {/* Placeholder for icon */}
                    <span className="font-bold">{item.title}</span>
                    <span className="text-sm">{item.excerpt}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}