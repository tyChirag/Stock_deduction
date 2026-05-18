import { useState } from 'react';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import useStore from '../../store/useStore';
import { cn } from '../../lib/utils';
import Card from '../ui/Card';
import Button from '../ui/Button';
import StatusBadge from '../ui/StatusBadge';

export default function PlatformConnectCard({ platformKey, platform }) {
  const { connectPlatform, disconnectPlatform } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncStep, setSyncStep] = useState(0);

  const handleConnect = async () => {
    setShowSyncModal(true);
    setSyncStep(0);
    
    // Step 1: Authenticating
    await new Promise(resolve => setTimeout(resolve, 800));
    setSyncStep(1);
    
    // Step 2: Syncing Inventory
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSyncStep(2);
    
    // Step 3: Success
    try {
      await connectPlatform(platformKey);
      setSyncStep(3);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });
      setTimeout(() => {
        setShowSyncModal(false);
        toast.success(`${platform.name} connected successfully!`);
      }, 1500);
    } catch (error) {
      toast.error(`Failed to connect to ${platform.name}`);
      setShowSyncModal(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await disconnectPlatform(platformKey);
      toast.info('Platform disconnected');
    } catch (error) {
      toast.error(`Failed to disconnect from ${platform.name}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn(
      "relative group overflow-hidden transition-all duration-300",
      platform.connected ? "border-green-200 bg-green-50/30 dark:border-green-900/30 dark:bg-green-950/10" : "hover:border-primary/50 hover:shadow-lg"
    )}>
      {/* Decorative Background Blob */}
      <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity blur-2xl ${platform.color}`} />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center space-x-4">
          <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-md transform group-hover:scale-105 transition-transform", platform.color)}>
            {platform.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{platform.name}</h3>
            <div className="mt-1">
              <StatusBadge 
                status={platform.connected ? 'connected' : 'disconnected'} 
                label={platform.connected ? 'Connected' : 'Not Connected'} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col space-y-3 relative z-10">
        {platform.connected ? (
          <>
            <div className="rounded-md bg-green-100/50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400 flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Token: {platform.token?.substring(0, 8)}...
            </div>
            <Button
              variant="danger"
              onClick={handleDisconnect}
              isLoading={isLoading}
              className="w-full"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            onClick={handleConnect}
            className="w-full group/btn"
          >
            Connect Account
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showSyncModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-white/90 dark:bg-[#111217]/90 backdrop-blur-sm flex flex-col items-center justify-center p-6"
          >
            {syncStep < 3 ? (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center"
              >
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {syncStep === 0 && 'Connecting...'}
                  {syncStep === 1 && 'Authenticating...'}
                  {syncStep === 2 && 'Syncing Inventory...'}
                </h4>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 mt-4 overflow-hidden">
                  <motion.div 
                    className="bg-primary h-1.5 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: syncStep === 0 ? '30%' : syncStep === 1 ? '60%' : '90%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="flex flex-col items-center text-green-500"
              >
                <CheckCircle2 className="h-16 w-16 mb-2" />
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">Connected!</h4>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
