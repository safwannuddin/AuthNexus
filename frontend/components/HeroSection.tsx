"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import AppUICard from "./AppUICard"
import DownloadButtons from "./DownloadButtons"



const heroContent = [
  {
    headline: "Revolutionizing Payments with Crypto & UPI Fusion",
    subtext: "Experience borderless transactions powered by blockchain technology and instant UPI settlements"
  },
  {
    headline: "One Platform, Infinite Possibilities",
    subtext: "Where cryptocurrency meets UPI - Bridging traditional finance with Web3 ecosystems"
  },
  {
    headline: "Next-Gen Financial Infrastructure",
    subtext: "Enterprise-grade payment solutions combining blockchain security with UPI's convenience"
  },
  {
    headline: "Your Money, Reimagined",
    subtext: "Zero-friction transactions across currencies, chains, and payment networks"
  },
  {
    headline: "Powering the Economy of Tomorrow",
    subtext: "Next-generation financial tools for businesses and developers building in Web3"
  }
]

const HeroSection = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % heroContent.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative z-10 pt-[5%]">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-8">
        {/* Text Content (60% width) */}
        <div className="lg:w-[60%] text-center lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.9 }}
              transition={{ 
                type: "spring",
                stiffness: 120,
                damping: 20,
                duration: 0.5
              }}
              className="relative"
            >
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 140,
                  damping: 15,
                  delay: 0.2
                }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
              >
                {heroContent[index].headline}
              </motion.h1>

              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                  delay: 0.4
                }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                {heroContent[index].subtext}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Section - Only Download Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <DownloadButtons />
          </motion.div>
        </div>

        {/* App UI Card (30% width) */}
        <div className="lg:w-[30%] mt-12 lg:mt-0">
          <AppUICard />
        </div>
      </div>
    </section>
  )
}

export default HeroSection