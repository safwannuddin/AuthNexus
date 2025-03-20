"use client"

import React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Fingerprint, ShieldCheck, Crosshair, Lock, Cpu, Database, GitMerge,  } from "lucide-react"

const features = [
  {
    id: 1,
    title: "Decentralized Identity",
    description: "Secure, user-controlled digital identities stored on blockchain infrastructure.",
    icon: <Fingerprint size={32} />,
    gradient: "from-[#00ff41] via-[#00f0ff] to-[#ff00ff]",
    stats: {
      security: "99.9%",
      speed: "0.5s",
      trust: "100%"
    }
  },
  {
    id: 2,
    title: "Military-Grade Security",
    description: "Quantum-resistant cryptography protecting all verification processes.",
    icon: <ShieldCheck size={32} />,
    gradient: "from-[#00f0ff] via-[#ff00ff] to-[#00ff41]",
    stats: {
      encryption: "256-bit",
      protection: "100%",
      uptime: "24/7"
    }
  },
  {
    id: 3,
    title: "Zero-Knowledge Proofs",
    description: "Verify credentials without exposing sensitive personal information.",
    icon: <Crosshair size={32} />,
    gradient: "from-[#ff00ff] via-[#00ff41] to-[#00f0ff]",
    stats: {
      privacy: "100%",
      verification: "2.5s",
      accuracy: "99.9%"
    }
  },
  {
    id: 4,
    title: "AI-Powered Verification",
    description: "Advanced machine learning algorithms for real-time document authentication.",
    icon: <Cpu size={32} />,
    gradient: "from-[#00ff41] to-[#00f0ff]",
    stats: {
      accuracy: "99.99%",
      processing: "0.3s",
      detection: "100%"
    }
  },
  {
    id: 5,
    title: "Distributed Storage",
    description: "Secure document storage across decentralized nodes with instant retrieval.",
    icon: <Database size={32} />,
    gradient: "from-[#00f0ff] to-[#ff00ff]",
    stats: {
      redundancy: "100%",
      access: "0.1s",
      availability: "99.99%"
    }
  },
  {
    id: 6,
    title: "Smart Contract Security",
    description: "Automated verification through audited blockchain smart contracts.",
    icon: <Lock size={32} />,
    gradient: "from-[#00ff41] via-[#ff00ff] to-[#00f0ff]",
    stats: {
      audited: "100%",
      automated: "24/7",
      secure: "100%"
    }
  },
  {
    id: 7,
    title: "Cross-Chain Integration",
    description: "Seamless verification across multiple blockchain networks.",
    icon: <GitMerge size={32} />,
    gradient: "from-[#00f0ff] via-[#00ff41] to-[#ff00ff]",
    stats: {
      chains: "20+",
      bridges: "100%",
      sync: "real-time"
    }
  }
]

const FeaturesSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Enhanced Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 255, 65, 0.15) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(0, 240, 255, 0.15) 0%, transparent 30%),
            radial-gradient(circle at center, #00ff41 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 24px 24px, 24px 24px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '24px 24px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <motion.h2 
              className="text-5xl font-bold mb-6 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-[#00ff41] via-[#00f0ff] to-[#ff00ff] bg-clip-text text-transparent
                relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#00ff41] before:to-[#00f0ff] 
                before:blur-xl before:opacity-30 before:-z-10">
                Revolutionary Features
              </span>
            </motion.h2>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, #00ff41, #00f0ff, #ff00ff, #00ff41)',
                backgroundSize: '200% 100%'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '200% 50%']
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          <motion.p 
            className="text-xl text-gray-400 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Next-generation authentication powered by blockchain
          </motion.p>
        </motion.div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="relative feature-card-hover"
            >
              {/* Enhanced Card Background */}
              <div className="absolute inset-0 rounded-xl bg-black/30 backdrop-blur-xl" />
              
              {/* Enhanced Glowing Border */}
              <motion.div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r ${feature.gradient}`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredFeature === index ? 0.15 : 0.05,
                  scale: hoveredFeature === index ? 1.02 : 1
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Content Container */}
              <div className="relative p-6 rounded-xl border border-white/10">
                {/* Enhanced Icon */}
                <motion.div
                  className={`
                    relative w-16 h-16 mb-6 rounded-lg
                    bg-gradient-to-r ${feature.gradient}
                    p-0.5 animate-neon-pulse
                  `}
                >
                  <div className="relative w-full h-full bg-black/90 rounded-[7px] flex items-center justify-center">
                    <motion.div
                      animate={hoveredFeature === index ? {
                        scale: [1, 1.1, 1],
                        y: [0, -2, 0]
                      } : {}}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut"
                      }}
                      className="text-[#00ff41]"
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enhanced Text Content */}
                <motion.h3 
                  className={`text-xl font-bold mb-3 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                  animate={hoveredFeature === index ? { scale: 1.05 } : { scale: 1 }}
                >
                  {feature.title}
                </motion.h3>
                <p className="text-gray-400 mb-6 transition-colors duration-300 group-hover:text-gray-300">
                  {feature.description}
                </p>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  {Object.entries(feature.stats).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      className="text-center"
                      animate={hoveredFeature === index ? {
                        y: [0, -2, 0],
                        transition: { delay: i * 0.1 }
                      } : {}}
                    >
                      <motion.div 
                        className="text-[#00ff41] font-mono font-bold text-lg mb-1"
                        animate={hoveredFeature === index ? {
                          scale: [1, 1.1, 1],
                          transition: { delay: i * 0.1 }
                        } : {}}
                      >
                        {value}
                      </motion.div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        {key}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection