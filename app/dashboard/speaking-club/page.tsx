'use client';

import { useState } from 'react';
import { MessageSquare, Clock, Users, Calendar, Mic, Globe, CheckCircle2 } from 'lucide-react';
import BookingModal from '@/app/components/BookingModal';

export default function DashboardSpeakingClubPage() {
  const [showBooking, setShowBooking] = useState(false);

  const schedule = [
    { time: '7:00 AM', topic: 'Morning Warm-Up', level: 'All Levels', day: 'Mon-Fri' },
    { time: '10:00 AM', topic: 'Business English Discussion', level: 'Intermediate', day: 'Mon, Wed, Fri' },
    { time: '1:00 PM', topic: 'Current Affairs Chat', level: 'Advanced', day: 'Tue, Thu' },
    { time: '4:00 PM', topic: 'Casual Conversations', level: 'Beginner', day: 'Mon-Fri' },
    { time: '6:00 PM', topic: 'Career & Interview Talk', level: 'Intermediate', day: 'Mon, Wed' },
    { time: '8:00 PM', topic: 'Weekend Movie Discussion', level: 'All Levels', day: 'Sat' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-2">Speaking Clubs</h1>
        <p className="text-warm-600">Practice English daily with learners from across India</p>
      </div>

      {/* Free counselling banner */}
      <div className="bg-gradient-to-r from-primary-300 to-primary-400 rounded-2xl p-5 lg:p-6 mb-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Get a personalised speaking plan</h3>
            <p className="text-white/80 text-sm">Free 1:1 counselling session · <span className="line-through">₹999</span> <span className="text-olive-green-300 font-bold">FREE</span></p>
          </div>
          <button onClick={() => setShowBooking(true)} className="px-6 py-2.5 bg-white text-primary-800 rounded-lg font-semibold hover:bg-primary-50 transition-all text-sm whitespace-nowrap">
            Book Free Session
          </button>
        </div>
      </div>

      {/* What you get */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Mic, title: 'Daily Live Sessions', desc: '15+ speaking clubs every day' },
          { icon: Globe, title: 'Real Topics', desc: 'Business, tech, culture & more' },
          { icon: Users, title: 'Small Groups', desc: '10-15 learners per session' },
        ].map((f, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200 p-4">
            <f.icon className="w-5 h-5 text-primary-600 mb-2" />
            <h4 className="font-semibold text-primary-900 text-sm">{f.title}</h4>
            <p className="text-xs text-warm-600 mt-0.5">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-2xl border border-warm-200 mb-8">
        <div className="p-5 border-b border-warm-200">
          <h2 className="text-lg font-bold text-primary-900">Weekly Schedule</h2>
        </div>
        <div className="divide-y divide-warm-100">
          {schedule.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-warm-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-sm font-mono font-semibold text-primary-900 w-20">{s.time}</div>
                <div>
                  <div className="font-medium text-primary-900 text-sm">{s.topic}</div>
                  <div className="text-xs text-warm-500">{s.day}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full font-medium hidden sm:inline">{s.level}</span>
                <button onClick={() => setShowBooking(true)} className="px-4 py-1.5 bg-primary-600 text-white rounded-lg text-xs font-semibold hover:bg-primary-700 transition-all">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-warm-50 rounded-2xl p-6 mb-8">
        <h3 className="font-bold text-primary-900 mb-4">How it works</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { step: '1', title: 'Book a free counselling call', desc: 'We assess your level and goals' },
            { step: '2', title: 'Get your schedule', desc: 'We match you with the right sessions' },
            { step: '3', title: 'Start speaking', desc: 'Join live sessions via WhatsApp/Zoom' },
          ].map((s, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{s.step}</div>
              <div>
                <div className="font-semibold text-primary-900 text-sm">{s.title}</div>
                <div className="text-xs text-warm-600 mt-0.5">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-6">
        <button onClick={() => setShowBooking(true)} className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg">
          Book Free Counselling Session
        </button>
        <p className="text-xs text-warm-500 mt-2">No payment required · 30-min session · Get started today</p>
      </div>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} source="speaking-club" title="Book Free Speaking Assessment" />
    </div>
  );
}
