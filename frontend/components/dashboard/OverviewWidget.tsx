'use client'

import React from "react";
import { motion } from 'framer-motion'

interface OverviewWidgetProps {
  title: string
  value: string | number
  icon: React.ReactNode
  change: string
  gradient: string
}

const OverviewWidget = ({ title, value, icon, change, gradient }: OverviewWidgetProps) => {
  return (
    <motion.div 
      className="relative p-6 rounded-xl border border-white/10 overflow-hidden group"
      whileHover={{ scale: 1.02 }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

      {/* Content */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          {icon}
          <span className={`text-sm ${
            change.startsWith('+') ? 'text-[#00ff41]' : 'text-red-500'
          }`}>
            {change}
          </span>
        </div>
        <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  )
}

export default OverviewWidget
