import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          id="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFFDF8]"
        >
          {/* Animated Floral Emblem */}
          <div className="relative mb-6 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-20 h-20 flex items-center justify-center"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#D9A6A6]">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#F5EFE7"
                  strokeWidth="1.5"
                />
                <motion.path
                  d="M50 20 C40 35 40 45 50 50 C60 45 60 35 50 20 Z"
                  fill="currentColor"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <motion.path
                  d="M80 50 C65 40 55 40 50 50 C55 60 65 60 80 50 Z"
                  fill="currentColor"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 1, delay: 0.15, ease: "easeInOut" }}
                />
                <motion.path
                  d="M50 80 C60 65 60 55 50 50 C40 55 40 65 50 80 Z"
                  fill="currentColor"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
                />
                <motion.path
                  d="M20 50 C35 60 45 60 50 50 C45 40 35 40 20 50 Z"
                  fill="currentColor"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 1, delay: 0.45, ease: "easeInOut" }}
                />
                <circle cx="50" cy="50" r="4" fill="#304238" />
              </svg>
            </motion.div>
          </div>

          {/* Luxury Brand Typography */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <h1 className="font-editorial text-2xl md:text-3xl tracking-[0.28em] font-medium text-[#304238] uppercase">
              LUMIÈRE
            </h1>
            <p className="text-[11px] tracking-[0.35em] text-[#9AA88F] uppercase mt-1 font-medium">
              Haute Floriculture
            </p>
          </motion.div>

          {/* Minimalist Progress Line */}
          <motion.div 
            className="w-32 h-[1.5px] bg-[#F5EFE7] mt-8 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="h-full bg-[#D9A6A6]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
