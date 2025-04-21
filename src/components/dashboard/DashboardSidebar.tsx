import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  UserCircle, 
  Settings, 
  ChevronRight, 
  LogOut
} from 'lucide-react';
import Logo from '../ui/Logo';
import { useAuthStore } from '../../store/useAuthStore';

const sidebarItems = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    to: '/dashboard',
    exact: true
  },
  {
    label: 'Upload Document',
    icon: <Upload size={20} />,
    to: '/dashboard/upload',
  },
  {
    label: 'Verification Status',
    icon: <FileText size={20} />,
    to: '/dashboard/status',
  },
  {
    label: 'Profile',
    icon: <UserCircle size={20} />,
    to: '/dashboard/profile',
  },
  {
    label: 'Settings',
    icon: <Settings size={20} />,
    to: '/dashboard/settings',
  },
];

export default function DashboardSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuthStore();

  const isActive = (path: string, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Collapsed Sidebar Button */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden bg-primary-500 rounded-full p-3 shadow-lg">
        <button onClick={() => setCollapsed(!collapsed)}>
          <ChevronRight 
            size={24} 
            className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: collapsed ? -300 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full md:h-screen bg-background-dark border-r border-white/10 z-30 w-64 md:w-72"
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Logo />
          </div>
          
          <nav className="flex-1 px-4 mt-6">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.to, item.exact)
                        ? 'bg-primary-500/20 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-white/10 mt-auto">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Overlay for mobile */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}