import { Github, Linkedin, Twitter } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-background-dark border-t border-white/10 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-white/70 max-w-md">
              Verify documents with AI. Store truth on blockchain. 
              Ensuring transparency, integrity, and fraud protection for digital documents.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/60 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-primary-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-primary-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/70 hover:text-white transition-colors">Home</a></li>
              <li><a href="/#features" className="text-white/70 hover:text-white transition-colors">Features</a></li>
              <li><a href="/#how-it-works" className="text-white/70 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="/dashboard" className="text-white/70 hover:text-white transition-colors">Dashboard</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-white/60">Made with ❤️ by Safwan and Advance AI</p>
          <p className="text-white/40 text-sm mt-2">© 2025 AuthNexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}