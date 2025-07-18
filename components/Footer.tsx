export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t bg-white py-2 px-4 flex justify-between items-center text-xs text-gray-500 z-50 shadow-inner">
      <span>© {new Date().getFullYear()} Neuron χ²</span>
      <div className="flex gap-2">
        <a href="/blog" className="px-2 py-1 border rounded hover:bg-gray-100">Blogs</a>
        <a href="/expertise/skills" className="px-2 py-1 border rounded hover:bg-gray-100">Skills</a>
        <a href="/expertise/industry" className="px-2 py-1 border rounded hover:bg-gray-100">Industry</a>
        <a href="/projects" className="px-2 py-1 border rounded hover:bg-gray-100">Projects</a>
      </div>
    </footer>
  )
}