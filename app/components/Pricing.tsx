'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

const PRICE_STAGES = [
  { value: 9999, duration: 10780 },   // 600 * 1.3
  { value: 999, duration: 9170 },   // 900 * 1.3
  { value: 99, duration: 7560 },    // 1200 * 1.3
  { value: 9, duration: 9950 },     // 1500 * 1.3
  { value: 0, duration: 0 },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [phase, setPhase] = useState<'blur' | 'counting' | 'reveal'>('blur');
  const [displayPrice, setDisplayPrice] = useState(9999);
  const [stageIdx, setStageIdx] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pulsePrice, setPulsePrice] = useState(false);

  // Generate confetti properties once, not on every render
  const confettiParticles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      // eslint-disable-next-line react-hooks/purity
      left: Math.random() * 100,
      backgroundColor: ['#6B8E4E', '#8DB563', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'][i % 6],
      // eslint-disable-next-line react-hooks/purity
      animationDelay: Math.random() * 0.8,
      // eslint-disable-next-line react-hooks/purity
      animationDuration: 1.5 + Math.random() * 2,
    }));
  }, []);

  // Trigger on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          // Small delay then start
          setTimeout(() => setPhase('counting'), 600);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasTriggered]);

  // Animate price countdown
  const animateToValue = useCallback((from: number, to: number, duration: number, onDone: () => void) => {
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out-expo for dramatic slowdown
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(from - (from - to) * eased);
      setDisplayPrice(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayPrice(to);
        onDone();
      }
    };

    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (phase !== 'counting') return;

    if (stageIdx >= PRICE_STAGES.length - 1) {
      // Final reveal
      setTimeout(() => {
        setPhase('reveal');
        setShowConfetti(true);
        setPulsePrice(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }, 300);
      return;
    }

    const from = PRICE_STAGES[stageIdx].value;
    const to = PRICE_STAGES[stageIdx + 1].value;
    const duration = PRICE_STAGES[stageIdx].duration;

    // Pause at each stage for suspense
    const pauseDuration = stageIdx === 0 ? 200 : 400 + stageIdx * 200;

    const timeout = setTimeout(() => {
      animateToValue(from, to, duration, () => {
        setStageIdx((s) => s + 1);
      });
    }, pauseDuration);

    return () => clearTimeout(timeout);
  }, [phase, stageIdx, animateToValue]);

  const formatPrice = (n: number) => {
    if (n === 0) return 'FREE';
    return `₹${n.toLocaleString('en-IN')}`;
  };

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      {/* Confetti particles */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {confettiParticles.map((particle) => (
            <span
              key={particle.id}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${particle.left}%`,
                backgroundColor: particle.backgroundColor,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-200 rounded-full mb-6">
            <span className="text-sm font-medium text-primary-700">Launch Offer</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-4 pb-3">
            What does it cost to get started?
          </h2>
          <p className="inline-flex items-center text-xl text-warm-600 max-w-2xl mx-auto">
            We believe everyone deserves access to great English coaching.
          </p>
        </div>

        {/* The Card */}
        <div className="max-w-lg mx-auto">
          <div
            className={`relative rounded-3xl border-2 transition-all duration-1000 ease-out overflow-hidden ${
              phase === 'blur'
                ? 'border-warm-200 blur-sm scale-[0.97] opacity-70'
                : phase === 'counting'
                ? 'border-primary-300 blur-0 scale-100 opacity-100 shadow-xl'
                : 'border-primary-400 blur-0 scale-100 opacity-100 shadow-2xl'
            }`}
          >
            {/* Glow effect on reveal */}
            {phase === 'reveal' && (
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-yellow-300 to-primary-400 rounded-3xl opacity-20 animate-pulse" />
            )}

            <div className="relative bg-white rounded-3xl p-8 sm:p-10">
              {/* Plan name */}
              <div className="text-center mb-8">
                <span className="text-sm font-semibold text-primary-600 uppercase tracking-widest">
                  Basic Plan
                </span>
                <p className="text-warm-500 text-sm mt-1">Everything you need to begin</p>
              </div>

              {/* The Price — the star of the show */}
              <div className="text-center mb-10">
                <div className="relative inline-block">
                  {/* Strikethrough prices */}
                  {phase !== 'blur' && displayPrice < 9999 && (
                    <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
                      {PRICE_STAGES.slice(0, stageIdx).map((stage) => (
                        <span
                          key={stage.value}
                          className="text-lg text-warm-400 line-through decoration-2"
                        >
                          ₹{stage.value.toLocaleString('en-IN')}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Current price */}
                  <div
                    className={`transition-all duration-300 ${
                      pulsePrice ? 'animate-bounce-once' : ''
                    }`}
                  >
                    <span
                      className={`font-bold leading-none tracking-tight transition-all duration-500 ${
                        displayPrice === 0
                          ? 'text-7xl sm:text-8xl bg-gradient-to-r from-primary-500 via-green-500 to-primary-600 bg-clip-text text-transparent'
                          : 'text-6xl sm:text-7xl text-primary-900'
                      }`}
                    >
                      {formatPrice(displayPrice)}
                    </span>
                  </div>

                  {/* Subtext under price */}
                  <p className={`mt-3 text-sm transition-all duration-500 ${
                    phase === 'reveal'
                      ? 'text-green-600 font-semibold'
                      : 'text-warm-500'
                  }`}>
                    {phase === 'reveal'
                      ? '✨ Yes, really. Free to get started.'
                      : phase === 'counting'
                      ? 'Wait for it...'
                      : 'Calculating your price...'}
                  </p>
                </div>
              </div>

              {/* Features - fade in on reveal */}
              <div
                className={`transition-all duration-700 delay-300 ${
                  phase === 'reveal'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="border-t border-warm-200 pt-8 mb-8">
                  <p className="text-sm font-semibold text-primary-900 mb-5 uppercase tracking-wider pb-3">
                    What you get for ₹0
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Your first session free in every program',
                      'Access to daily speaking clubs',
                      'Community forum & peer practice',
                      'Basic progress tracking',
                      'English level assessment',
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-warm-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href="/signup"
                  className="group flex items-center justify-center gap-2 w-full py-4 bg-primary-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  Get started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="text-center text-xs text-warm-500 mt-4">
                  No credit card required · Upgrade anytime
                </p>
              </div>

              {/* Teaser for paid — subtle */}
              <div
                className={`transition-all duration-700 delay-700 ${
                  phase === 'reveal'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="mt-8 pt-6 border-t border-dashed border-warm-200 text-center">
                  <p className="text-sm text-warm-600">
                    Want 1:1 coaching, interview prep & certificates?
                  </p>
                  <p className="text-sm text-primary-600 font-semibold mt-1">
                    Paid plans starting at a price that&apos;ll surprise you 😉
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-1000 ${
            phase === 'reveal' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-warm-600">
            No hidden fees · Cancel anytime · Real humans, not bots
          </p>
        </div>
      </div>
    </section>
  );
}
