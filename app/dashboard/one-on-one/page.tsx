'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Users, Video, Calendar, Clock, Star, CheckCircle2, Award, MessageSquare } from 'lucide-react';

interface Coach {
  id: string;
  name: string;
  avatar: string;
  title: string;
  experience: string;
  rating: number;
  students: number;
  specialties: string[];
  availability: string;
}

interface Session {
  id: string;
  coach: string;
  scheduledFor: string;
  duration: number;
  type: string;
  status: 'upcoming' | 'completed';
}

export default function DashboardOneOnOnePage() {
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);

  const coaches: Coach[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      avatar: 'SJ',
      title: 'IELTS Expert',
      experience: '15 years',
      rating: 4.9,
      students: 2000,
      specialties: ['IELTS', 'Academic English', 'Pronunciation'],
      availability: 'Mon-Fri, 9 AM - 6 PM IST'
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'MC',
      title: 'Business Communication Specialist',
      experience: '12 years',
      rating: 4.8,
      students: 1500,
      specialties: ['Business English', 'Presentations', 'Negotiations'],
      availability: 'Tue-Sat, 10 AM - 7 PM IST'
    },
    {
      id: '3',
      name: 'Priya Patel',
      avatar: 'PP',
      title: 'Career Coach',
      experience: '10 years',
      rating: 5.0,
      students: 1800,
      specialties: ['Interview Prep', 'Resume Writing', 'LinkedIn'],
      availability: 'Mon-Fri, 2 PM - 9 PM IST'
    }
  ];

  const packages = [
    {
      name: 'Trial Session',
      price: 499,
      originalPrice: 999,
      sessions: 1,
      validity: '7 days',
      features: [
        '1 session (30 minutes)',
        'Goal setting & assessment',
        'Personalized learning plan',
        'Homework & practice materials'
      ],
      badge: 'Try Before You Commit',
      popular: false
    },
    {
      name: 'Essential Package',
      price: 4999,
      originalPrice: 6990,
      sessions: 8,
      validity: '2 months',
      features: [
        '8 sessions (60 min each)',
        'Dedicated coach assignment',
        'Custom curriculum',
        'Progress tracking',
        'Email support',
        'Session recordings'
      ],
      badge: 'Best Value',
      popular: true
    },
    {
      name: 'Professional Package',
      price: 8999,
      originalPrice: 12990,
      sessions: 15,
      validity: '3 months',
      features: [
        '15 sessions (60 min each)',
        'Premium coach access',
        'Flexible scheduling',
        'Resume & LinkedIn review',
        'Interview preparation',
        'Priority support',
        'Lifetime material access'
      ],
      badge: 'Most Comprehensive',
      popular: false
    }
  ];

  const upcomingSessions: Session[] = [
    {
      id: '1',
      coach: 'Dr. Sarah Johnson',
      scheduledFor: '2026-02-12T15:00:00',
      duration: 60,
      type: 'Business English',
      status: 'upcoming'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          1:1 Personal Coaching
        </h1>
        <p className="text-warm-600">
          Get personalized attention from expert English coaches
        </p>
      </div>

      {/* Free Counselling Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              Start with a Free Counselling Session! 🎉
            </h2>
            <p className="text-white/90 mb-4">
              Not sure which package is right for you? Book a free 30-minute counselling session. 
              We&apos;ll discuss your goals, assess your level, and recommend the best learning path.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Personalized goal assessment
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Custom learning roadmap
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Package recommendations & discounts
              </li>
            </ul>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-bold hover:bg-warm-50 transition-all shadow-xl"
            >
              <Calendar className="w-5 h-5" />
              Book Free Session
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      {upcomingSessions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-primary-900 mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-2xl border border-warm-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Video className="w-7 h-7 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-900 mb-1">{session.type}</h3>
                      <p className="text-sm text-warm-600">with {session.coach}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary-900">
                        {new Date(session.scheduledFor).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </p>
                      <p className="text-sm text-warm-600">
                        {new Date(session.scheduledFor).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all">
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meet Our Coaches */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-primary-900 mb-6">Meet Our Expert Coaches</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="bg-white rounded-2xl border border-warm-200 p-6 hover:shadow-xl transition-all"
            >
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  {coach.avatar}
                </div>
                <h3 className="text-lg font-bold text-primary-900 mb-1">{coach.name}</h3>
                <p className="text-sm text-warm-600 mb-2">{coach.title}</p>
                <div className="flex items-center justify-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{coach.rating}</span>
                  </div>
                  <span className="text-warm-500">•</span>
                  <span className="text-warm-600">{coach.experience}</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs font-semibold text-warm-700 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {coach.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-warm-700 mb-1">Availability:</p>
                  <p className="text-xs text-warm-600">{coach.availability}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCoach(coach.id)}
                className="w-full py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-all"
              >
                Book with {coach.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-primary-900 mb-2 text-center">
          Choose Your Package
        </h2>
        <p className="text-center text-warm-600 mb-8">
          Special scholarships available after counselling session
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-2xl p-8 transition-all ${
                pkg.popular
                  ? 'border-2 border-primary-600 shadow-lg scale-105'
                  : 'border border-warm-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary-600 text-white text-sm font-semibold rounded-full">
                  {pkg.badge}
                </div>
              )}

              {!pkg.popular && pkg.badge && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary-900 mb-2">{pkg.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-primary-900">
                    ₹{pkg.price.toLocaleString()}
                  </span>
                  <span className="ml-2 text-lg text-warm-500 line-through">
                    ₹{pkg.originalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-warm-600 mb-2">
                  {pkg.sessions} sessions • {pkg.validity} validity
                </p>
                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start gap-2 text-sm text-warm-700">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  pkg.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
                    : 'bg-white border-2 border-primary-200 text-primary-700 hover:bg-warm-50'
                }`}
              >
                Select Package
              </button>
              <p className="text-xs text-center text-warm-500 mt-3">
                Payment during counselling call
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-warm-50 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-primary-900 mb-6 text-center">
          How It Works
        </h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Book Counselling', desc: 'Schedule your free session', icon: Calendar },
            { step: '2', title: 'Get Assessment', desc: 'We evaluate your goals & level', icon: Award },
            { step: '3', title: 'Choose Package', desc: 'Select the best fit for you', icon: CheckCircle2 },
            { step: '4', title: 'Start Learning', desc: 'Begin your journey', icon: Users }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                {item.step}
              </div>
              <item.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h4 className="font-semibold text-primary-900 mb-2">{item.title}</h4>
              <p className="text-sm text-warm-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
