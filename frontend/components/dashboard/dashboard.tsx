'use client'

import React from "react"
import { motion } from "framer-motion"
import { 
  Shield, 
  Users, 
  FileCheck, 
  Activity, 
  Clock
} from "lucide-react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import OverviewWidget from "./OverviewWidget"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <Header />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <OverviewWidget 
              title="Total Verifications"
              value="1.2M+"
              icon={<Shield className="text-[#00ff41]" />}
              change="+12.5%"
              gradient="from-[#00ff41]/10 to-transparent"
            />
            <OverviewWidget 
              title="Active Users"
              value="50.2K"
              icon={<Users className="text-[#00f0ff]" />}
              change="+8.1%"
              gradient="from-[#00f0ff]/10 to-transparent"
            />
            <OverviewWidget 
              title="Documents Processed"
              value="850K"
              icon={<FileCheck className="text-[#ff00ff]" />}
              change="+15.3%"
              gradient="from-[#ff00ff]/10 to-transparent"
            />
            <OverviewWidget 
              title="Processing Time"
              value="0.3s"
              icon={<Clock className="text-[#00ff41]" />}
              change="-25%"
              gradient="from-[#00ff41]/10 to-transparent"
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Activity Chart */}
            <div className="lg:col-span-2 bg-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-6">Verification Activity</h3>
              {/* Add your chart component here */}
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[1,2,3,4,5].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Activity className="text-[#00ff41]" />
                    <div>
                      <p className="font-medium">Document Verified</p>
                      <p className="text-sm text-gray-400">2 minutes ago</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
