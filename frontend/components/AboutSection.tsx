"use client"

import { motion } from "framer-motion"
import { 
  Shield, Globe, Cpu, GitMerge, Sparkles, 
  Building, Users, BarChart, Network 
} from "lucide-react"

const stats = [
  { value: "2M+", label: "Verifications", color: "from-[#00ff41] to-[#00f0ff]" },
  { value: "150+", label: "Enterprise Clients", color: "from-[#00f0ff] to-[#ff00ff]" },
  { value: "99.9%", label: "Uptime", color: "from-[#ff00ff] to-[#00ff41]" },
  { value: "<0.5s", label: "Verification Speed", color: "from-[#00ff41] to-[#ff00ff]" }
]

const partners = [
  "Major Financial Institutions",
  "Government Agencies",
  "Healthcare Providers",
  "Educational Institutions"
]

const AboutSection = () => {
  return (
    <section id="about" className="relative py-28 px-4 md:px-8 bg-black">
      {/* Enhanced Background Effects */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
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

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00ff41] via-[#00f0ff] to-[#ff00ff] bg-clip-text text-transparent">
            Revolutionizing Digital Identity
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AuthNexus is building the future of digital identity verification, powered by blockchain technology and zero-knowledge proofs.
          </p>
        </motion.div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ff41]/10 to-[#00f0ff]/10 rounded-lg blur-xl group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 rounded-lg border border-[#00ff41]/20 bg-black/50">
                <h3 className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Overview */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Our Technology Stack</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded bg-[#00ff41]/10 text-[#00ff41]">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Military-Grade Security</h4>
                  <p className="text-gray-400">Quantum-resistant encryption with 256-bit security and multi-layer protection</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded bg-[#00f0ff]/10 text-[#00f0ff]">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">AI-Powered Verification</h4>
                  <p className="text-gray-400">Advanced machine learning models for real-time document authentication</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded bg-[#ff00ff]/10 text-[#ff00ff]">
                  <Network className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Decentralized Infrastructure</h4>
                  <p className="text-gray-400">Built on Ethereum, Polygon, and Sui blockchains for maximum reliability</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Enterprise Solutions</h3>
            <div className="space-y-4">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border border-[#00ff41]/20 bg-black/30"
                >
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-[#00ff41]" />
                    <span className="text-gray-300">{partner}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-block relative">
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-[#00ff41]/20 via-[#00f0ff]/20 to-[#ff00ff]/20 rounded-xl blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            <p className="text-2xl text-white relative">
              Ready to secure your digital identity?
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection