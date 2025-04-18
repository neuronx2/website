'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const createMailToLink = () => {
    const subject = encodeURIComponent(`New message from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    return `mailto:nehra.kushagra@gmail.com?subject=${subject}&body=${body}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = createMailToLink()
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">Let’s Connect</h1>
      <p className="text-gray-600 mb-6">
        Have a project idea or want to collaborate? Use the form below, or reach out via email or social.
      </p>

      {/* 📬 Direct Contact Section */}
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-md mb-10 text-gray-700 space-y-2">
        <p>You can also reach me directly:</p>
        <ul className="space-y-1">
          <li>
            📧 Email:{' '}
            <a href="mailto:nehra.kushagra@gmail.com" className="text-blue-600 underline">
              nehra.kushagra@gmail.com
            </a>
          </li>
          <li>
            💼 LinkedIn:{' '}
            <a
              href="https://linkedin.com/in/kushagra-nehra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              linkedin.com/in/kushagra-nehra
            </a>
          </li>
          <li>
            🧭 Xing:{' '}
            <a
              href="https://www.xing.com/profile/kushagra_nehra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              xing.com/profile/kushagra_nehra
            </a>
          </li>
          <li>
            🐙 GitHub:{' '}
            <a
              href="https://github.com/neuronx2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              github.com/neuronx2
            </a>
          </li>
          <li>
            📄 Resume:{' '}
            <a
              href="https://drive.google.com/uc?export=download&id=113RKISycrcdouqu3VXi2DCSh8foPU8As"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Download PDF
            </a>
          </li>
        </ul>
      </div>

      {/* 💬 Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 📝 Info line above the button */}
        <p className="text-sm text-gray-500 italic">
          This form will open your email app to send the message directly.
        </p>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  )
}