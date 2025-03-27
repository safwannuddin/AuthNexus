"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ContactForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Reset form fields
    setName("")
    setEmail("")
    setMessage("")
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const formConfig = [
    { id: "name", label: "Name", value: name, setter: setName, type: "text" },
    { id: "email", label: "Email", value: email, setter: setEmail, type: "email" },
    { id: "message", label: "Message", value: message, setter: setMessage, type: "textarea" },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gradient-to-br from-gray-50/50 via-white to-gray-100/50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-4 relative">
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

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400"
          >
            Contact Us
          </motion.h2>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="space-y-6">
              {formConfig.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <label
                    htmlFor={item.id}
                    className="block text-gray-700 dark:text-gray-300 font-medium mb-2 pl-1"
                  >
                    {item.label}
                  </label>
                  {item.type === "textarea" ? (
                    <motion.textarea
                      id={item.id}
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                      className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm hover:shadow-md"
                      rows={4}
                      required
                      whileFocus={{ scale: 1.01 }}
                    />
                  ) : (
                    <motion.input
                      type={item.type}
                      id={item.id}
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                      className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm hover:shadow-md"
                      required
                      whileFocus={{ scale: 1.01 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.05,
                  background: "linear-gradient(45deg, #2563eb, #7c3aed)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Send Message
              </motion.button>
            </motion.div>
          </form>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
              >
                <p className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Message sent successfully!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}

export default ContactForm