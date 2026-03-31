"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Lock,
  Cpu,
  Database,
  Fingerprint,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Document Checks",
    description: "Use powerful AI to quickly scan and verify documents for any kind of tampering.",
  },
  {
    icon: Lock,
    title: "Blockchain Proof System",
    description: "Every verified document is recorded securely using blockchain technology for transparency.",
  },
  {
    icon: Cpu,
    title: "Fast Smart Processing",
    description: "Get documents verified and authenticated within seconds, using advanced smart tech.",
  },
  {
    icon: Database,
    title: "Secure Cloud Storage",
    description: "Your verified documents are stored safely and are accessible anytime from anywhere.",
  },
  {
    icon: Fingerprint,
    title: "Biometric ID Check",
    description: "Secure access to your documents using biometric and cryptographic verification.",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-[#0d0d11] text-white py-28 px-6 sm:px-10 lg:px-20" id="features">
      {/* Glowing Blur Background */}
      <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-green-500 opacity-20 blur-3xl rounded-full z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center mb-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 text-transparent bg-clip-text">
          Features Built For You
        </h2>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
          Experience the power of AI, blockchain, and seamless security in one simple flow.
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-20">
        {features.map((feature, index) => {
          const Icon = feature.icon;
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-green-400 to-purple-500 flex items-center justify-center shadow-lg shadow-green-400/20 transition-all">
                  <Icon className="text-white" size={28} />
                </div>
              </div>

              {/* Content Side */}
              <div className="bg-[#13131a] border border-[#2b2b31] rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-green-500/10 transition-all max-w-xl w-full">
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
