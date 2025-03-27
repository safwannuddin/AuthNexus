"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Rocket, Shield, Book } from "lucide-react"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = ["home", "about", "features", "docs"]
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const bounds = element.getBoundingClientRect()
          return bounds.top <= 100 && bounds.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: "#about", label: "About", icon: Shield },
    { href: "#features", label: "Features", icon: Rocket },
    { href: "#docs", label: "Docs", icon: Book },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 h-12" // Reduced from h-16 to h-12
    >
      <div className={`mx-auto max-w-[85%] h-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/50 backdrop-blur-lg border border-[#00ff41]/10 rounded-b-lg' // Changed from 2xl to lg
          : 'bg-transparent'
      }`}>
        <nav className="h-full px-4 flex justify-between items-center"> {/* Reduced padding */}
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-[140px]" // Reduced width
          >
            <span className="text-lg font-bold bg-gradient-to-r from-[#00ff41] via-[#00f0ff] to-[#ff00ff] bg-clip-text text-transparent">
              AuthNexus
            </span>
            <motion.div
              className="absolute -bottom-0.5 left-0 h-[1.5px] bg-gradient-to-r from-[#00ff41] to-[#00f0ff]"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Centered Navigation */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-[#00ff41]/10">
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className="text-xs font-medium text-gray-300 hover:text-[#00ff41] transition-colors px-2 py-1 flex items-center gap-1.5"
                    onClick={() => setActiveSection(item.href.substring(1))}
                  >
                    <item.icon className="w-3 h-3" />
                    {item.label}
                  </Link>
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-[#00ff41]/10 rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right space for symmetry */}
          <div className="w-[140px]" /> {/* Reduced width to match logo */}
        </nav>
      </div>
    </motion.header>
  )
}

export default Header