"use client"

import { motion } from "framer-motion"
import { Rocket, Eye, Sparkles } from "lucide-react"

const AboutSection = () => {
  return (
    <section id="about" className="relative py-28 px-4 md:px-8 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <div className="inline-block relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"
            />
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 relative">
              About SynapPay
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6"
          >
            Revolutionizing digital payments through innovative blockchain technology and seamless user experiences.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Empower global financial inclusion through secure, instant, and borderless payment solutions.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-400 dark:from-purple-400 dark:to-pink-200">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Create a world where financial transactions are instant, secure, and accessible to everyone.
              </p>
            </div>
          </motion.div>

          {/* Values Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-900 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-600 to-cyan-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-cyan-400 dark:from-green-400 dark:to-cyan-200">
                Core Values
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Innovation, Security, Transparency, and User-Centric Design guide every decision we make.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Animated decorative elements */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="absolute -bottom-40 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -z-10"
        />
      </div>
    </section>
  )
}

export default AboutSection














