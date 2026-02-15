'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  BookOpen, MessageSquare, Users, Play, ArrowRight,
  Brain, Zap, Clock, Trophy, Target, FileText, Calendar,
} from 'lucide-react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(' ')[0] || 'there';
  const [vocabElo, setVocabElo] = useState(800);

  useEffect(() => {
    fetch('/api/vocab-elo').then(r => r.json()).then(d => setVocabElo(d.elo)).catch(() => {});
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-1">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-warm-600 text-sm">Continue your English learning journey</p>
      </div>

      {/* Vocab Challenge Banner */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-900 rounded-2xl p-5 lg:p-6 text-white relative overflow-hidden mb-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-yellow-400/20 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg" style={{ color: 'white' }}>Daily Vocab Challenge</h3>
              <p className="text-white" style={{ color: 'white' }}>Your ELO: {vocabElo}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4 text-sm text-primary-200">
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-yellow-400" /> 10 questions</span>
            <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-yellow-400" /> ELO ranked</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-yellow-400" /> ~5 min</span>
          </div>
          <Link href="/vocabulary-challenge" className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 text-primary-900 rounded-xl font-bold text-sm hover:bg-yellow-300 transition-all">
            <Zap className="w-4 h-4" /> Play Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Course */}
          <div>
            <h2 className="text-lg font-bold text-primary-900 mb-3">Continue Learning</h2>
            <Link href="/dashboard/courses/business-english" className="block bg-white rounded-xl border border-warm-200 p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-primary-900 mb-0.5">Business English Mastery</h3>
                  <p className="text-xs text-warm-600">8 text lessons · Exam & Certificate</p>
                </div>
                <Play className="w-6 h-6 text-primary-600 flex-shrink-0" />
              </div>
              <p className="text-xs text-primary-600 font-medium flex items-center gap-1">
                Continue learning <ArrowRight className="w-3 h-3" />
              </p>
            </Link>
          </div>

          {/* Quick Actions — all working links */}
          <div>
            <h2 className="text-lg font-bold text-primary-900 mb-3">Explore</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Speaking Club', desc: 'Live practice sessions', icon: MessageSquare, href: '/dashboard/speaking-club', color: 'bg-primary-700' },
                { title: 'Materials', desc: 'Free learning resources', icon: FileText, href: '/dashboard/materials', color: 'bg-primary-700' },
                { title: '1:1 Coaching', desc: 'Personal sessions', icon: Users, href: '/dashboard/one-on-one', color: 'bg-primary-700' },
                { title: 'Interview Prep', desc: 'Career guidance', icon: Target, href: '/dashboard/interview-prep', color: 'bg-primary-700' },
              ].map((a, i) => (
                <Link key={i} href={a.href} className="bg-white rounded-xl border border-warm-200 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                  <div className={`w-10 h-10 ${a.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <a.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-primary-900 mb-0.5">{a.title}</h3>
                  <p className="text-xs text-warm-600 hidden sm:block">{a.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-xl border border-warm-200 p-5">
            <h3 className="font-semibold text-primary-900 mb-3">Your Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-600">Vocab ELO</span>
                <span className="text-sm font-bold text-primary-900">{vocabElo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-600">Courses</span>
                <span className="text-sm font-bold text-primary-900">1 active</span>
              </div>
            </div>
            <Link href="/dashboard/progress" className="text-xs text-primary-600 font-medium mt-3 flex items-center gap-1 hover:underline">
              View full progress <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Book Counselling */}
          <div className="bg-gradient-to-br from-primary-700 to-primary-800 rounded-xl p-5 text-white">
            <h3 className="font-bold mb-2">Free Career Counselling</h3>
            <p className="text-sm text-white/80 mb-1">
              <span className="line-through text-white/50">₹999</span>{' '}
              <span className="text-yellow-300 font-bold">FREE</span>
            </p>
            <p className="text-xs text-white/70 mb-3">Get a personalized learning plan from our experts</p>
            <Link href="/dashboard/one-on-one" className="block w-full py-2.5 bg-white text-primary-800 rounded-lg font-semibold text-center text-sm hover:bg-warm-50 transition-colors">
              Book Free Session
            </Link>
          </div>

          {/* Browse All Courses */}
          <div className="bg-white rounded-xl border border-warm-200 p-5">
            <h3 className="font-semibold text-primary-900 mb-2">Browse Courses</h3>
            <p className="text-xs text-warm-600 mb-3">Text-based lessons with exams and certificates</p>
            <Link href="/dashboard/courses" className="block w-full py-2 bg-primary-600 text-white rounded-lg font-medium text-center text-sm hover:bg-primary-700 transition-colors">
              View Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
