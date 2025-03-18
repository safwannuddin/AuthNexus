"use client"
import { motion } from "framer-motion"
import { FaGooglePlay, FaApple } from "react-icons/fa"

const DownloadButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-20 ml-[5%] max-w-md" // Changed from mt-[20%] to mt-20 (5rem)
    >
      {/* Centered Title */}
      <div className="flex justify-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-wide text-center">
          DOWNLOAD
        </h2>
      </div>

      {/* Card Container */}
      <div className="bg-white dark:bg-gray-950 p-8 rounded-3xl shadow-lg dark:shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Google Play Button */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl text-sm w-full md:w-auto"
          >
            <FaGooglePlay className="w-6 h-6" />
            <span>Google Play Store</span>
          </motion.a>

          {/* App Store Button */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl text-sm w-full md:w-auto"
          >
            <FaApple className="w-6 h-6" />
            <span>Apple App Store</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

export default DownloadButtons