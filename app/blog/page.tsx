import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import FilterableBlogsGrid from './FilterableBlogsGrid'

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date?: string
  thumbnail?: string
  relatedSkills?: Array<{ slug: string; title: string }>
}

export default function BlogIndexPage() {
  const dir = path.join(process.cwd(), 'content/blogs')
  const files = fs.readdirSync(dir)

  const posts: BlogPost[] = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      thumbnail: data.thumbnail || '',
      relatedSkills: Array.isArray(data.relatedSkills)
        ? data.relatedSkills.map((slug: string) => {
            const skillPath = path.join(process.cwd(), 'content/skills', `${slug}.md`)
            if (fs.existsSync(skillPath)) {
              const skillContent = fs.readFileSync(skillPath, 'utf8')
              const skillData = matter(skillContent).data
              return { slug, title: skillData.title || slug }
            }
            return { slug, title: slug }
          })
        : [],
    }
  }).sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">📝 Blogs</h1>
      <p className="text-lg text-gray-600 mb-10">
        Thoughts, lessons, and experiments from my journey in data, strategy, and storytelling.
      </p>
      <FilterableBlogsGrid posts={posts} />
    </main>
  )
}
