'use client';

import Link from 'next/link';
import { MessageSquare, Clock, Users, Calendar, Play } from 'lucide-react';

export default function DashboardSpeakingClubPage() {
  const liveSessions = [
    {
      id: 1,
      title: 'Business English Discussion',
      topic: 'Workplace Communication',
      time: 'Now',
      duration: '60 min',
      participants: 12,
      maxParticipants: 15,
      level: 'Intermediate',
      host: 'Sarah M.',
      isLive: true
    },
    {
      id: 2,
      title: 'Tech Innovations 2026',
      topic: 'Technology & Innovation',
      time: 'In 30 minutes',
      duration: '60 min',
      participants: 8,
      maxParticipants: 15,
      level: 'Advanced',
      host: 'Michael C.',
      isLive: false
    },
    {
      id: 3,
      title: 'Daily Life Conversations',
      topic: 'Casual Discussion',
      time: 'In 2 hours',
      duration: '45 min',
      participants: 5,
      maxParticipants: 15,
      level: 'Beginner',
      host: 'Priya P.',
      isLive: false
    },
  ];

  const upcomingSessions = [
    {
      id: 4,
      title: 'Career Goals & Planning',
      time: 'Today, 6:00 PM',
      level: 'Intermediate',
      spotsLeft: 7
    },
    {
      id: 5,
      title: 'Travel Stories',
      time: 'Tomorrow, 10:00 AM',
      level: 'All Levels',
      spotsLeft: 12
    },
    {
      id: 6,
      title: 'Current Events Discussion',
      time: 'Tomorrow, 3:00 PM',
      level: 'Advanced',
      spotsLeft: 4
    },
  ];

  const myBookings = [
    {
      id: 101,
      title: 'IELTS Speaking Practice',
      date: 'Feb 10, 2026',
      time: '3:00 PM',
      duration: '60 min',
      level: 'Advanced'
    },
    {
      id: 102,
      title: 'Weekend Casual Chat',
      date: 'Feb 11, 2026',
      time: '11:00 AM',
      duration: '45 min',
      level: 'All Levels'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          Speaking Clubs
        </h1>
        <p className="text-warm-600">
          Practice English with learners from across India
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="text-2xl font-bold text-primary-900 mb-1">42</div>
          <div className="text-sm text-warm-600">Sessions Attended</div>
        </div>
        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="text-2xl font-bold text-primary-900 mb-1">156</div>
          <div className="text-sm text-warm-600">Practice Hours</div>
        </div>
        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="text-2xl font-bold text-primary-900 mb-1">3</div>
          <div className="text-sm text-warm-600">Upcoming</div>
        </div>
        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="text-2xl font-bold text-primary-900 mb-1">30</div>
          <div className="text-sm text-warm-600">Day Streak 🔥</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Live Now */}
          <div>
            <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Live Now
            </h2>
            <div className="space-y-4">
              {liveSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-2xl border border-warm-200 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                          {session.level}
                        </span>
                        {session.isLive && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            Live
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-primary-900 mb-1">
                        {session.title}
                      </h3>
                      <p className="text-sm text-warm-600 mb-3">{session.topic}</p>
                    </div>
                    <MessageSquare className="w-6 h-6 text-primary-600" />
                  </div>

                  <div className="flex items-center gap-4 text-sm text-warm-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {session.time} • {session.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {session.participants}/{session.maxParticipants}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-warm-600">
                      Host: {session.host}
                    </div>
                    <button
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                        session.isLive
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-warm-100 text-warm-700 hover:bg-warm-200'
                      }`}
                    >
                      {session.isLive ? (
                        <>
                          <Play className="w-4 h-4" />
                          Join Now
                        </>
                      ) : (
                        'Book Session'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div>
            <h2 className="text-xl font-bold text-primary-900 mb-4">
              Today&apos;s Schedule
            </h2>
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-xl border border-warm-200 p-4 flex items-center justify-between hover:shadow-md transition-all"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary-900 mb-1">
                      {session.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-warm-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {session.time}
                      </div>
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs">
                        {session.level}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-warm-600 mb-2">
                      {session.spotsLeft} spots left
                    </div>
                    <button className="px-4 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* My Bookings */}
          <div>
            <h2 className="text-xl font-bold text-primary-900 mb-4">
              My Bookings
            </h2>
            <div className="space-y-3">
              {myBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl border border-warm-200 p-4"
                >
                  <h3 className="font-semibold text-primary-900 mb-2">
                    {booking.title}
                  </h3>
                  <div className="space-y-1 text-sm text-warm-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {booking.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {booking.time} • {booking.duration}
                    </div>
                  </div>
                  <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                    {booking.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Browse All */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">
              Explore All Sessions
            </h3>
            <p className="text-white/80 text-sm mb-4">
              View the full week&apos;s schedule and book sessions
            </p>
            <Link
              href="/practice/speaking-club"
              className="block w-full py-2.5 bg-white text-primary-600 rounded-lg font-semibold hover:bg-warm-50 transition-colors text-center text-sm"
            >
              View Full Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
