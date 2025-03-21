'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black">
      {/* Cool moving background */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #00ff41 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '24px 24px']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full text-center"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="bg-gradient-to-r from-[#00ff41] via-[#00f0ff] to-[#ff00ff] bg-clip-text text-transparent">
              Welcome to AuthNexus
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Let&apos;s get started with your secure digital identity
          </motion.p>

          <motion.button
            onClick={() => router.push('/onboarding/profile')}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00ff41] via-[#00f0ff] to-[#ff00ff] rounded-full text-black font-bold text-lg
              hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] transition-shadow"
          >
            Start Onboarding
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}