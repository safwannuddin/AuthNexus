"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const faqData = [
    {
      question: "What is SynapPay?",
      answer: "SynapPay is a next-generation payment platform that combines crypto and UPI transactions, offering seamless and secure global money transfers.",
    },
    {
      question: "How secure is SynapPay?",
      answer: "SynapPay uses bank-grade encryption and multi-sig wallets to ensure the highest level of security for your funds and transactions.",
    },
    {
      question: "Which cryptocurrencies does SynapPay support?",
      answer: "SynapPay supports a wide range of cryptocurrencies, including Bitcoin, Ethereum, and many popular altcoins. Check our supported currencies page for a full list.",
    },
    {
      question: "How fast are transactions on SynapPay?",
      answer: "Most transactions on SynapPay are processed instantly. Cross-chain swaps may take a few minutes depending on network congestion.",
    },
    {
      question: "Are there any transaction limits?",
      answer: "Transaction limits vary based on your account level and verification status. Please refer to our limits page for more details.",
    },
  ]

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20"
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
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 animate-gradient-shift">
          Frequently Asked Questions
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
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
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
      </div>
    </section>
  )
}

export default FAQSection