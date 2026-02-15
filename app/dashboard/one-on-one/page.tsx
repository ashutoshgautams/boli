'use client';

import { useState } from 'react';
import { Users, Video, Star, CheckCircle2, Calendar } from 'lucide-react';
import BookingModal from '@/app/components/BookingModal';

export default function DashboardOneOnOnePage() {
  const [showBooking, setShowBooking] = useState(false);

  const coaches = [
    { name: 'Dr. Sarah Johnson', specialty: 'Business English & IELTS', exp: '12 years', rating: 4.9 },
    { name: 'Coach Priya Patel', specialty: 'Conversational Fluency', exp: '8 years', rating: 4.8 },
    { name: 'Michael Chen', specialty: 'Interview & Presentation', exp: '10 years', rating: 4.9 },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-2">1:1 Coaching Sessions</h1>
        <p className="text-warm-600">Personal coaching tailored to your goals</p>
      </div>

      {/* Free counselling banner */}
      <div className="bg-gradient-to-r from-primary-300 to-primary-400 rounded-2xl p-5 lg:p-6 mb-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Try a free 1:1 counselling session</h3>
            <p className="text-white/80 text-sm">Meet an expert coach · <span className="line-through">₹999</span> <span className="text-yellow-300 font-bold">FREE</span></p>
          </div>
          <button onClick={() => setShowBooking(true)} className="px-6 py-2.5 bg-white text-purple-700 rounded-lg font-semibold hover:bg-purple-50 transition-all text-sm whitespace-nowrap">
            Book Free Session
          </button>
        </div>
      </div>

      {/* Coaches */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-primary-900 mb-4">Our Expert Coaches</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {coaches.map((c, i) => (
            <div key={i} className="bg-white rounded-xl border border-warm-200 p-5">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-3">
                {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <h4 className="font-semibold text-primary-900 text-sm">{c.name}</h4>
              <p className="text-xs text-warm-600 mb-2">{c.specialty}</p>
              <div className="flex items-center gap-2 text-xs text-warm-500">
                <span>{c.exp} exp</span>
                <span>·</span>
                <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />{c.rating}</span>
              </div>
              <button onClick={() => setShowBooking(true)} className="w-full mt-3 py-2 bg-primary-600 text-white rounded-lg text-xs font-semibold hover:bg-primary-700 transition-all">
                Book Session
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* What's offered */}
      <div className="bg-white rounded-2xl border border-warm-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-primary-900 mb-4">Coaching Programs</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'General English', desc: 'Grammar, vocabulary, pronunciation', icon: Users },
            { title: 'Business English', desc: 'Presentations, emails, meetings', icon: Users },
            { title: 'Exam Preparation', desc: 'IELTS, TOEFL, PTE coaching', icon: Star },
            { title: 'Interview Coaching', desc: 'Mock interviews & feedback', icon: Video },
          ].map((p, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-warm-50 transition-colors">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <p.icon className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-primary-900 text-sm">{p.title}</h4>
                <p className="text-xs text-warm-600">{p.desc}</p>
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
        <p className="text-xs text-warm-500 mt-2">Meet your coach · No payment required</p>
      </div>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} source="1on1" title="Book Free 1:1 Counselling" />
    </div>
  );
}
