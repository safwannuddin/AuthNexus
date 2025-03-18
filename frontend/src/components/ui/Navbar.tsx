'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          AuthNexus
        </Link>
        
        {/* Desktop Navigation */}
        <div className="flex space-x-6"> {/* Changed from hidden md:flex to just flex */}
          <Link href="/features" className="text-gray-600 hover:text-blue-600">
            Features
          </Link>
          <Link href="/docs" className="text-gray-600 hover:text-blue-600">
            Docs
          </Link>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-3 space-y-3">
          <Link href="/features" className="block text-gray-600 hover:text-blue-600">
            Features
          </Link>
          <Link href="/docs" className="block text-gray-600 hover:text-blue-600">
            Docs
          </Link>
          <Link
            href="/dashboard"
            className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}