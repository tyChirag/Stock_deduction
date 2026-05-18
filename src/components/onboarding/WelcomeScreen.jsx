import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ShoppingBag, Store, Activity } from 'lucide-react';
import useStore from '../../store/useStore';

export default function WelcomeScreen() {
  const { hasSeenWelcome, completeWelcome } = useStore();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (hasSeenWelcome) return;

    const sequence = async () => {
      // Step 0: Initial wait
      await new Promise(r => setTimeout(r, 500));
      
      // Step 1: Show Logo & Text
      setStep(1);
      await new Promise(r => setTimeout(r, 1500));
      
      // Step 2: Show Platforms
      setStep(2);
      await new Promise(r => setTimeout(r, 2000));
      
      // Complete
      setStep(3);
      setTimeout(() => completeWelcome(), 800);
    };

    sequence();
  }, [hasSeenWelcome, completeWelcome]);

  if (hasSeenWelcome) return null;

  return (
    <AnimatePresence>
      {step < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-3xl overflow-hidden"
        >
          {/* Animated Background Blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Step 1: Logo & Welcome */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-2xl mb-8">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-2xl border border-white/20"
                    />
                    <span className="text-5xl font-bold">S</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-center mb-4">
                    Welcome to <span className="text-primary">StockSync</span>
                  </h1>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-muted-foreground text-center max-w-md"
                  >
                    Your AI-powered inventory command center
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 2: Icons Stagger */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                  }}
                  className="flex gap-6 mt-16"
                >
                  {[
                    { icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                    { icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { icon: Store, color: 'text-green-500', bg: 'bg-green-500/10' },
                    { icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.5 },
                        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 12 } }
                      }}
                      className={`h-16 w-16 rounded-2xl flex items-center justify-center ${item.bg}`}
                    >
                      <item.icon className={`h-8 w-8 ${item.color}`} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
