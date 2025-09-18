'use client'

import { useRouter } from 'next/navigation'

export default function Footer() {
  const router = useRouter()

  return (
    <footer className="fixed bottom-0 left-0 w-full border-t bg-white/90 backdrop-blur shadow-inner">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2 text-xs text-gray-500 sm:px-6">
        <span>© 2025 Neuron χ² - Made with Data, AI & Coffee ☕</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded border border-gray-300 px-2 py-1 text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-600"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={() => router.forward?.()}
            className="rounded border border-gray-300 px-2 py-1 text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-600"
          >
            Forward →
          </button>
        </div>
      </div>
    </footer>
  )
}
