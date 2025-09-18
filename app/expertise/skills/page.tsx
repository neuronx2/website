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

  const customOrder = ['strategy', 'pm', 'prod', 'da', 'bi', 'fin', 'ops', 'ce'] // Customize as needed

  const allSkills: Skill[] = files.map((filename) => {
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

  const skills = allSkills.sort((a, b) => {
    const indexA = customOrder.indexOf(a.slug)
    const indexB = customOrder.indexOf(b.slug)
    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">🧠 Skills</h1>
      <p className="text-md text-gray-600 mb-6">
        For sake of ease and user friendliness, individual skills, understanding of tools, methods & frameworks are clubbed under umbrella descriptions. eg. Dashboarding, Reporting, Forecasting (marketing) are covered under &quot;Data Analyics, Data Science & Machine Learning&quot;. Similarly: Discount Cash Flow (DCF) or anything to do with M&A, can be found under &quot;Financial Planning, Modeling & Scenario Analysis&quot;.
      </p>
      <p className="text-md text-gray-600 mb-6">
        <strong>Associated KPI&rsquo;s, Tools & Methods are also seen in the quick descriptions below:</strong>
      </p>
      <ul className="flex flex-col gap-4 mt-6">
        {skills.map((skill) => (
          <li key={skill.slug}>
            <div className="border rounded-xl bg-white p-4 shadow hover:shadow-md transition flex items-start gap-4 focus-within:ring-2 focus-within:ring-blue-400 group">
              {skill.thumbnail && (
                <div className="relative flex-shrink-0 w-28 h-28">
                  <Link href={`/expertise/skills/${skill.slug}`}>
                    <Image
                      src={`/images/${skill.thumbnail}`}
                      alt={skill.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </Link>
                </div>
              )}
              <div>
                <Link href={`/expertise/skills/${skill.slug}`}>
                  <h2 className="text-xl font-semibold text-gray-800">{skill.title}</h2>
                </Link>
                <p className="text-sm text-gray-600 mt-2">{skill.excerpt}</p>
                <Link href={`/expertise/skills/${skill.slug}`}>
                  <span className="inline-block mt-3 text-blue-600 font-medium group-hover:underline transition">
                    Learn More →
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
