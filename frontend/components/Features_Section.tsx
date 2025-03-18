"use client"

import React, { JSX } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Fingerprint, ShieldCheck, Crosshair, GitMerge, Key, Scroll } from "lucide-react"

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Decentralized Identity",
    description: "Secure, user-controlled digital identities stored on blockchain infrastructure.",
    icon: <Fingerprint size={32} />,
    color: "from-blue-600 via-indigo-500 to-blue-400"
  },
  {
    id: 2,
    title: "Military-Grade Security",
    description: "Quantum-resistant cryptography protecting all verification processes.",
    icon: <ShieldCheck size={32} />,
    color: "from-purple-600 via-violet-500 to-purple-400"
  },
  {
    id: 3,
    title: "Zero-Knowledge Proofs",
    description: "Verify credentials without exposing sensitive personal information.",
    icon: <Crosshair size={32} />,
    color: "from-emerald-600 via-teal-500 to-emerald-400"
  },
  {
    id: 4,
    title: "Cross-Platform Trust",
    description: "Seamless interoperability across Web2 and Web3 applications.",
    icon: <GitMerge size={32} />,
    color: "from-rose-600 via-pink-500 to-rose-400"
  },
  {
    id: 5,
    title: "Self-Sovereign Identity",
    description: "Complete user control over personal data and sharing permissions.",
    icon: <Key size={32} />,
    color: "from-amber-600 via-orange-500 to-amber-400"
  },
  {
    id: 6,
    title: "Smart Contract Verification",
    description: "Automated credential validation through blockchain protocols.",
    icon: <Scroll size={32} />,
    color: "from-indigo-600 via-blue-500 to-indigo-400"
  }
];

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-emerald-400 animate-gradient-shift"
        >
          Decentralized Identity Revolution
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 dark:from-indigo-900/20 dark:to-emerald-900/20 rounded-3xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
              rotate: [0, 0.5, -0.5, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity
            }}
          />

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  activeFeature === index 
                    ? 'bg-gradient-to-br shadow-2xl scale-[1.02] border-2 border-white/30' 
                    : 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border-2 border-transparent'
                } ${feature.color}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveFeature(index)}
              >
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/10 dark:bg-black/20 rounded-2xl backdrop-blur-sm"
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10">
                  <motion.div
                    animate={activeFeature === index ? { 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4 text-white drop-shadow-lg"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-white drop-shadow-md">
                    {feature.title}
                  </h3>
                  <p className="text-gray-200/90 dark:text-gray-300/90 text-sm leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="sticky top-24 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-2xl h-[420px] border-2 border-white/10 backdrop-blur-lg"
                style={{
                  background: `linear-gradient(45deg, ${features[activeFeature].color.replace(/from|via|to/g, '').split(' ')[0]}, ${features[activeFeature].color.split(' ')[2]})`
                }}
              >
                <div className="text-white relative">
                  <div className="mb-6 animate-float">
                    <div className="relative inline-block">
                      {features[activeFeature].icon}
                      <div className="absolute inset-0 bg-current blur-2xl opacity-20 rounded-full" />
                    </div>
                  </div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                  >
                    {features[activeFeature].title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-100/90 leading-relaxed font-medium"
                  >
                    {features[activeFeature].description}
                  </motion.p>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                  {features.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        activeFeature === index 
                          ? 'bg-white scale-150' 
                          : 'bg-white/30 scale-100'
                      }`}
                      initial={{ scale: 0.5 }}
                      animate={{ 
                        scale: activeFeature === index ? 1.5 : 1,
                        backgroundColor: activeFeature === index 
                          ? features[index].color.split(' ')[2] 
                          : 'rgba(255,255,255,0.3)'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection