import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  params: { slug: string }
}

export default async function IndustryDetailPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug)

  const filePath = path.join(process.cwd(), 'content/industries', `${slug}.md`)
  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  const processed = await remark().use(html).process(content)

  // Helper to get titles from .md files for related items
  const getTitles = (dir: string, slugs: string[]) => {
    return slugs.map((slug) => {
      const filePath = path.join(process.cwd(), `content/${dir}`, `${slug}.md`);
      if (!fs.existsSync(filePath)) return { slug, title: slug };
      const file = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(file);
      return { slug, title: data.title || slug };
    });
  };

  const skills = data.relatedSkills ? getTitles('skills', data.relatedSkills) : [];
  const projects = data.relatedProjects ? getTitles('projects', data.relatedProjects) : [];
  const blogs = data.relatedBlogs ? getTitles('blogs', data.relatedBlogs) : [];

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
      <article className="prose prose-lg mb-12" dangerouslySetInnerHTML={{ __html: processed.toString() }} />

      <div className="space-y-6 mt-6">
        {skills.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Related Skillsets</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map(({ slug, title }) => (
                <Link key={slug} href={`/expertise/skills/${slug}`}>
                  <button className="px-2 py-1 bg-gray-100 text-[10px] rounded hover:bg-blue-100">🧠 {title}</button>
                </Link>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Related Projects</h3>
            <div className="flex flex-wrap gap-3">
              {projects.map(({ slug, title }) => (
                <Link key={slug} href={`/projects/${slug}`}>
                  <button className="px-2 py-1 bg-gray-100 text-[10px] rounded hover:bg-blue-100">📁 {title}</button>
                </Link>
              ))}
            </div>
          </div>
        )}

        {blogs.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Related Blogs</h3>
            <div className="flex flex-wrap gap-3">
              {blogs.map(({ slug, title }) => (
                <Link key={slug} href={`/blog/${slug}`}>
                  <button className="px-2 py-1 bg-gray-100 text-[10px] rounded hover:bg-blue-100">📝 {title}</button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}