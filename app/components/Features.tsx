'use client';

import { BookOpen, MessageSquare, Target, Trophy, Users, Video } from 'lucide-react';
import { useState } from 'react';

export default function Features() {
  const [activeTab, setActiveTab] = useState('learn');

  const tabs = {
    learn: {
      label: 'Learn',
      headline: 'Master English at your own pace',
      features: [
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: 'Self-Paced Courses',
          description: 'Structured curriculum from A1 to C2 level',
          benefit: 'Learn on your schedule',
        },
        {
          icon: <Video className="w-6 h-6" />,
          title: 'Video Lessons',
          description: 'HD quality lessons with native speakers',
          benefit: 'Hours of expert content',
        },
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: 'Learning Materials',
          description: 'Downloadable PDFs, worksheets & guides',
          benefit: 'Study offline anytime',
        },
      ],
    },
    practice: {
      label: 'Practice',
      headline: 'Real conversations, real progress',
      features: [
        {
          icon: <MessageSquare className="w-6 h-6" />,
          title: 'Speaking Clubs',
          description: 'Daily live sessions with other learners',
          benefit: 'Practice every day',
        },
        {
          icon: <Target className="w-6 h-6" />,
          title: 'Interview Prep',
          description: 'Mock interviews & placement guidance',
          benefit: 'Land your dream job',
        },
        {
          icon: <Trophy className="w-6 h-6" />,
          title: 'Progress Tracking',
          description: 'Detailed analytics on your improvement',
          benefit: 'See weekly growth',
        },
      ],
    },
    coaching: {
      label: 'Coaching',
      headline: 'Expert guidance when you need it',
      features: [
        {
          icon: <Users className="w-6 h-6" />,
          title: '1:1 Sessions',
          description: 'Personal coaching with expert tutors',
          benefit: 'Book anytime, 24/7',
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Group Classes',
          description: 'Interactive small-group coaching sessions',
          benefit: 'Affordable & effective',
        },
        {
          icon: <Trophy className="w-6 h-6" />,
          title: 'Certificates',
          description: 'Verified completion certificates',
          benefit: 'Employer-recognized',
        },
      ],
    },
  };

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-200 rounded-full mb-6">
            <span className="text-sm font-medium text-primary-700">All in one</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-4 pb-3">
            Everything you need to master English
          </h2>
          <p className="inline-flex items-center text-xl text-warm-600 max-w-2xl mx-auto">
            Complete learning ecosystem with courses, live practice, and expert coaching
          </p>
        </div>

        {/* Quick Stats - Honest */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { value: '24/7', label: 'Access' },
            { value: '20+', label: 'Expert coaches' },
            { value: 'HD', label: 'Video content' },
            { value: 'Free', label: 'Basic plan' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 bg-warm-50 rounded-2xl border border-warm-200">
              <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
              <div className="text-sm text-warm-600">{stat.label}</div>
            </div>
          ))}
        </div>

       {/* Tab Navigation */}
<div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 max-w-md sm:max-w-none mx-auto">
  {Object.entries(tabs).map(([key, tab]) => (
    <button
      key={key}
      onClick={() => setActiveTab(key)}
      className={`px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 ${
        activeTab === key
          ? 'bg-primary-600 text-white shadow-warm'
          : 'bg-white text-primary-700 hover:bg-warm-50 border border-warm-200'
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>


        {/* Active Tab Content */}
        <div>
          <h3 className="text-3xl font-bold text-primary-900 text-center mb-12 pb-9">
            {tabs[activeTab as keyof typeof tabs].headline}
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {tabs[activeTab as keyof typeof tabs].features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white border border-warm-200 rounded-2xl p-8 hover:shadow-warm hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-primary-900 mb-3">{feature.title}</h4>
                <p className="text-warm-600 mb-4">{feature.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-full">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-primary-700">{feature.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
