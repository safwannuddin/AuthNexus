"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Lock, Zap, CheckCircle } from "lucide-react"
import AppUICard from "./AppUICard"

const heroContent = [
  {
    headline: "AI-Powered Document Verification",
    subtext: "Authenticate documents in seconds with advanced machine learning and fraud detection.",
    icon: Zap,
    color: "from-[#00ff41] via-[#00f0ff] to-[#ff00ff]"
  },
  {
    headline: "Decentralized & Secure",
    subtext: "Your data is protected with blockchain technology, ensuring tamper-proof verification.",
    icon: Lock,
    color: "from-[#ff00ff] via-[#00f0ff] to-[#00ff41]"
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
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % heroContent.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-[85vh] flex items-center justify-center relative z-10">
      {/* Background Effects */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#00ff41]/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </motion.div>

      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="lg:w-[60%] text-center lg:text-left relative">
          {/* Floating Elements */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-[#00ff41]/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative"
            >
              {/* Icon */}
              <motion.div
                className="mb-6 inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {heroContent[index].icon && (
                  (() => {
                    const IconComponent = heroContent[index].icon;
                    return <IconComponent className={`w-12 h-12 bg-gradient-to-r ${heroContent[index].color} bg-clip-text text-transparent`} />;
                  })()
                )}
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className={`bg-gradient-to-r ${heroContent[index].color} bg-clip-text text-transparent`}>
                  {heroContent[index].headline}
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {heroContent[index].subtext}
              </motion.p>

              {/* Features List */}
              <motion.div
                className="grid grid-cols-2 gap-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {["Instant Verification", "Blockchain Secured", "AI Powered", "24/7 Support"].map((feature, i) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-2 text-gray-300"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-[#00ff41]" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => router.push("/onboarding")}  // Make sure this matches your route
                className="relative px-8 py-4 text-lg font-bold text-black group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">
                  Get Started
                  <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00ff41] to-[#00f0ff] rounded-lg"
                  animate={{
                    scale: isHovered ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* App UI Preview */}
        <div className="lg:w-[40%]">
          <AppUICard />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
