import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'

type Industry = {
  slug: string
  title: string
  excerpt: string
  thumbnail?: string
}

export default function IndustryPage() {
  const dir = path.join(process.cwd(), 'content/industries')
  const files = fs.readdirSync(dir)

  const industries: Industry[] = files.map((filename) => {
    const filePath = path.join(dir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title,
      excerpt: data.excerpt,
      thumbnail: data.thumbnail || null,
    }
  })

  return (
    <main className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">🏭 Industries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {industries.map((industry) => (
          <Link key={industry.slug} href={`/expertise/industry/${industry.slug}`}>
            <div className="p-4 border rounded-xl bg-white shadow hover:shadow-md transition">
              {industry.thumbnail && (
                <Image
                  src={`/images/${industry.thumbnail}`}
                  alt={industry.title}
                  width={400}
                  height={200}
                  className="rounded-md mb-4 object-cover h-40 w-full"
                />
              )}
              <h2 className="text-xl font-semibold">{industry.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{industry.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}