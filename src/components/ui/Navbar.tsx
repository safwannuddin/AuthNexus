import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import Button from './Button';
import { useAuthStore } from '../../store/useAuthStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'How It Works', path: '/#how-it-works' },
  ];

  const authLinks = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Profile', path: '/dashboard/profile' },
        { name: 'Logout', onClick: logout }
      ]
    : [
        { name: 'Login', path: '/login' },
      ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background-dark shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="z-50">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white/80 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex gap-3">
            {authLinks.map((link, index) => 
              link.path ? (
                <Link key={link.name} to={link.path}>
                  <Button 
                    variant={index === authLinks.length - 1 ? 'primary' : 'ghost'}
                  >
                    {link.name}
                  </Button>
                </Link>
              ) : (
                <Button 
                  key={link.name}
                  variant="ghost"
                  onClick={link.onClick}
                >
                  {link.name}
                </Button>
              )
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-50"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background-dark flex flex-col pt-20 px-6"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-xl py-2 border-b border-white/10"
                  >
                    {link.name}
                  </Link>
                ))}
                {authLinks.map((link) => 
                  link.path ? (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-xl py-2 border-b border-white/10"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      key={link.name}
                      onClick={link.onClick}
                      className="text-xl py-2 border-b border-white/10 text-left"
                    >
                      {link.name}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}