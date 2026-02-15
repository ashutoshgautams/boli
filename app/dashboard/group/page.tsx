'use client';

import { useState } from 'react';
import { Users, Calendar, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import BookingModal from '@/app/components/BookingModal';

export default function DashboardGroupPage() {
  const [showBooking, setShowBooking] = useState(false);

  const cohorts = [
    { title: 'Business English Fundamentals', level: 'Intermediate', schedule: 'Mon & Wed, 7 PM', duration: '8 weeks', spots: 3 },
    { title: 'IELTS Speaking Mastery', level: 'Advanced', schedule: 'Tue & Thu, 8 PM', duration: '6 weeks', spots: 7 },
    { title: 'Conversational English', level: 'Beginner', schedule: 'Mon, Wed, Fri, 6 PM', duration: '10 weeks', spots: 12 },
    { title: 'Interview English Bootcamp', level: 'Intermediate', schedule: 'Sat & Sun, 10 AM', duration: '4 weeks', spots: 5 },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-2">Group Coaching Classes</h1>
        <p className="text-warm-600">Learn together in structured cohorts with expert instructors</p>
      </div>

      {/* Free counselling banner */}
      <div className="bg-gradient-to-r from-primary-300 to-primary-400 rounded-2xl p-5 lg:p-6 mb-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Not sure which cohort is right?</h3>
            <p className="text-white/80 text-sm">Free counselling to find your perfect group · <span className="line-through">₹999</span> <span className="text-yellow-300 font-bold">FREE</span></p>
          </div>
          <button onClick={() => setShowBooking(true)} className="px-6 py-2.5 bg-white text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-all text-sm whitespace-nowrap">
            Book Free Session
          </button>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { icon: Users, label: '10-15 per group' },
          { icon: TrendingUp, label: 'Affordable pricing' },
          { icon: Calendar, label: 'Fixed schedule' },
          { icon: Clock, label: 'Live sessions' },
        ].map((b, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200 p-3 text-center">
            <b.icon className="w-5 h-5 text-primary-600 mx-auto mb-1" />
            <span className="text-xs font-medium text-primary-900">{b.label}</span>
          </div>
        ))}
      </div>

      {/* Upcoming Cohorts */}
      <div className="bg-white rounded-2xl border border-warm-200 mb-8">
        <div className="p-5 border-b border-warm-200">
          <h2 className="text-lg font-bold text-primary-900">Upcoming Cohorts</h2>
        </div>
        <div className="divide-y divide-warm-100">
          {cohorts.map((c, i) => (
            <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-primary-900 text-sm">{c.title}</h4>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-warm-600">
                  <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full font-medium">{c.level}</span>
                  <span>{c.schedule} IST</span>
                  <span>·</span>
                  <span>{c.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-warm-500">{c.spots} spots left</span>
                <button onClick={() => setShowBooking(true)} className="px-4 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-semibold hover:bg-primary-700 transition-all">
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-6">
        <button onClick={() => setShowBooking(true)} className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg">
          Book Free Counselling Session
        </button>
        <p className="text-xs text-warm-500 mt-2">We&apos;ll help you choose the right cohort</p>
      </div>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} source="group" title="Book Free Group Counselling" />
    </div>
  );
}
