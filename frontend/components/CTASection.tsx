"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const CTASection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900"
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-8 text-white"
        >
          Ready to Get Started?
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl mb-8 text-white/90 dark:text-gray-200 max-w-2xl mx-auto"
        >
          Join thousands of users who are already enjoying the benefits of SynapPay.
        </motion.p>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            href={process.env.NEXT_PUBLIC_FLUTTER_WEB_URL || "http://localhost:54321"}
            className="bg-white/10 backdrop-blur-sm text-lg px-8 py-4 rounded-full hover:bg-white/20 transition-all inline-flex items-center border-2 border-white/20 hover:border-white/30"
          >
            <span className="text-white font-semibold">
              Create Your Account
            </span>
            <motion.span 
              className="ml-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRight className="text-white" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default CTASection