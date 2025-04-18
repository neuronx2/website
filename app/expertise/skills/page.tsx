import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'

type Skill = {
  slug: string
  title: string
  excerpt: string
  thumbnail?: string
}

export default function SkillsPage() {
  const dir = path.join(process.cwd(), 'content/skills')
  const files = fs.readdirSync(dir)

  const skills: Skill[] = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      excerpt: data.excerpt,
      thumbnail: data.thumbnail || '',
    }
  })

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">🧠 Skills</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <Link key={skill.slug} href={`/expertise/skills/${skill.slug}`}>
            <div className="border rounded-xl bg-white p-4 hover:shadow-md transition cursor-pointer">
              {skill.thumbnail && (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={`/images/${skill.thumbnail}`}
                    alt={skill.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-800">{skill.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{skill.excerpt}</p>
              <span className="inline-block mt-3 text-blue-600 font-medium hover:underline">
                Learn More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}