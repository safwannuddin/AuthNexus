'use client'

import React from "react";
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Home, 
  FileText, 
  Users, 
  Shield, 
  LogOut,
  ChevronLeft
} from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { icon: Home, label: 'Overview', href: '/dashboard' },
  { icon: FileText, label: 'Documents', href: '/dashboard/documents' },
  { icon: Users, label: 'Users', href: '/dashboard/users' },
  { icon: Shield, label: 'Security', href: '/dashboard/security' },
]

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside 
      className="h-screen bg-white/5 border-r border-white/10 relative"
      animate={{ width: collapsed ? 80 : 240 }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#00ff41] to-[#00f0ff] bg-clip-text text-transparent">
          {collapsed ? 'AN' : 'AuthNexus'}
        </h1>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <item.icon className="text-gray-400 group-hover:text-[#00ff41]" />
            {!collapsed && (
              <span className="text-gray-400 group-hover:text-white">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group">
          <LogOut className="text-gray-400 group-hover:text-[#ff00ff]" />
          {!collapsed && (
            <span className="text-gray-400 group-hover:text-white">
              Logout
            </span>
          )}
        </button>
      </div>

      {/* Collapse Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 p-1 rounded-full bg-[#00ff41] text-black"
      >
        <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
      </button>
    </motion.aside>
  )
}

export default Sidebar
