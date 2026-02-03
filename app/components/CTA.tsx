import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Warm Gradient Background - Using your theme colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-100 via-warm-200 to-warm-300" />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px',
          color: 'var(--warm-600)'
        }} />
      </div>

      {/* Warm Glow Effects - Primary colors */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-300 rounded-full blur-3xl opacity-30 -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-20 -translate-y-1/2" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-primary-200 text-primary-700 rounded-full text-sm font-semibold mb-6 shadow-lg">
          <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
          Join 10,000+ active learners
        </div>

        {/* Main Heading - Dark warm color from your theme */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-900 mb-6 leading-tight">
          Ready to speak English with confidence?
        </h2>

        {/* Subheading - Medium warm from your theme */}
        <p className="text-lg md:text-xl text-warm-700 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          Start learning today. Practice with real people. Earn certificates that matter.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/signup"
            className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:from-primary-600 hover:to-primary-700 flex items-center justify-center gap-2"
          >
            Start learning — free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <Link
            href="/quiz"
            className="group w-full sm:w-auto px-8 py-4 bg-white text-primary-700 border-2 border-primary-400 rounded-xl font-semibold text-lg hover:bg-warm-50 hover:border-primary-500 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
          >
            Take a quick quiz
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-warm-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-semibold">Free to start</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-semibold">No credit card needed</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-semibold">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
