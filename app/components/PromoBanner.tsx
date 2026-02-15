'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);

    const dismissed = localStorage.getItem('maha-sale-banner-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const endDate = new Date('2026-02-28T23:59:59').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('maha-sale-banner-dismissed', 'true');
  };

  if (!isClient || isDismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white">
      <div className="max-w-[112rem] mx-auto px-4 sm:px-8 lg:px-16 py-3 sm:py-5">
        <div className="flex items-center justify-between gap-3 sm:gap-8">
          {/* Main content - wraps on mobile */}
          <div className="flex-1 flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-8 text-sm sm:text-base">
            <span className="font-medium tracking-tight whitespace-nowrap">
              🔱 Mahashivratri Special Sale
            </span>

            <span className="hidden sm:inline text-white/40">|</span>

            {/* Timer with seconds on all screen sizes */}
            <div className="flex items-center gap-1 text-base sm:text-lg font-light tracking-wide tabular-nums">
              <span>{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm font-normal">d</span>
              <span className="text-white/40">:</span>
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm font-normal">h</span>
              <span className="text-white/40">:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm font-normal">m</span>
              <span className="text-white/40">:</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm font-normal">s</span>
            </div>

            <span className="hidden sm:inline text-white/40">|</span>

            <span className="text-white/90 text-xs sm:text-base text-center sm:text-left">
              Get It for FREE!
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-white/10 rounded transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
