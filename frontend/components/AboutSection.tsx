"use client"

import { motion } from "framer-motion"
import { 
  Shield, Cpu, Building, GitMerge, Database, Key,
  Linkedin, Github, Twitter, Mail // Add these icons
} from "lucide-react"

const highlights = [
  { value: "Beta", label: "Current Phase", color: "from-[#00ff41] to-[#00f0ff]" },
  { value: "Q2 2024", label: "Launch Date", color: "from-[#00f0ff] to-[#ff00ff]" },
  { value: "3", label: "Blockchain Networks", color: "from-[#ff00ff] to-[#00ff41]" },
  { value: "256-bit", label: "Encryption", color: "from-[#00ff41] to-[#ff00ff]" }
]

const techStack = [
  {
    title: "Zero-Knowledge Security",
    description: "Privacy-first approach with ZK-SNARKs and quantum-resistant encryption",
    icon: Shield,
    color: "#00ff41"
  },
  {
    title: "Neural Document Processing",
    description: "State-of-the-art machine learning for document verification",
    icon: Cpu,
    color: "#00f0ff"
  },
  {
    title: "Multi-Chain Architecture",
    description: "Built on Ethereum, Polygon, and Sui blockchains",
    icon: GitMerge,
    color: "#ff00ff"
  }
]

const targetIndustries = [
  {
    name: "Financial Services",
    description: "KYC compliance and fraud prevention",
    icon: Building
  },
  {
    name: "Healthcare",
    description: "Credential verification and records management",
    icon: Database
  },
  {
    name: "Education",
    description: "Academic credential authentication",
    icon: Key
  }
]

const founderInfo = {
  name: "Mohd Safwan Uddin",
  role: "Founder & CEO",
  description: `Passionate about revolutionizing digital identity verification through blockchain 
    and AI innovation. With expertise in cybersecurity and distributed systems, leading AuthNexus 
    to transform how we verify and secure digital identities.`,
  achievements: [
    "Full Stack Developer",
    "Blockchain Enthusiast",
    "AI/ML Researcher",
    "Cybersecurity Expert"
  ],
  social: [
    { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/yourusername", label: "Twitter" },
    { icon: Mail, href: "mailto:your@email.com", label: "Email" }
  ]
}

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
            Next-Gen Identity Verification
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Pioneering blockchain-based identity solutions with military-grade security and AI-powered verification
          </p>
        </motion.div>

        {/* Project Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ff41]/10 to-[#00f0ff]/10 rounded-lg blur-xl group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 rounded-lg border border-[#00ff41]/20 bg-black/50">
                <h3 className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                  {item.value}
                </h3>
                <p className="text-gray-400">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Overview */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Core Technology</h3>
            <div className="space-y-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className={`p-3 rounded-lg bg-black/50 border border-[${tech.color}]/20 group-hover:border-[${tech.color}]/40 transition-colors`}>
                    <tech.icon className="w-6 h-6" style={{ color: tech.color }} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{tech.title}</h4>
                    <p className="text-gray-400">{tech.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Industry Focus</h3>
            <div className="space-y-4">
              {targetIndustries.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border border-[#00ff41]/20 bg-black/30 hover:bg-black/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <industry.icon className="w-5 h-5 text-[#00ff41] mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">{industry.name}</h4>
                      <p className="text-gray-400 text-sm">{industry.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">{founderInfo.name}</h3>
            <p className="text-gray-400 mb-4">{founderInfo.role}</p>
            <p className="text-gray-300 mb-6">{founderInfo.description}</p>
            <div className="flex justify-center space-x-4">
              {founderInfo.social.map((item) => (
                <a key={item.label} href={item.href} className="text-gray-400 hover:text-[#00ff41]">
                  <item.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Updated CTA */}
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
              Join the future of digital identity verification
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection