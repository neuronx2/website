import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date?: string
  thumbnail?: string
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
      thumbnail: data.thumbnail || null,
    }
  }).sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">📝 Blog</h1>
      <p className="text-lg text-gray-600 mb-10">
        Thoughts, lessons, and experiments from my journey in data, strategy, and storytelling.
      </p>

      <div className="space-y-10">
        {posts.map((post) => (
          <div key={post.slug} className="border-b pb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {post.thumbnail && (
                <div className="relative w-full sm:w-40 h-32 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={`/images/${post.thumbnail}`}
                    alt={post.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <p className="text-gray-700 mb-3">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}