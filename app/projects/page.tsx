import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'

type Project = {
  slug: string
  title: string
  excerpt: string
  date?: string
  thumbnail?: string
}

export default function ProjectsPage() {
  const dir = path.join(process.cwd(), 'content/projects')
  const files = fs.readdirSync(dir)

  const projects: Project[] = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      excerpt: data.excerpt,
      date: data.date || '',
      thumbnail: data.thumbnail || '',
    }
  }).sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">📁 Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`}>
            <div className="border rounded-xl bg-white p-4 hover:shadow-md transition cursor-pointer">
              {project.thumbnail && (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={`/images/${project.thumbnail}`}
                    alt={project.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{project.excerpt}</p>
              <span className="inline-block mt-3 text-blue-600 font-medium hover:underline">
                View Project →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}