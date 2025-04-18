import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Neuron χ²',
  description: 'Portfolio of Kushagra — data, strategy, and storytelling.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans bg-white text-gray-800">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto px-6 py-12">{children}</main>
        <Footer />
      </body>
    </html>
  )
}