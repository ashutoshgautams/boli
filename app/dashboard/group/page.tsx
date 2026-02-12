'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Users, Calendar, Clock, CheckCircle2, Video, TrendingUp } from 'lucide-react';

interface GroupCohort {
  id: string;
  title: string;
  level: string;
  duration: string;
  schedule: string;
  startDate: string;
  spotsLeft: number;
  totalSpots: number;
  instructor: string;
  topics: string[];
}

export default function DashboardGroupCoachingPage() {
  const [enrolledCohorts, setEnrolledCohorts] = useState<string[]>(['1']);

  const availableCohorts: GroupCohort[] = [
    {
      id: '1',
      title: 'Business English Fundamentals',
      level: 'Intermediate',
      duration: '8 weeks',
      schedule: 'Mon & Wed, 7:00 PM IST',
      startDate: '2026-02-15',
      spotsLeft: 3,
      totalSpots: 15,
      instructor: 'Sarah Johnson',
      topics: ['Email Writing', 'Meeting Skills', 'Presentations', 'Negotiations']
    },
    {
      id: '2',
      title: 'IELTS Speaking Mastery',
      level: 'Advanced',
      duration: '6 weeks',
      schedule: 'Tue & Thu, 8:00 PM IST',
      startDate: '2026-02-20',
      spotsLeft: 7,
      totalSpots: 12,
      instructor: 'Michael Chen',
      topics: ['Part 1 Strategies', 'Part 2 Preparation', 'Part 3 Discussion', 'Mock Tests']
    },
    {
      id: '3',
      title: 'Conversational English',
      level: 'Beginner',
      duration: '10 weeks',
      schedule: 'Mon, Wed & Fri, 6:00 PM IST',
      startDate: '2026-03-01',
      spotsLeft: 12,
      totalSpots: 15,
      instructor: 'Priya Patel',
      topics: ['Daily Conversations', 'Common Phrases', 'Pronunciation', 'Confidence Building']
    }
  ];

  const packages = [
    {
      name: 'Single Cohort',
      price: 3999,
      originalPrice: 5999,
      cohorts: 1,
      validity: 'Until cohort completion',
      features: [
        'Join 1 group cohort',
        '12-16 live sessions',
        'Group size: 10-15 students',
        'Session recordings',
        'Study materials',
        'Certificate on completion'
      ],
      popular: false
    },
    {
      name: 'Multi-Cohort Pass',
      price: 9999,
      originalPrice: 14999,
      cohorts: 3,
      validity: '6 months',
      features: [
        'Join up to 3 cohorts',
        'Mix different levels',
        'Priority enrollment',
        'All session recordings',
        'Premium materials',
        'Progress tracking',
        'Certificates for all'
      ],
      popular: true
    },
    {
      name: 'Unlimited Access',
      price: 14999,
      originalPrice: 24990,
      cohorts: 'Unlimited',
      validity: '1 year',
      features: [
        'Join unlimited cohorts',
        'All levels & topics',
        'First priority booking',
        'Lifetime recordings',
        'Premium+ materials',
        '1:1 mentor support',
        'All certificates'
      ],
      popular: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          Group Coaching Classes
        </h1>
        <p className="text-warm-600">
          Learn together in structured cohorts with expert instructors
        </p>
      </div>

      {/* Free Counselling Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">
              Not sure which cohort is right for you?
            </h3>
            <p className="text-white/90 text-sm mb-3">
              Schedule a free counselling session. We&apos;ll assess your level and recommend 
              the perfect cohort for your goals. Plus, get exclusive scholarship discounts!
            </p>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-warm-50 transition-all"
          >
            <Calendar className="w-5 h-5" />
            Free Counselling
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">1</div>
          <div className="text-sm text-warm-600">Active Cohorts</div>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Video className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">6</div>
          <div className="text-sm text-warm-600">Sessions Attended</div>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">85%</div>
          <div className="text-sm text-warm-600">Progress</div>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">0</div>
          <div className="text-sm text-warm-600">Completed</div>
        </div>
      </div>

      {/* My Cohorts */}
      {enrolledCohorts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-primary-900 mb-4">My Active Cohorts</h2>
          <div className="space-y-4">
            {availableCohorts
              .filter(c => enrolledCohorts.includes(c.id))
              .map((cohort) => (
                <div
                  key={cohort.id}
                  className="bg-white rounded-2xl border border-warm-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary-900 mb-2">
                        {cohort.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-warm-600 mb-3">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
                          {cohort.level}
                        </span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {cohort.schedule}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {cohort.totalSpots - cohort.spotsLeft}/{cohort.totalSpots} enrolled
                        </div>
                      </div>
                      <p className="text-sm text-warm-600">
                        Instructor: {cohort.instructor}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href="#"
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all"
                      >
                        Join Next Session
                      </Link>
                      <Link
                        href="#"
                        className="px-6 py-2 bg-white border border-warm-200 text-warm-700 rounded-lg font-medium hover:bg-warm-50 transition-all"
                      >
                        View Materials
                      </Link>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-warm-700">Course Progress</span>
                      <span className="font-semibold text-primary-900">6/12 sessions</span>
                    </div>
                    <div className="w-full h-2 bg-warm-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                        style={{ width: '50%' }}
                      />
                    </div>
                  </div>

                  {/* Topics */}
                  <div>
                    <p className="text-xs font-semibold text-warm-700 mb-2">Topics Covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {cohort.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-warm-100 text-warm-700 rounded text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Available Cohorts */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-primary-900 mb-4">
          Available Cohorts - Starting Soon
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {availableCohorts
            .filter(c => !enrolledCohorts.includes(c.id))
            .map((cohort) => (
              <div
                key={cohort.id}
                className="bg-white rounded-2xl border border-warm-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-primary-900 mb-2">
                      {cohort.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium mb-3">
                      {cohort.level}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-orange-600">
                      {cohort.spotsLeft} spots left
                    </div>
                    <div className="text-xs text-warm-600">
                      of {cohort.totalSpots}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm text-warm-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>Starts {new Date(cohort.startDate).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{cohort.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>Instructor: {cohort.instructor}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-warm-700 mb-2">What You&apos;ll Learn:</p>
                  <div className="flex flex-wrap gap-2">
                    {cohort.topics.slice(0, 3).map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-warm-100 text-warm-700 rounded text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                    {cohort.topics.length > 3 && (
                      <span className="px-2 py-1 text-warm-600 text-xs">
                        +{cohort.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setEnrolledCohorts([...enrolledCohorts, cohort.id])}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all"
                >
                  Enroll Now
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
          Save more by enrolling in multiple cohorts. Special scholarships available!
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
                  Best Value
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
                  {pkg.cohorts} cohort{typeof pkg.cohorts === 'number' && pkg.cohorts > 1 ? 's' : ''} • {pkg.validity}
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
                Payment during counselling
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How Group Learning Works */}
      <div className="bg-warm-50 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-primary-900 mb-6 text-center">
          How Group Learning Works
        </h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Choose Cohort', desc: 'Select based on level & schedule' },
            { step: '2', title: 'Enroll', desc: 'Secure your spot in the group' },
            { step: '3', title: 'Attend Live', desc: 'Join 2-3 sessions per week' },
            { step: '4', title: 'Earn Certificate', desc: 'Complete & get certified' }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h4 className="font-semibold text-primary-900 mb-2">{item.title}</h4>
              <p className="text-sm text-warm-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
