"use client"
import { motion } from "framer-motion"
import { Blocks, Key, GitMerge, Fingerprint, ScrollText, Vote } from "lucide-react"

const securityFeatures = [
  {
    title: "Zero-Knowledge Proofs",
    icon: <Key className="w-8 h-8" />,
    description: "Privacy-preserving verification without exposing sensitive data",
    badges: ["ZK-SNARKs", "Bulletproofs", "Plonk"]
  },
  {
    title: "Self-Sovereign Identity",
    icon: <Blocks className="w-8 h-8" />,
    description: "Complete user control over digital identity and credentials",
    badges: ["W3C DID", "ERC-725", "Soulbound Tokens"]
  },
  {
    title: "Blockchain Biometrics",
    icon: <Fingerprint className="w-8 h-8" />,
    description: "Decentralized biometric authentication with crypto-binding",
    badges: ["FIDO2", "Web3 Auth", "IPFS Storage"]
  },
  {
    title: "Smart Contract Audits",
    icon: <ScrollText className="w-8 h-8" />,
    description: "Automated credential verification through blockchain logic",
    badges: ["CertiK Audited", "Formal Verification", "ECDSA"]
  },
  {
    title: "Distributed Key Management",
    icon: <GitMerge className="w-8 h-8" />,
    description: "Threshold cryptography for secure key distribution",
    badges: ["Shamir's Secret", "MPC", "HSM Integration"]
  },
  {
    title: "DAO Governance",
    icon: <Vote className="w-8 h-8" />,
    description: "Community-driven protocol updates and standards",
    badges: ["On-Chain Voting", "Token Gated", "Snapshot"]
  }
]

const SecurityCard = ({ feature }: { feature: typeof securityFeatures[number] }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="group p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:border-indigo-100 dark:hover:border-emerald-900 transition-all"
  >
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 bg-gradient-to-br from-indigo-100 to-emerald-100 dark:from-indigo-900/20 dark:to-emerald-900/20 rounded-lg">
        {feature.icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      {feature.badges.map((badge, index) => (
        <motion.span
          key={index}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 rounded-full"
        >
          {badge}
        </motion.span>
      ))}
    </div>
  </motion.div>
)

const SecurityMatters = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400">
            Trust Through Decentralization
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Revolutionizing digital trust with blockchain-native security and privacy-preserving protocols
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {securityFeatures.map((feature, index) => (
            <SecurityCard key={index} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SecurityMatters