'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { User, Mail, Building, Phone, ArrowRight, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
}

export default function ProfileCreation() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/onboarding/verify')
  }

  return (
    <div className="min-h-screen bg-black/95">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative z-10 mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-3"
            >
              Create Your Profile
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-sm"
            >
              Complete your profile to get started with AuthNexus
            </motion.p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm
                        focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm
                        focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm
                      focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Company Field */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Company (Optional)</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm
                      focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm
                      focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#00ff41] text-black text-sm font-medium rounded-lg
                    hover:bg-[#00ff41]/90 transition-colors"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}