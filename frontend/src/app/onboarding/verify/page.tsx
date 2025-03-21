'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Shield, Fingerprint, Upload, Camera, ArrowRight, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type VerificationMethod = 'document' | 'biometric' | 'selfie'

export default function VerifyPage() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | null>(null)

  const verificationMethods = [
    {
      id: 'document',
      title: 'Document Verification',
      description: 'Upload your government-issued ID or passport',
      icon: Upload,
      color: '#00ff41'
    },
    {
      id: 'biometric',
      title: 'Biometric Verification',
      description: 'Use fingerprint or face recognition',
      icon: Fingerprint,
      color: '#00f0ff'
    },
    {
      id: 'selfie',
      title: 'Selfie Verification',
      description: 'Take a photo for facial recognition',
      icon: Camera,
      color: '#ff00ff'
    }
  ]

  const handleContinue = () => {
    if (selectedMethod) {
      router.push('/onboarding/security')
    }
  }

  return (
    <div className="min-h-screen bg-black/95">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative z-10 mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header with Icon */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center p-3 rounded-xl bg-[#00ff41]/10 mb-6"
            >
              <Shield className="w-6 h-6 text-[#00ff41]" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-3"
            >
              Verify Your Identity
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400"
            >
              Choose your preferred verification method
            </motion.p>
          </div>

          {/* Verification Methods */}
          <div className="grid gap-4 mb-8">
            {verificationMethods.map((method, index) => (
              <motion.button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as VerificationMethod)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  w-full p-6 rounded-xl border text-left transition-all
                  ${selectedMethod === method.id 
                    ? `border-[${method.color}] bg-[${method.color}]/5` 
                    : 'border-white/5 bg-black/20 hover:bg-black/40'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${method.color}20` }}
                  >
                    <method.icon className="w-6 h-6" style={{ color: method.color }} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{method.title}</h3>
                    <p className="text-sm text-gray-400">{method.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleContinue}
              disabled={!selectedMethod}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${selectedMethod 
                  ? 'bg-[#00ff41] text-black hover:bg-[#00ff41]/90' 
                  : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                }
              `}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}