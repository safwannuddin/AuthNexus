'use client'

import { motion } from "framer-motion"
import { Shield, Upload, Database, Cpu } from "lucide-react"
import { useState, useEffect } from "react"

const iconColors = {
  upload: "#00ff41",
  neural: "#00f0ff",
  blockchain: "#ff00ff"
}

const guideSteps = [
  {
    title: "Quantum-Safe Upload",
    description: "Military-grade encryption meets cutting-edge AI",
    icon: Upload,
    color: iconColors.upload,
    features: [
      "256-bit encryption",
      "Zero-knowledge proofs",
      "Multi-factor verification"
    ],
    stats: {
      speed: "0.5s",
      security: "99.99%",
      format: "Any"
    },
    gradient: "from-[#00ff41] via-[#00f0ff] to-[#0ea5e9]"
  },
  {
    title: "Neural Verification",
    description: "AI-powered document authentication system",
    icon: Cpu,
    color: iconColors.neural,
    features: [
      "Deep learning analysis",
      "Pattern recognition",
      "Fraud detection matrix"
    ],
    stats: {
      accuracy: "99.9%",
      processing: "2.5s",
      coverage: "100%"
    },
    gradient: "from-[#00f0ff] via-[#ff00ff] to-[#00ff41]"
  },
  {
    title: "Blockchain Vault",
    description: "Immutable storage with Sui blockchain",
    icon: Database,
    color: iconColors.blockchain,
    features: [
      "Distributed ledger",
      "Smart contract security",
      "Eternal storage"
    ],
    stats: {
      uptime: "100%",
      retrieval: "1.2s",
      trust: "100%"
    },
    gradient: "from-[#ff00ff] via-[#00ff41] to-[#00f0ff]"
  }
]

const QuickGuide = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % guideSteps.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background Grid */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #00ff41 1px, transparent 1px)',
          backgroundSize: '24px 24px'
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
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00ff41] via-[#00f0ff] to-[#ff00ff] bg-clip-text text-transparent">
            Quantum Verification Protocol
          </h2>
          <p className="text-gray-300 text-lg">Next-gen document verification in three revolutionary steps</p>
        </motion.div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {guideSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                {/* Card */}
                <div 
                  className={`h-full p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm
                    ${index === activeStep ? 'ring-2 ring-[#00ff41]' : ''}`}
                  onClick={() => {
                    setActiveStep(index)
                    setIsAutoPlaying(false)
                  }}
                >
                  {/* Glowing Background */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                    animate={index === activeStep ? {
                      opacity: [0.05, 0.15, 0.05]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />

                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      {/* Enhanced Icon Container */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`p-3 rounded-lg bg-black/50 border border-${step.color}/20`}
                        style={{
                          boxShadow: `0 0 20px ${step.color}20`
                        }}
                      >
                        <Icon 
                          className="w-6 h-6"
                          style={{ color: step.color }}
                        />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>

                    <p className="text-gray-300 mb-6">{step.description}</p>

                    {/* Features with Enhanced Icons */}
                    <div className="space-y-3">
                      {step.features.map((feature, i) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 group"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="p-1 rounded-md bg-black/50"
                          >
                            <Shield 
                              className="w-4 h-4"
                              style={{ color: step.color }}
                            />
                          </motion.div>
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Enhanced Stats */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 grid grid-cols-3 gap-2 pt-4 border-t border-white/10"
                    >
                      {Object.entries(step.stats).map(([key, value]) => (
                        <div key={key} className="text-center group">
                          <motion.div 
                            className="font-mono font-bold text-lg"
                            style={{ color: step.color }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {value}
                          </motion.div>
                          <div className="text-xs text-gray-500 uppercase group-hover:text-gray-300 transition-colors">
                            {key}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Enhanced Connection Line */}
                {index < guideSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8">
                    <motion.div 
                      className="h-[2px] bg-gradient-to-r from-[#00ff41] to-transparent"
                      animate={{
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Enhanced Progress Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {guideSteps.map((step, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300`}
              style={{
                backgroundColor: index === activeStep ? step.color : '#1f2937',
                boxShadow: index === activeStep ? `0 0 10px ${step.color}` : 'none'
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                setActiveStep(index)
                setIsAutoPlaying(false)
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickGuide
