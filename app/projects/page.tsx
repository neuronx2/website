import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import FilterableProjectsGrid from './FilterableProjectsGrid'

export default function ProjectsPage() {
  const dir = path.join(process.cwd(), 'content/projects')
  const files = fs.readdirSync(dir)

  const projects = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      excerpt: data.excerpt || '',
      thumbnail: data.thumbnail || '',
      relatedSkills: (data.relatedSkills || []).map((slug) => {
        const skillPath = path.join(process.cwd(), 'content/skills', `${slug}.md`)
        if (fs.existsSync(skillPath)) {
          const skillContent = fs.readFileSync(skillPath, 'utf8')
          const skillData = matter(skillContent).data
          return { slug, title: skillData.title || slug }
        }
        return { slug, title: slug }
      }),
    }
  })

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">📁 Projects</h1>
      <FilterableProjectsGrid projects={projects} />
    </main>
  )
}