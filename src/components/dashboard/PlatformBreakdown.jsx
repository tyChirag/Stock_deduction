import useStore from '../../store/useStore';
import PlatformCard from './PlatformCard';

export default function PlatformBreakdown() {
  const { data, isLoading } = useStore();
  const { platforms } = data;

  // Filter out unconnected platforms if needed, but the prompt says 
  // "If user tries to access / it redirects. If no platform connected -> empty state".
  // This means if we are here, at least one is connected. Let's just show the connected ones.
  const connectedPlatforms = Object.entries(platforms).filter(([_, p]) => p.connected);

  if (connectedPlatforms.length === 0) return null; // handled by empty state in Dashboard

  return (
    <div className="mt-6 relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 animate-pulse bg-white/50 backdrop-blur-[2px] dark:bg-[#09090b]/50" />
      )}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Platform Breakdown</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Performance metrics by connected channel</p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {connectedPlatforms.map(([key, platform]) => (
          <PlatformCard key={key} platform={platform} platformKey={key} />
        ))}
      </div>
    </div>
  );
}
