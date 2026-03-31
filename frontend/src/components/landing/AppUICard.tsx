import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Battery, Signal, Upload, BarChart, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

const stats = [
  { count: "1.2M+", label: "Documents Verified" },
  { count: "99.9%", label: "Accuracy Rate" },
  { count: "0.5s", label: "Verification Time" }
];

const recentActivity = [
  {
    type: "success",
    title: "Document Verified",
    institution: "University Name",
    time: "Just now",
    icon: CheckCircle,
    color: "text-[#00ff41]"
  },
  {
    type: "alert",
    title: "Fraud Detection",
    institution: "Unknown Entity",
    time: "2m ago",
    icon: AlertTriangle,
    color: "text-red-400"
  },
  {
    type: "verified",
    title: "Document Verified",
    institution: "Another University",
    time: "5m ago",
    icon: Shield,
    color: "text-blue-400"
  }
];

const AppUICard = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [activities, setActivities] = useState(recentActivity);

  // Rotate through stats
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Simulate new activities
  useEffect(() => {
    const timer = setInterval(() => {
      const newActivity = {
        type: "success",
        title: "New Document Verified",
        institution: "Sample Institution",
        time: "Just now",
        icon: CheckCircle,
        color: "text-[#00ff41]"
      };
      setActivities(prev => [newActivity, ...prev.slice(0, 2)]);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[320px] relative mx-auto"
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-[#00ff41]/20 via-[#00f0ff]/20 to-[#ff00ff]/20 rounded-[48px] blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Phone Frame */}
      <div className="relative bg-gray-900 rounded-[40px] p-4 shadow-2xl border border-white/10">
        {/* Screen Content */}
        <div className="relative rounded-[32px] overflow-hidden bg-black aspect-[9/19.5]">
          {/* Dynamic Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at center, #00ff41 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '24px 24px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 px-4 py-2 flex justify-between items-center bg-black/80 backdrop-blur-sm z-10">
            <motion.span 
              className="text-[#00ff41] text-sm font-mono"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {new Date().toLocaleTimeString()}
            </motion.span>
            <div className="flex items-center gap-2">
              <Signal className="w-4 h-4 text-[#00ff41]" />
              <Wifi className="w-4 h-4 text-[#00ff41]" />
              <Battery className="w-4 h-4 text-[#00ff41]" />
            </div>
          </div>

          {/* Main Content */}
          <div className="absolute inset-0 pt-12 p-4 flex flex-col text-white">
            {/* Stats Section */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <motion.p 
                  className="text-4xl font-bold bg-gradient-to-r from-[#00ff41] via-[#00f0ff] to-[#ff00ff] bg-clip-text text-transparent"
                >
                  {stats[currentStat].count}
                </motion.p>
                <p className="text-sm text-gray-400 mt-1">{stats[currentStat].label}</p>
              </motion.div>
            </AnimatePresence>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-[#00ff41]/10 to-transparent border border-[#00ff41]/20"
              >
                <Upload className="w-6 h-6 text-[#00ff41]" />
                <span className="text-xs">Verify Now</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-[#00f0ff]/10 to-transparent border border-[#00f0ff]/20"
              >
                <BarChart className="w-6 h-6 text-[#00f0ff]" />
                <span className="text-xs">Analytics</span>
              </motion.button>
            </div>

            {/* Activity Feed */}
            <div className="mt-6 flex-1">
              <h3 className="text-sm font-semibold mb-3 text-[#00ff41]">Live Activity</h3>
              <div className="space-y-2">
                <AnimatePresence>
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.time + index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3 p-2 rounded-lg bg-gray-900/50 border border-white/5"
                    >
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-gray-400">{activity.institution}</p>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom Navigation Indicator */}
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/20 rounded-full"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AppUICard;
