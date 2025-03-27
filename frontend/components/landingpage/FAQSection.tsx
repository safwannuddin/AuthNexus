"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const faqData = [
    {
      question: "What is AuthNexus?",
      answer: "AuthNexus is a decentralized identity verification platform that enables secure, privacy-preserving digital identity management using blockchain technology.",
    },
    {
      question: "How does AuthNexus protect my identity?",
      answer: "We use zero-knowledge proofs and decentralized storage to ensure your personal data remains private and secure, with only you having full control.",
    },
    {
      question: "Which blockchain does AuthNexus use?",
      answer: "AuthNexus is blockchain-agnostic, supporting multiple chains including Ethereum, Polygon, and Solana for identity verification and credential management.",
    },
    {
      question: "Can I use AuthNexus across different platforms?",
      answer: "Yes, AuthNexus supports cross-platform interoperability through W3C DID standards, allowing you to use your identity across Web2 and Web3 applications.",
    },
    {
      question: "What makes AuthNexus different from traditional identity systems?",
      answer: "Unlike centralized systems, AuthNexus gives you complete ownership of your identity data, with no single point of failure or control.",
    },
    {
      question: "How do I recover my identity if I lose access?",
      answer: "AuthNexus uses advanced recovery mechanisms including social recovery and multi-sig wallets to ensure you never lose access to your identity.",
    },
    {
      question: "Is AuthNexus compliant with data protection regulations?",
      answer: "Yes, we're fully GDPR compliant and adhere to global data protection standards while maintaining our decentralized architecture.",
    },
    {
      question: "Can businesses integrate AuthNexus into their systems?",
      answer: "Absolutely! We provide comprehensive SDKs and APIs for easy integration with existing enterprise systems and applications.",
    }
  ]

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 dark:from-indigo-900/20 dark:to-emerald-900/20"
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

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-emerald-400 animate-gradient-shift">
          Identity Verification FAQs
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.button
                className={`flex justify-between items-center w-full text-left p-6 rounded-xl shadow-lg transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-gradient-to-br from-indigo-600 to-emerald-600 text-white'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
                onClick={() => toggleQuestion(index)}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Hover Overlay */}
                <AnimatePresence>
                  {hoveredIndex === index && activeIndex !== index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/10 dark:bg-black/20 rounded-xl"
                    />
                  )}
                </AnimatePresence>

                <span className="text-lg font-semibold pr-4">{item.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeIndex === index ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      height: "auto", 
                      x: 0,
                      transition: { 
                        type: "spring",
                        stiffness: 100
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0, 
                      x: 20,
                      transition: { 
                        duration: 0.2 
                      }
                    }}
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-6 pb-4 rounded-b-xl border-t border-gray-200/50 dark:border-gray-700/30"
                  >
                    <p className="pt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Still have questions? Contact our support team
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-lg hover:scale-105 transition-transform">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection