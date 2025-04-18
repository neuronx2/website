'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/expertise', label: 'Expertise' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full border-b bg-white px-6 py-4 shadow-sm">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Neuronχ²
        </Link>
        <ul className="flex space-x-4 text-sm font-medium">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${pathname === href ? 'text-blue-600 underline' : ''} hover:text-blue-600`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}