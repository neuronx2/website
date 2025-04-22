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
  relatedIndustries?: string[]
  relatedSkills?: string[]
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
      relatedIndustries: data.relatedIndustries || [],
      relatedSkills: data.relatedSkills || [],
    }
  }).sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">📁 Projects</h1>
      <ul className="flex flex-col gap-4 mt-6">
        {projects.map((project) => (
          <li key={project.slug}>
            <div className="border rounded-xl bg-white p-4 shadow hover:shadow-md transition flex items-start gap-4 focus-within:ring-2 focus-within:ring-blue-400">
              {project.thumbnail && (
                <Link href={`/projects/${project.slug}`}>
                  <div className="relative flex-shrink-0 w-28 h-28">
                    <Image
                      src={`/images/${project.thumbnail}`}
                      alt={project.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                </Link>
              )}
              <div>
                <Link href={`/projects/${project.slug}`}>
                  <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
                </Link>
                <p className="text-sm text-gray-600 mt-2">{project.excerpt}</p>
                <div className="mt-2 flex flex-col gap-1">
                  {project.relatedIndustries?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.relatedIndustries.map((industrySlug) => {
                        const industryPath = path.join(process.cwd(), 'content/industries', `${industrySlug}.md`)
                        if (!fs.existsSync(industryPath)) return null
                        const industryData = matter(fs.readFileSync(industryPath, 'utf8')).data
                        return (
                          <Link key={industrySlug} href={`/expertise/industry/${industrySlug}`}>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:underline">
                              {industryData.title || industrySlug}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                  {project.relatedSkills?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.relatedSkills.map((skillSlug) => {
                        const skillPath = path.join(process.cwd(), 'content/skills', `${skillSlug}.md`)
                        if (!fs.existsSync(skillPath)) return null
                        const skillData = matter(fs.readFileSync(skillPath, 'utf8')).data
                        return (
                          <Link key={skillSlug} href={`/expertise/skills/${skillSlug}`}>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:underline">
                              {skillData.title || skillSlug}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
                <Link href={`/projects/${project.slug}`}>
                  <span className="inline-block mt-3 text-blue-600 font-medium hover:underline transition">
                    View Project →
                  </span>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}