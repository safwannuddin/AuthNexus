'use client'

import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/ui/hero'  // Note the lowercase 'hero'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
    </main>
  )
}
