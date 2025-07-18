"use client"

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function FilterableProjectsGrid({ projects }) {
  if (!projects || !Array.isArray(projects)) return null

  const [selectedSkill, setSelectedSkill] = useState('')

  // Build list of unique skills with titles
  const allSkills = useMemo(() => {
    const skillMap = new Map()
    projects.forEach((p) => {
      p.relatedSkills?.forEach((skill) => {
        if (skill && skill.slug && skill.title) {
          skillMap.set(skill.slug, skill.title)
        }
      })
    })
    return Array.from(skillMap.entries()).sort((a, b) => a[1].localeCompare(b[1]))
  }, [projects])

  const filteredProjects = selectedSkill
    ? projects.filter((p) =>
        p.relatedSkills?.some((skill) => skill.slug === selectedSkill)
      )
    : projects

  return (
    <div className="space-y-4 mt-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Skill</label>
        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
        >
          <option value="">All Skills</option>
          {allSkills.map(([slug, title]) => (
            <option key={slug} value={slug}>{title}</option>
          ))}
        </select>
      </div>

      {filteredProjects.map((project) => (
        <div
          key={project.slug}
          className="flex flex-row items-center rounded-lg overflow-hidden shadow bg-white transition w-full max-w-4xl mx-auto hover:shadow-lg"
        >
          {project.thumbnail && (
            <Link href={`/projects/${project.slug}`}>
              <Image
                src={`/images/projects/${project.thumbnail
                  .replace(/^\/?projects\//, '')
                  .replace(/^\/?images\/projects\//, '')}`}
                alt={project.title}
                width={160}
                height={112}
                className="object-cover w-40 h-28 flex-shrink-0 cursor-pointer"
              />
            </Link>
          )}
          <div className="p-4 flex-1">
            <Link href={`/projects/${project.slug}`}>
              <h2 className="text-xl font-semibold text-gray-900 transition-colors hover:text-blue-600 cursor-pointer">
                {project.title}
              </h2>
            </Link>
            {project.excerpt && (
              <p className="mt-1 text-gray-600 pointer-events-none">{project.excerpt}</p>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline cursor-pointer"
            >
              Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}