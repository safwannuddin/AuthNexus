'use client'

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import AppUICard from "./AppUICard"

const heroContent = [
  {
    headline: "AI-Powered Document Verification",
    subtext: "Authenticate documents in seconds with advanced machine learning and fraud detection."
  },
  {
    headline: "Decentralized & Secure",
    subtext: "Your data is protected with blockchain technology, ensuring tamper-proof verification."
  },
  {
    headline: "Seamless User Experience",
    subtext: "Upload, verify, and receive results instantly with our intuitive, AI-driven platform."
  },
  {
    headline: "Trust Redefined with Web3",
    subtext: "Eliminate document forgery and enhance transparency with AI and decentralized ledgers."
  },
  {
    headline: "Your Gateway to Trustless Verification",
    subtext: "Empowering businesses and individuals with cutting-edge document authentication."
  }
]

const HeroSection = () => {
  const [index, setIndex] = useState(0)
  const router = useRouter();

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
              transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.5 }}
              className="relative"
            >
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 15, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
              >
                {heroContent[index].headline}
              </motion.h1>

              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                {heroContent[index].subtext}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Section - 'Get Started' Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              Get Started
            </button>
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

export default HeroSection;
