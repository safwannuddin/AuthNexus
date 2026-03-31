"use client";

import { motion } from "framer-motion";
import { UploadCloud, ShieldCheck, BadgeCheck, Lock } from "lucide-react";

const steps = [
  {
    icon: UploadCloud,
    title: "Upload Your Docs",
    description: "Securely upload your ID and documents via our encrypted portal.",
  },
  {
    icon: ShieldCheck,
    title: "AI Fraud Detection",
    description: "Our AI checks for forgery, tampering, and data inconsistencies.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Instantly",
    description: "Receive instant confirmation once documents are verified.",
  },
  {
    icon: Lock,
    title: "Stored on Blockchain",
    description: "Your data is securely stored on-chain for lifetime authenticity.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#0d0d11] text-white py-28 px-6 sm:px-10 lg:px-20">
      {/* Glowing Blur Background */}
      <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-600 opacity-20 blur-3xl rounded-full z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center mb-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
          How It Works
        </h2>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
          From document submission to blockchain storage — secure, fast, and future-ready.
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-20">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col-reverse sm:flex-row items-center gap-10 ${
                !isLeft && "sm:flex-row-reverse"
              }`}
            >
              {/* Icon Side */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-400/20 transition-all">
                  <Icon className="text-white" size={28} />
                </div>
              </div>

              {/* Content Side */}
              <div className="bg-[#13131a] border border-[#2b2b31] rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-indigo-600/10 transition-all max-w-xl w-full">
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
