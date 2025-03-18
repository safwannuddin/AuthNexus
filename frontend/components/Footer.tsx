"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Github } from "lucide-react"
import { motion } from "framer-motion"

const Footer = () => {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { href: "#about", label: "About Us" },
        { href: "#faq", label: "FAQ" },
        { href: "#contact", label: "Contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/terms", label: "Terms of Service" },
        { href: "/privacy", label: "Privacy Policy" },
      ],
    },
  ]

  const socialIcons = [
    { Icon: Facebook, href: "https://facebook.com" },
    { Icon: Twitter, href: "https://twitter.com" },
    { Icon: Instagram, href: "https://instagram.com" },
    { Icon: Github, href: "https://github.com" },
  ]

  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">SynapPay</h3>
            <p className="text-sm text-muted-foreground">
              Next-generation crypto payment platform for seamless transactions across chains.
            </p>
          </motion.div>

          {/* Links Columns */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h4 className="text-md font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <motion.li
                    key={link.href}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-md font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground"
        >
          © {new Date().getFullYear()} SynapPay. All rights reserved.
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer