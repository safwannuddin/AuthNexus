"use client"
import { motion } from "framer-motion"
import { CheckCircle, Smartphone, UserCheck, Zap } from "lucide-react"
import { useState } from "react"

const guideSteps = [
  {
    title: "Download & Install",
    icon: <Smartphone className="w-6 h-6" />,
    checks: [
      "Select your platform",
      "Verify app authenticity",
      "Complete installation"
    ],
    time: "2 minutes",
    content: {
      badges: ["iOS 15+", "Android 10+", "120MB Space"],
      tips: "Scan QR code for direct download"
    }
  },
  {
    title: "Secure Account Setup",
    icon: <UserCheck className="w-6 h-6" />,
    checks: [
      "Email verification",
      "2FA activation",
      "Profile completion"
    ],
    time: "3 minutes",
    content: {
      badges: ["256-bit Encryption", "GDPR Compliant"],
      tips: "Use password manager integration"
    }
  },
  {
    title: "First Transaction",
    icon: <Zap className="w-6 h-6" />,
    checks: [
      "Wallet funding",
      "Recipient verification",
      "Transaction confirmation"
    ],
    time: "1 minute",
    content: {
      badges: ["0.1% Fee", "24/7 Support"],
      tips: "Try demo mode first"
    }
  }
]

const ProgressIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="relative w-full mb-12">
    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full -translate-y-1/2" />
    <div 
      className="absolute top-1/2 left-0 h-1 bg-blue-500 rounded-full transition-all duration-500 -translate-y-1/2"
      style={{ 
        width: `${(currentStep / (guideSteps.length - 1)) * 100}%`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    />
    <div className="relative flex justify-between">
      {guideSteps.map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              index <= currentStep 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-gray-200 dark:bg-gray-800'
            }`}
          >
            {index + 1}
          </div>
          {index < guideSteps.length - 1 && (
            <div className="absolute top-4 left-full w-full h-1 -translate-x-1/2">
              <div className="w-full h-full bg-transparent" />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)

const GuideStep = ({ 
  step,
  isActive,
  orientation 
}: { 
  step: typeof guideSteps[number]
  isActive: boolean
  orientation: 'vertical' | 'horizontal' 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className={`p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg ${
      orientation === 'vertical' ? 'mb-6' : 'w-full'
    }`}
  >
    <div className="flex items-start gap-4">
      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        {step.icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {step.content.badges.map((badge, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
        <div className="space-y-2">
          {step.checks.map((check, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-600 dark:text-gray-300">{check}</span>
            </div>
          ))}
        </div>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
          >
            <span className="text-sm text-blue-600 dark:text-blue-300">
              Pro Tip: {step.content.tips}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  </motion.div>
)

interface GuideStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const steps: GuideStep[] = [
  {
    title: "1. Upload",
    description: "Securely upload your documents for verification"
  },
  {
    title: "2. Verify",
    description: "AI-powered document analysis and verification"
  },
  {
    title: "3. Store",
    description: "Blockchain-based secure storage and tracking"
  }
];
const QuickGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <ProgressIndicator currentStep={currentStep} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg border border-white/10 bg-black/30 cursor-pointer"
              onClick={() => setCurrentStep(index)}
            >
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickGuide;