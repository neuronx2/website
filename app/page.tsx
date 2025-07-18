import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="max-w-3xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-5xl font-bold text-center">
        Welcome to <span className="text-blue-600">Neuronχ²</span>
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed text-justify">
        On this website, you can easily explore my work across <strong>Industries</strong>, <strong>Business Functions</strong>, <strong>Projects</strong>, and also read some <strong>Blogs</strong>.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed text-justify">
        On the <strong>“About”</strong> page you will find information about my professional experience, qualifications, languages & certifications.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed text-justify">
        With <strong>“Expertise”</strong> & <strong>“Projects”</strong> pages you can easily navigate between skills, industry & projects that are related to one another to have a comprehensive overview of my competence in a given domain.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed text-justify">
        For further questions or contact please visit the <strong>“Contact”</strong> page. Any feedback or input is deeply welcome and appreciated.
      </p>

      <div className="flex flex-wrap justify-center gap-4 pt-6">
        <Link href="/about" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          About
        </Link>
        <Link href="/skills" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Skills
        </Link>
        <Link href="/projects" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Projects
        </Link>
        <Link href="/contact" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Contact
        </Link>
      </div>
    </section>
  )
}