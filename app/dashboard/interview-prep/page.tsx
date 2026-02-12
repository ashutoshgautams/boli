'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Target, Video, Calendar, Clock, CheckCircle2, Users, Award, TrendingUp } from 'lucide-react';

interface InterviewSession {
  id: string;
  type: 'mock' | 'coaching';
  scheduledFor: string;
  duration: number;
  coach: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  feedback?: string;
  score?: number;
}

interface PastInterview {
  id: string;
  date: string;
  type: string;
  coach: string;
  score: number;
  strengths: string[];
  improvements: string[];
}

export default function DashboardInterviewPrepPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'book'>('upcoming');

  // Mock data
  const upcomingSessions: InterviewSession[] = [
    {
      id: '1',
      type: 'mock',
      scheduledFor: '2026-02-12T14:00:00',
      duration: 60,
      coach: 'Sarah Johnson',
      status: 'upcoming'
    },
    {
      id: '2',
      type: 'coaching',
      scheduledFor: '2026-02-15T10:00:00',
      duration: 45,
      coach: 'Michael Chen',
      status: 'upcoming'
    }
  ];

  const pastInterviews: PastInterview[] = [
    {
      id: '1',
      date: '2026-02-05',
      type: 'Technical Interview',
      coach: 'Sarah Johnson',
      score: 85,
      strengths: ['Clear communication', 'Good technical knowledge', 'Confident delivery'],
      improvements: ['Provide more specific examples', 'Reduce filler words']
    },
    {
      id: '2',
      date: '2026-01-28',
      type: 'Behavioral Interview',
      coach: 'Priya Patel',
      score: 78,
      strengths: ['Good STAR method usage', 'Relevant examples'],
      improvements: ['Better time management', 'More enthusiasm']
    }
  ];

  const packages = [
    {
      name: 'Single Session',
      price: 999,
      sessions: 1,
      features: [
        '1 mock interview (60 min)',
        'Detailed feedback report',
        'Score & areas to improve',
        'Resume review included'
      ],
      popular: false
    },
    {
      name: 'Interview Starter',
      price: 3999,
      originalPrice: 4999,
      sessions: 5,
      features: [
        '5 mock interviews',
        'Personalized improvement plan',
        'Priority scheduling',
        'Email support',
        'Interview question bank access'
      ],
      popular: true
    },
    {
      name: 'Job Seeker Pro',
      price: 6999,
      originalPrice: 9990,
      sessions: 10,
      features: [
        '10 mock interviews',
        'Dedicated interview coach',
        'Resume & LinkedIn optimization',
        'Job application strategy',
        'Company-specific preparation',
        '3 months validity'
      ],
      popular: false
    }
  ];

  const stats = {
    sessionsCompleted: 12,
    averageScore: 82,
    improvement: '+15%',
    nextSession: '2 days'
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          Interview Preparation
        </h1>
        <p className="text-warm-600">
          Practice with experts and ace your next interview
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">{stats.sessionsCompleted}</div>
          <div className="text-sm text-warm-600">Sessions Done</div>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">{stats.averageScore}</div>
          <div className="text-sm text-warm-600">Average Score</div>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              {stats.improvement}
            </span>
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">Improving</div>
          <div className="text-sm text-warm-600">Last 30 Days</div>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">{stats.nextSession}</div>
          <div className="text-sm text-warm-600">Next Session</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-warm-200">
        {[
          { key: 'upcoming', label: 'Upcoming Sessions' },
          { key: 'history', label: 'Past Sessions' },
          { key: 'book', label: 'Book Session' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'upcoming' | 'history' | 'book')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-warm-600 hover:text-primary-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Upcoming Sessions */}
      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-2xl border border-warm-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Video className="w-7 h-7 text-primary-600" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-primary-900 mb-1">
                          {session.type === 'mock' ? 'Mock Interview' : '1:1 Coaching'}
                        </h3>
                        <p className="text-sm text-warm-600">
                          with {session.coach}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {session.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2 text-sm text-warm-700">
                        <Calendar className="w-4 h-4" />
                        {new Date(session.scheduledFor).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-warm-700">
                        <Clock className="w-4 h-4" />
                        {new Date(session.scheduledFor).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-warm-700">
                        <Clock className="w-4 h-4" />
                        {session.duration} minutes
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-all">
                        Join Session
                      </button>
                      <button className="px-6 py-2 bg-white border border-warm-200 text-warm-700 rounded-lg font-medium text-sm hover:bg-warm-50 transition-all">
                        Reschedule
                      </button>
                      <button className="px-6 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-warm-200 p-12 text-center">
              <Calendar className="w-16 h-16 text-warm-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                No Upcoming Sessions
              </h3>
              <p className="text-warm-600 mb-6">
                Book a mock interview to start practicing
              </p>
              <button
                onClick={() => setActiveTab('book')}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all"
              >
                Book Your First Session
              </button>
            </div>
          )}
        </div>
      )}

      {/* History */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {pastInterviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white rounded-2xl border border-warm-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-primary-900 mb-1">
                    {interview.type}
                  </h3>
                  <p className="text-sm text-warm-600">
                    {new Date(interview.date).toLocaleDateString('en-IN')} • {interview.coach}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-900 mb-1">
                    {interview.score}
                  </div>
                  <div className="text-xs text-warm-600">Score</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {interview.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm text-warm-700 flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Areas to Improve
                  </h4>
                  <ul className="space-y-2">
                    {interview.improvements.map((improvement, idx) => (
                      <li key={idx} className="text-sm text-warm-700 flex items-start gap-2">
                        <span className="text-orange-600 mt-0.5">→</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-warm-200">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View Full Report →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Book Session */}
      {activeTab === 'book' && (
        <div>
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary-900 mb-2">
                  Free Counselling Session Available! 🎉
                </h3>
                <p className="text-warm-700 mb-3">
                  Book a free 30-minute counselling session with our experts. We&apos;ll assess your goals, 
                  discuss the best preparation strategy, and help you choose the right package.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Free Counselling
                </Link>
              </div>
            </div>
          </div>

          {/* Packages */}
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
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-primary-900">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                    {pkg.originalPrice && (
                      <span className="ml-2 text-lg text-warm-500 line-through">
                        ₹{pkg.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-warm-600">
                    {pkg.sessions} session{pkg.sessions > 1 ? 's' : ''}
                  </p>
                  {pkg.originalPrice && (
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-2 text-warm-700">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
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
                  Book Now
                </button>

                <p className="text-xs text-center text-warm-500 mt-4">
                  Payment via Google Meet/Call
                </p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-warm-50 rounded-2xl p-6">
            <h3 className="font-bold text-primary-900 mb-4">What&apos;s Included:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-warm-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Real-time feedback during the interview</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Detailed score report after each session</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Company-specific preparation tips</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Access to interview question bank</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
