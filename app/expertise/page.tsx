// app/expertise/page.tsx

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

function getTitlesFromMarkdown(dirPath: string): string[] {
  const fullPath = path.join(process.cwd(), dirPath)
  const files = fs.readdirSync(fullPath)

  return files.map((filename) => {
    const filePath = path.join(fullPath, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)
    return data.title
  }).filter(Boolean)
}

export default function ExpertisePage() {
  const skills = getTitlesFromMarkdown('content/skills')
  const industries = getTitlesFromMarkdown('content/industries')

  return (
    <section className="space-y-10">
      <h1 className="text-4xl font-bold mb-6">🧠 Expertise</h1>
      <p className="text-lg text-gray-700 max-w-2xl">
        <strong>It's all about data &amp; Bringing insights to the Management for Data facilitated decision making.</strong> 
      </p>
      <p className="text-lg text-gray-700 max-w-2xl">
        On this page, you can explore my areas of expertise—categorized by skillset and industry. From statistical modeling and analytics automation to operations design and innovation strategy, each project and capability here reflects how I use data to solve real business challenges across various functions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white">
          <Link href="/expertise/skills">
            <h2 className="text-2xl font-semibold mb-2 text-blue-600 hover:underline w-fit">By Skillsets 🛠️</h2>
          </Link>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {skills.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </div>
        <div className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white">
          <Link href="/expertise/industry">
            <h2 className="text-2xl font-semibold mb-2 text-blue-600 hover:underline w-fit">By Industry 🏭</h2>
          </Link>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {industries.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}