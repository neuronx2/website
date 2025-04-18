// app/expertise/page.tsx

import Link from 'next/link'

export default function ExpertisePage() {
  return (
    <section className="space-y-10">
      <h1 className="text-4xl font-bold mb-6">🧠 Expertise</h1>
      <p className="text-lg text-gray-700 max-w-2xl">
        Explore my core capabilities by skillset or by the industries I’ve worked with.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <Link href="/expertise/skills">
          <div className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer bg-white">
            <h2 className="text-2xl font-semibold mb-2">By Skills 🛠️</h2>
            <p className="text-gray-600">
              Data analytics, strategy, ML, storytelling & more.
            </p>
          </div>
        </Link>

        <Link href="/expertise/industry">
          <div className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer bg-white">
            <h2 className="text-2xl font-semibold mb-2">By Industry 🏭</h2>
            <p className="text-gray-600">
              Ecommerce, fintech, SaaS, media, healthcare & beyond.
            </p>
          </div>
        </Link>
      </div>
    </section>
  )
}