'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const cta1Ref = useRef(null);
  const cta2Ref = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgeRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
        .from(headlineRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.7,
        }, '-=0.4')
        .from(subtitleRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
        }, '-=0.5')
        .from([cta1Ref.current, cta2Ref.current], {
          y: 20,
          opacity: 0,
          stagger: 0.15,
          duration: 0.5,
        }, '-=0.4')
        .from(imageRef.current, {
          x: 50,
          opacity: 0,
          duration: 0.8,
        }, '-=0.6')
        .from('.stat-card', {
          scale: 0.8,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
        }, '-=0.4');
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-warm-50 via-white to-warm-100">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e3dccf_1px,transparent_1px),linear-gradient(to_bottom,#e3dccf_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column - Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-primary-700">Live sessions happening now</span>
          </div>

          {/* Headline */}
          <h1 ref={headlineRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-primary-900">Stop tapping buttons.</span>
            <br />
            <span className="text-primary-600 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              Start speaking English.
            </span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-xl text-neutral-600 leading-relaxed max-w-xl">
            Real conversations with real people. Live coaching, speaking clubs, and interview prep—not endless lessons.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              ref={cta1Ref}
              href="/signup"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary-600 rounded-xl shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all duration-300 hover:-translate-y-0.5"
            >
              Join free
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              ref={cta2Ref}
              href="/quiz"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white border-2 border-primary-200 rounded-xl hover:border-primary-300 hover:bg-warm-50 transition-all duration-300"
            >
              Take a quiz
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600 pt-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">★★★★★</span>
              <span>4.9 (2,000+ reviews)</span>
            </div>
          </div>
        </div>

        {/* Right Column - Visual */}
        <div ref={imageRef} className="relative">
          <div className="relative bg-white rounded-3xl shadow-warm-lg p-6 sm:p-8 border border-warm-200 backdrop-blur-sm">
            {/* Demo content showing live session */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-warm-200">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                  SC
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg text-primary-900">Speaking Club Session</div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span>Live • 12 users</span>
                  </div>
                </div>
              </div>

              {/* Participant avatars */}
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-primary-300 to-primary-400 rounded-xl animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>

              {/* Chat bubble */}
              <div className="bg-gradient-to-br from-warm-50 to-warm-100 rounded-2xl p-5 border border-warm-200">
                <p className="text-primary-900 font-medium mb-2">&quot;How do you stay motivated?&quot;</p>
                <p className="text-sm text-neutral-600">Everyone shares tips...</p>
              </div>
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="stat-card absolute -right-4 sm:-right-8 top-1/4 bg-white rounded-2xl shadow-warm-lg p-4 sm:p-6 border border-warm-200 backdrop-blur-sm">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">50,000+</div>
            <div className="text-xs sm:text-sm text-neutral-600 whitespace-nowrap">Live conversations</div>
          </div>

          <div className="stat-card absolute -left-4 sm:-left-8 bottom-1/4 bg-white rounded-2xl shadow-warm-lg p-4 sm:p-6 border border-warm-200 backdrop-blur-sm">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">24/7</div>
            <div className="text-xs sm:text-sm text-neutral-600 whitespace-nowrap">Practice available</div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-warm-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '10,000+', label: 'Active learners' },
              { value: '100+', label: 'Expert coaches' },
              { value: '5,000+', label: 'Certificates earned' },
              { value: '15+', label: 'Speaking clubs daily' },
            ].map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
