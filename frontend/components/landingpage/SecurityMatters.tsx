"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Blocks, Key, GitMerge, Fingerprint, ScrollText, Vote } from "lucide-react"
import { useState } from "react"

const securityFeatures = [
  {
    title: "Zero-Knowledge Proofs",
    icon: Key,
    description: "Privacy-preserving verification without exposing sensitive data",
    badges: ["ZK-SNARKs", "Bulletproofs", "Plonk"],
    gradient: "from-[#00ff41] via-[#00f0ff] to-[#ff00ff]"
  },
  {
    title: "Self-Sovereign Identity",
    icon: Blocks,
    description: "Complete user control over digital identity and credentials",
    badges: ["W3C DID", "ERC-725", "Soulbound"],
    gradient: "from-[#00f0ff] via-[#ff00ff] to-[#00ff41]"
  },
  {
    title: "Blockchain Biometrics",
    icon: Fingerprint,
    description: "Decentralized biometric authentication with crypto-binding",
    badges: ["FIDO2", "Web3 Auth", "IPFS"],
    gradient: "from-[#ff00ff] via-[#00ff41] to-[#00f0ff]"
  },
  {
    title: "Smart Contract Audits",
    icon: ScrollText,
    description: "Automated credential verification through blockchain logic",
    badges: ["CertiK", "Formal Verify", "ECDSA"],
    gradient: "from-[#00ff41] to-[#00f0ff]"
  },
  {
    title: "Distributed Key Management",
    icon: GitMerge,
    description: "Threshold cryptography for secure key distribution",
    badges: ["Shamir", "MPC", "HSM"],
    gradient: "from-[#00f0ff] to-[#ff00ff]"
  },
  {
    title: "DAO Governance",
    icon: Vote,
    description: "Community-driven protocol updates and standards",
    badges: ["On-Chain", "Token", "Snapshot"],
    gradient: "from-[#ff00ff] to-[#00ff41]"
  }
]

const SecurityCard = ({ feature, index }: { feature: typeof securityFeatures[number]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = feature.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group animate-float"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Animated Glow Effect */}
      <motion.div
        className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500
          bg-gradient-to-r ${feature.gradient}`}
        animate={{
          opacity: isHovered ? 0.15 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-lg
        hover:border-[#00ff41]/50 transition-all duration-500 group-hover:transform group-hover:-translate-y-2">
        <div className="flex items-start gap-4 mb-6">
          {/* Enhanced Icon Container */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`p-3 rounded-lg bg-gradient-to-r ${feature.gradient} animate-cyber-gradient
              shadow-lg relative overflow-hidden group-hover:animate-pulse-glow`}
          >
            <Icon className="w-6 h-6 text-black relative z-10" />
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]" />
          </motion.div>
          
          <div>
            <motion.h3 
              className={`text-xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-2
                animate-cyber-gradient cursor-default`}
            >
              {feature.title}
            </motion.h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
              {feature.description}
            </p>
          </div>
        </div>

        {/* Enhanced Badges */}
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {feature.badges.map((badge, idx) => (
              <motion.span
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + idx * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  background: `linear-gradient(to right, ${feature.gradient})`,
                  color: 'black'
                }}
                className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer
                  border border-white/10 bg-black/40 backdrop-blur-sm
                  hover:border-[#00ff41]/50 transition-all duration-300
                  relative overflow-hidden group/badge`}
              >
                <span className="relative z-10">{badge}</span>
                {/* Badge Hover Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover/badge:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(45deg, ${feature.gradient})`,
                    filter: 'blur(8px)'
                  }}
                />
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

const SecurityMatters = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #00ff41 1px, transparent 1px),
            radial-gradient(circle at center, #00f0ff 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 36px 36px'
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
          <h2 className="text-5xl font-bold mb-6 relative inline-block group">
            <span className="bg-gradient-to-r from-[#00ff41] via-[#00f0ff] to-[#ff00ff] bg-clip-text text-transparent
              animate-cyber-gradient cursor-default">
              Security Matters
            </span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00ff41] via-[#00f0ff] to-[#ff00ff]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto group-hover:text-gray-300 transition-colors">
            Next-generation security protocols powered by blockchain and zero-knowledge cryptography
          </p>
        </motion.div>

        {/* Enhanced Grid Layout */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {securityFeatures.map((feature, index) => (
            <SecurityCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SecurityMatters