'use client'

import React from "react";
import { Bell, Search, Settings } from 'lucide-react'

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ff41] via-[#00f0ff] to-[#ff00ff] bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-400">Welcome back, Administrator</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <input 
            type="text"
            placeholder="Search..."
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 ring-[#00ff41]/50"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
          <Bell className="text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#00ff41] rounded-full" />
        </button>

        {/* Settings */}
        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
          <Settings className="text-gray-400" />
        </button>
      </div>
    </header>
  )
}

export default Header;
