import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import useStore from '../../store/useStore';
import { cn } from '../../lib/utils';
import Card from '../ui/Card';
import Button from '../ui/Button';
import StatusBadge from '../ui/StatusBadge';

export default function PlatformConnectCard({ platformKey, platform }) {
  const { connectPlatform, disconnectPlatform } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connectPlatform(platformKey);
      toast.success('Platform connected successfully');
    } catch (error) {
      toast.error(`Failed to connect to ${platform.name}`);
    } finally {
      setIsLoading(false);
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
      platform.connected ? "border-green-200 bg-green-50/30 dark:border-green-900/30 dark:bg-green-950/10" : ""
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center text-white text-xl font-bold", platform.color)}>
            {platform.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{platform.name}</h3>
            <div className="mt-1">
              <StatusBadge 
                status={platform.connected ? 'connected' : 'disconnected'} 
                label={platform.connected ? 'Connected' : 'Not Connected'} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col space-y-3">
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
            isLoading={isLoading}
            className="w-full"
          >
            Connect Account
          </Button>
        )}
      </div>
    </Card>
  );
}
