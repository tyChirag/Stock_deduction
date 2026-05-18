import React from 'react';
import { Joyride, STATUS } from 'react-joyride';
import useStore from '../../store/useStore';

export default function OnboardingTour() {
  const { hasSeenOnboarding, completeOnboarding, theme } = useStore();

  const steps = [
    {
      target: '[data-tour="sidebar-dashboard"]',
      content: 'Welcome to StockSync! This is your Dashboard, the command center for your entire e-commerce business.',
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '[data-tour="dashboard-metrics"]',
      content: 'Here you can monitor your total revenue, orders, and inventory across all your connected platforms in real-time.',
      placement: 'bottom',
    },
    {
      target: '[data-tour="sidebar-inventory"]',
      content: 'Head over to the Inventory section to manage stock, update prices, and view low-stock alerts.',
      placement: 'right',
    },
    {
      target: '[data-tour="sidebar-analytics"]',
      content: 'Dive deep into your performance metrics and platform-wise revenue in Analytics.',
      placement: 'right',
    },
    {
      target: '[data-tour="sidebar-offline"]',
      content: 'Managing a physical store? Use the Offline Store section to sync your retail inventory perfectly with your online channels.',
      placement: 'right',
    },
    {
      target: '[data-tour="settings-menu"]',
      content: 'Finally, customize your themes, notifications, and connect your seller platforms here!',
      placement: 'left',
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      completeOnboarding();
    }
  };

  if (hasSeenOnboarding) return null;

  return (
    <Joyride
      steps={steps}
      run={!hasSeenOnboarding}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          arrowColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          primaryColor: '#3b82f6',
          textColor: theme === 'dark' ? '#f3f4f6' : '#111827',
          zIndex: 1000,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonNext: {
          backgroundColor: 'var(--color-primary, #3b82f6)',
          borderRadius: '8px',
          fontWeight: 600,
        },
        buttonBack: {
          marginRight: 10,
          color: theme === 'dark' ? '#9ca3af' : '#4b5563',
        },
        buttonSkip: {
          color: theme === 'dark' ? '#9ca3af' : '#4b5563',
          fontWeight: 500,
        }
      }}
    />
  );
}
