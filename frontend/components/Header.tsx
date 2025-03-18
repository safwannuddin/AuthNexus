"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const Header = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <header className="fixed top-[3%] left-0 right-0 z-50 pt-safe">
      <div className="mx-auto max-w-[80%] rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg">
        <nav className="px-6 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
          >
            AuthNexus
           
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-5">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="#about"
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  About Us
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="#features"
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Features
                </Link>
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href={process.env.NEXT_PUBLIC_FLUTTER_WEB_URL || "http://localhost:54321"}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all flex items-center text-sm gap-2"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 transition-colors"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-blue-600" />
              )}
            </motion.button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header