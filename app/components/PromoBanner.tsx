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

    // Check dismissal status
    const dismissed = localStorage.getItem('maha-sale-banner-dismissed');
    if (dismissed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
      <div className="max-w-[112rem] mx-auto px-8 sm:px-12 lg:px-16 py-5">
        <div className="flex items-center justify-between gap-8">
          <div className="flex-1 flex items-center justify-center gap-8 text-base">
            <span className="font-medium tracking-tight">
              🔱 Mahashivratri Special Sale
            </span>

            <span className="hidden sm:inline text-white/40">|</span>

            <div className="hidden sm:flex items-center gap-1.5 text-lg font-light tracking-wide tabular-nums">
              <span>{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-sm font-normal">d</span>
              <span className="text-white/40 mx-0.5">:</span>
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-sm font-normal">h</span>
              <span className="text-white/40 mx-0.5">:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-sm font-normal">m</span>
              <span className="text-white/40 mx-0.5">:</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-sm font-normal">s</span>
            </div>

            <span className="hidden sm:inline text-white/40">|</span>

            <span className="text-white/90 text-sm sm:text-base">
              Limited Time Offer: Get It for FREE!
            </span>
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-2 hover:bg-white/10 rounded transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4 text-white/70 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

