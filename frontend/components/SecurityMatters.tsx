"use client"
import { motion } from "framer-motion"
import { ShieldCheck, LockKeyhole, Fingerprint, ScanEye, BadgeCheck, CircuitBoard } from "lucide-react"

const securityFeatures = [
  {
    title: "Military-Grade Encryption",
    icon: <LockKeyhole className="w-8 h-8" />,
    description: "Quantum-resistant algorithms & AES-256 protection for all transactions",
    badges: ["NIST Certified", "FIPS 140-2"]
  },
  {
    title: "Regulatory Compliance",
    icon: <BadgeCheck className="w-8 h-8" />,
    description: "Full adherence to RBI, NPCI, FATF Travel Rule & global standards",
    badges: ["ISO 27001", "PCI-DSS", "SOC 2"]
  },
  {
    title: "Biometric Security",
    icon: <Fingerprint className="w-8 h-8" />,
    description: "Device-native biometric authentication for all transactions",
    badges: ["FIDO2 Certified", "WebAuthn"]
  },
  {
    title: "Smart Audits",
    icon: <ScanEye className="w-8 h-8" />,
    description: "Real-time transaction monitoring with AI/ML anomaly detection",
    badges: ["Chainalysis", "CertiK Audited"]
  },
  {
    title: "Decentralized Protection",
    icon: <CircuitBoard className="w-8 h-8" />,
    description: "MPC wallets & distributed key management systems",
    badges: ["Multi-Party Compute", "HSM Backed"]
  },
  {
    title: "Cyber Insurance",
    icon: <ShieldCheck className="w-8 h-8" />,
    description: "$100M coverage for digital assets through Lloyd's of London",
    badges: ["1% Fee Allocation", "24/7 Support"]
  }
]

const SecurityCard = ({ feature }: { feature: typeof securityFeatures[number] }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="group p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 hover:border-blue-100 dark:hover:border-blue-900 transition-all"
  >
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Enterprise-Grade Security
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Protecting your assets with military-grade encryption and compliance-first architecture
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

export default SecurityMatters;