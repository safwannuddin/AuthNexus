'use client'

import { motion } from "framer-motion"
import { Wifi, Battery, Signal, Send, ArrowDown } from "lucide-react"

const AppUICard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-[300px] relative mx-auto mt-[10%]"
    >
      {/* Phone Frame */}
      <div className="relative bg-gray-800 rounded-[40px] p-4 shadow-2xl">
        {/* Side Buttons */}
        <div className="absolute right-[-8px] top-24 h-16 w-2 bg-gray-800 rounded-r-lg" />
        <div className="absolute right-[-8px] top-44 h-8 w-2 bg-gray-800 rounded-r-lg" />
        
        {/* Screen Content */}
        <div className="relative rounded-[32px] overflow-hidden bg-gray-900 aspect-[9/19.5]">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 px-4 pt-1 flex justify-between items-center text-white text-xs bg-gray-900/80 backdrop-blur-sm z-10">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <Signal className="w-4 h-4" />
              <Wifi className="w-4 h-4" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Dashboard Preview Content */}
          <div className="absolute inset-0 p-4 flex flex-col text-white">
            {/* Stats Section */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">Total Verified Documents</p>
              <h2 className="text-2xl font-bold mt-1">120 Documents</h2>
              <p className="text-xs text-gray-400">Last 24 hours</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button className="flex flex-col items-center gap-2 text-sm hover:bg-gray-800 p-2 rounded-xl">
                {/* Rotated Send icon to represent Upload */}
                <Send className="w-6 h-6 text-blue-400 transform rotate-45" />
                <span>Upload</span>
              </button>
              <button className="flex flex-col items-center gap-2 text-sm hover:bg-gray-800 p-2 rounded-xl">
                <ArrowDown className="w-6 h-6 text-green-400" />
                <span>Dashboard</span>
              </button>
            </div>

            {/* Recent Verification Activity */}
            <div className="mt-6 flex-1">
              <h3 className="text-sm font-semibold mb-2">Recent Verifications</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-sm">Verified: University Diploma</p>
                    <p className="text-xs text-gray-400">11:30 AM</p>
                  </div>
                  <span className="text-green-400">Success</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-sm">Alert: Fake Certificate</p>
                    <p className="text-xs text-gray-400">10:15 AM</p>
                  </div>
                  <span className="text-red-400">Alert</span>
                </div>
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
          
          {/* Screen Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-transparent" />
        </div>

        {/* Front Camera Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-800 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-gray-900/80" />
          <div className="absolute inset-0 shadow-inner rounded-full" />
        </div>
      </div>
    </motion.div>
  )
}

export default AppUICard;
