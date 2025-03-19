"use client"

import { motion } from "framer-motion"
import { Database, Key, Globe, Shield, GitMerge, Sparkles } from "lucide-react"

const AboutSection = () => {
  return (
    <section id="about" className="relative py-28 px-4 md:px-8 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
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
              className="absolute -inset-4 bg-gradient-to-r from-indigo-600/20 to-emerald-600/20 rounded-3xl blur-xl"
            />
            <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600 dark:from-indigo-400 dark:to-emerald-400 relative">
              About AuthNexus
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6"
          >
            Pioneering the future of digital identity through decentralized verification and blockchain-powered trust systems.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-400 dark:from-indigo-400 dark:to-blue-200">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To create a decentralized identity ecosystem that empowers users with complete control over their digital presence.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-900 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-400 dark:from-emerald-400 dark:to-teal-200">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                A world where digital identity is secure, portable, and universally verifiable across all platforms.
              </p>
            </div>
          </motion.div>

          {/* Values Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-400 dark:from-purple-400 dark:to-pink-200">
                Core Values
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Privacy, Security, Interoperability, and User Sovereignty drive our decentralized identity solutions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Additional Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-100 dark:border-gray-700">
            <GitMerge className="w-8 h-8 mb-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-xl font-semibold mb-2">Interoperable</h4>
            <p className="text-gray-600 dark:text-gray-300">Works across multiple blockchain networks</p>
          </div>
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-100 dark:border-gray-700">
            <Key className="w-8 h-8 mb-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xl font-semibold mb-2">Self-Sovereign</h4>
            <p className="text-gray-600 dark:text-gray-300">Complete user control over identity data</p>
          </div>
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-100 dark:border-gray-700">
            <Sparkles className="w-8 h-8 mb-4 text-purple-600 dark:text-purple-400" />
            <h4 className="text-xl font-semibold mb-2">Innovative</h4>
            <p className="text-gray-600 dark:text-gray-300">Cutting-edge ZK-proof technology</p>
          </div>
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-100 dark:border-gray-700">
            <Shield className="w-8 h-8 mb-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xl font-semibold mb-2">Secure</h4>
            <p className="text-gray-600 dark:text-gray-300">Military-grade encryption standards</p>
          </div>
        </motion.div>

        {/* Animated decorative elements */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="absolute -bottom-40 left-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -z-10"
        />
      </div>
    </section>
  )
}

export default AboutSection