"use client"

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function FilterableBlogsGrid({ posts }) {
  const [selectedSkill, setSelectedSkill] = useState('')

  const allSkills = useMemo(() => {
    const skillMap = new Map()
    posts.forEach((p) => {
      p.relatedSkills?.forEach((skill) => {
        if (skill && skill.slug && skill.title) {
          skillMap.set(skill.slug, skill.title)
        }
      })
    })
    return Array.from(skillMap.entries()).sort((a, b) => a[1].localeCompare(b[1]))
  }, [posts])

  const filteredPosts = selectedSkill
    ? posts.filter((p) =>
        p.relatedSkills?.some((skill) => skill.slug === selectedSkill)
      )
    : posts

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
          {allSkills.length === 0
            ? <option disabled>No skills available</option>
            : allSkills.map(([slug, title]) => (
                <option key={slug} value={slug}>{title}</option>
              ))}
        </select>
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-gray-500 text-center">No blog posts found for this category.</p>
      )}

      {filteredPosts.map((post) => (
        <div
          key={post.slug}
          className="flex flex-row items-center rounded-lg overflow-hidden shadow bg-white transition w-full max-w-4xl mx-auto hover:shadow-lg"
        >
          {post.thumbnail && (
            <Link href={`/blog/${post.slug}`}>
              <Image
                src={`/images/blogs/${post.thumbnail.replace(/^\/?(blogs|images\/blogs)\//, '')}`}
                alt={post.title}
                width={120}
                height={80}
                className="object-cover w-30 h-20 flex-shrink-0 cursor-pointer"
              />
            </Link>
          )}
          <div className="p-4 flex-1">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold text-gray-900 transition-colors hover:text-blue-600 cursor-pointer">
                {post.title}
              </h2>
            </Link>
            {post.excerpt && (
              <p className="mt-1 text-gray-600 pointer-events-none">{post.excerpt}</p>
            )}
            <Link
              href={`/blog/${post.slug}`}
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