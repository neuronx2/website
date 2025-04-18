import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { remark } from 'remark'
import html from 'remark-html'

type Props = {
  params: { slug: string }
}

export default async function SkillDetailPage({ params }: Props) {
  const slug = params.slug
  const filePath = path.join(process.cwd(), 'content/skills', `${slug}.md`)

  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  const processedContent = await remark().use(html).process(content)

  return (
    <main className="max-w-3xl mx-auto py-12 px-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      {data.thumbnail && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={`/images/${data.thumbnail}`}
            alt={data.title}
            fill
            className="rounded-md object-cover"
          />
        </div>
      )}

      <article
        className="prose prose-lg mb-12"
        dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
      />

      <div className="flex flex-wrap gap-3">
        {data.relatedIndustries?.map((industry: string) => (
          <Link key={industry} href={`/expertise/industry/${industry}`}>
            <button className="px-4 py-2 bg-gray-100 text-sm rounded hover:bg-blue-100">
              🏭 {industry}
            </button>
          </Link>
        ))}

        {data.relatedProjects?.map((project: string) => (
          <Link key={project} href={`/projects/${project}`}>
            <button className="px-4 py-2 bg-gray-100 text-sm rounded hover:bg-blue-100">
              📁 {project}
            </button>
          </Link>
        ))}

        {data.relatedBlogs?.map((blog: string) => (
          <Link key={blog} href={`/blog/${blog}`}>
            <button className="px-4 py-2 bg-gray-100 text-sm rounded hover:bg-blue-100">
              📝 {blog}
            </button>
          </Link>
        ))}
      </div>
    </main>
  )
}