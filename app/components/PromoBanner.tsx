'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('launch-banner-dismissed');
    }
    return true;
  });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const launchDate = new Date('2026-02-15T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('launch-banner-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white border-b border-primary-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1 flex items-center justify-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              {/* Main announcement */}
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-[15px] tracking-tight leading-tight">
                  Mahashivratri Launch Sale Is Live! ✨
                </span>
              </div>
              
              {/* Countdown */}
              {timeLeft.days > 0 && (
                <>
                  <span className="hidden sm:inline text-white/30">|</span>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex flex-col items-center min-w-[44px]">
                      <span className="text-2xl sm:text-[28px] font-bold tabular-nums leading-none tracking-tight">
                        {String(timeLeft.days).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/60 uppercase tracking-[0.08em] font-semibold mt-1">
                        Days
                      </span>
                    </div>
                    <span className="text-white/30 text-lg">:</span>
                    <div className="flex flex-col items-center min-w-[44px]">
                      <span className="text-2xl sm:text-[28px] font-bold tabular-nums leading-none tracking-tight">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/60 uppercase tracking-[0.08em] font-semibold mt-1">
                        Hours
                      </span>
                    </div>
                    <span className="text-white/30 text-lg">:</span>
                    <div className="flex flex-col items-center min-w-[44px]">
                      <span className="text-2xl sm:text-[28px] font-bold tabular-nums leading-none tracking-tight">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/60 uppercase tracking-[0.08em] font-semibold mt-1">
                        Min
                      </span>
                    </div>
                  </div>
                </>
              )}
              
              {/* Early Bird CTA */}
              <span className="hidden lg:inline text-white/30">|</span>
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-xs font-medium text-white/80 tracking-tight">
                  Start Learning Today! It&apos;s free.
                </span>
                <a 
                  href="#pricing" 
                  className="text-xs font-bold text-white bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-md transition-all duration-200 uppercase tracking-[0.05em]"
                >
                  Claim Offer
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1.5 hover:bg-white/10 rounded transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4 text-white/70 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
