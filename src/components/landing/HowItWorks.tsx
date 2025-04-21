import { motion } from 'framer-motion';
import { UserCircle2, File, CheckSquare, SquareStack } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserCircle2 size={32} />,
      title: 'Create Profile',
      description: 'Sign up for an account and complete your profile with basic information.',
    },
    {
      icon: <File size={32} />,
      title: 'Upload Document',
      description: 'Upload any document you need to verify through our secure interface.',
    },
    {
      icon: <CheckSquare size={32} />,
      title: 'AI Verifies',
      description: 'Our AI analyzes the document for authenticity and tampering signs.',
    },
    {
      icon: <SquareStack size={32} />,
      title: 'Blockchain Proof',
      description: 'Upon verification, a proof is stored on the blockchain for permanent record.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background-dark/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            AuthNexus makes document verification simple, secure, and transparent in just a few steps.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-primary-500/30 hidden md:block"></div>
          
          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={step.title}
              className={`relative mb-20 md:mb-0 ${
                index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
              }`}
            >
              <div className="flex md:block items-start max-w-sm">
                {/* Mobile view - left aligned icons */}
                <div className="mr-6 p-3 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white md:hidden">
                  {step.icon}
                </div>
                
                <div className={`
                  rounded-xl glass-card p-6 relative
                  md:w-80 md:h-60 flex md:block flex-col justify-center
                  ${index % 2 === 0 ? 'md:text-right md:ml-24' : 'md:text-left md:mr-24'}
                `}>
                  {/* Step number */}
                  <div className="hidden md:flex absolute top-[calc(50%-20px)] rounded-full bg-primary-500 text-white w-10 h-10 items-center justify-center font-bold text-lg z-10
                    shadow-lg shadow-primary-500/30
                    border-4 border-background-dark
                    ${index % 2 === 0 ? '-left-5' : '-right-5'}
                  ">
                    {index + 1}
                  </div>
                  
                  {/* Desktop view - icon at top */}
                  <div className="hidden md:block p-3 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white mb-4 w-fit
                    ${index % 2 === 0 ? 'ml-auto' : ''}
                  ">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}