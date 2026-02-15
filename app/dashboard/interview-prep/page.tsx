'use client';

import { useState } from 'react';
import { Target, Users, Briefcase, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';
import BookingModal from '@/app/components/BookingModal';

export default function DashboardInterviewPrepPage() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-2">Interview Preparation</h1>
        <p className="text-warm-600">Ace your next interview with expert coaching</p>
      </div>

      {/* Free counselling banner */}
      <div className="bg-gradient-to-r from-primary-300 to-primary-400 rounded-2xl p-5 lg:p-6 mb-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Free Career Counselling Session</h3>
            <p className="text-white/80 text-sm">Get a personalised interview strategy · <span className="line-through">₹999</span> <span className="text-yellow-300 font-bold">FREE</span></p>
          </div>
          <button onClick={() => setShowBooking(true)} className="px-6 py-2.5 bg-white text-primary-800 rounded-lg font-semibold hover:bg-primary-50 transition-all text-sm whitespace-nowrap">
            Book Free Session
          </button>
        </div>
      </div>

      {/* Interview types */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Briefcase, title: 'Technical Interviews', desc: 'System design, coding walkthroughs, technical communication' },
          { icon: Users, title: 'Behavioral Interviews', desc: 'STAR method, leadership stories, conflict resolution' },
          { icon: Target, title: 'HR & Culture Fit', desc: 'Salary negotiation, company research, career goals' },
        ].map((t, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200 p-5">
            <t.icon className="w-5 h-5 text-primary-600 mb-3" />
            <h4 className="font-semibold text-primary-900 text-sm mb-1">{t.title}</h4>
            <p className="text-xs text-warm-600">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* What's included */}
      <div className="bg-white rounded-2xl border border-warm-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-primary-900 mb-4">What our program includes</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            'Mock interviews with expert coaches',
            'Company-specific preparation (Google, Amazon, etc.)',
            'Resume & LinkedIn optimization',
            'Real-time feedback and scoring',
            'Answer structuring frameworks',
            'Confidence building exercises',
            'Salary negotiation techniques',
            'Post-interview follow-up strategy',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-warm-700">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Success stories */}
      <div className="bg-warm-50 rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-primary-900 mb-4">Success Stories</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { name: 'Priya S.', result: 'SDE at Google', quote: 'The mock interviews changed everything' },
            { name: 'Arjun P.', result: '5 job offers', quote: 'Learned to structure answers effectively' },
            { name: 'Meera S.', result: '40% salary hike', quote: 'Negotiation coaching was incredible' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-4">
              <div className="text-sm font-bold text-primary-900">{s.name}</div>
              <div className="text-xs text-primary-600 font-medium mb-2">{s.result}</div>
              <p className="text-xs text-warm-600 italic">&ldquo;{s.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-6">
        <button onClick={() => setShowBooking(true)} className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg">
          Book Free Career Counselling
        </button>
        <p className="text-xs text-warm-500 mt-2">No payment required · Expert career guidance · Limited slots</p>
      </div>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} source="interview-prep" title="Book Free Career Counselling" />
    </div>
  );
}
