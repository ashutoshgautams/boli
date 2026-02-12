'use client';

import Link from 'next/link';
import { 
  BookOpen, 
  MessageSquare, 
  Users, 
  Target, 
  Calendar,
  TrendingUp,
  Play,
  Clock,
  Award,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function DashboardPage() {
  const upcomingSessions = [
    {
      type: 'Speaking Club',
      title: 'Business English Discussion',
      time: 'Today, 6:00 PM',
      duration: '60 min',
      spots: 5,
      level: 'Intermediate',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      type: '1:1 Coaching',
      title: 'Interview Preparation',
      time: 'Tomorrow, 10:00 AM',
      duration: '60 min',
      coach: 'Sarah Johnson',
      level: 'Advanced',
      color: 'bg-green-100 text-green-700'
    },
    {
      type: 'Group Session',
      title: 'IELTS Speaking Practice',
      time: 'Feb 10, 3:00 PM',
      duration: '90 min',
      spots: 3,
      level: 'All Levels',
      color: 'bg-purple-100 text-purple-700'
    },
  ];

  const quickActions = [
    {
      title: 'Join Speaking Club',
      description: 'Practice with peers right now',
      icon: MessageSquare,
      href: '/dashboard/speaking-club',
      color: 'bg-blue-600',
      available: true
    },
    {
      title: 'Book 1:1 Session',
      description: 'Schedule with expert coach',
      icon: Users,
      href: '/dashboard/one-on-one',
      color: 'bg-green-600',
      available: true
    },
    {
      title: 'Continue Learning',
      description: 'Resume your course',
      icon: BookOpen,
      href: '/dashboard/courses',
      color: 'bg-purple-600',
      available: true
    },
    {
      title: 'Mock Interview',
      description: 'Practice for your interview',
      icon: Target,
      href: '/dashboard/interview-prep',
      color: 'bg-orange-600',
      available: true
    },
  ];

  const recentActivity = [
    {
      type: 'course',
      title: 'Completed: Business English Module 3',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-green-600'
    },
    {
      type: 'session',
      title: 'Attended: Speaking Club Session',
      time: '1 day ago',
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      type: 'achievement',
      title: 'Earned: 30-Day Streak Badge',
      time: '2 days ago',
      icon: Award,
      color: 'text-yellow-600'
    },
  ];

  const currentCourses = [
    {
      title: 'Business English Fundamentals',
      progress: 65,
      lessons: '13/20 lessons',
      nextLesson: 'Email Writing Skills'
    },
    {
      title: 'IELTS Preparation Course',
      progress: 40,
      lessons: '8/20 lessons',
      nextLesson: 'Speaking Test Strategies'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-warm-600">
          Let&apos;s continue your English learning journey
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +12%
            </span>
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">156</div>
          <div className="text-sm text-warm-600">Practice Hours</div>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +5
            </span>
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">42</div>
          <div className="text-sm text-warm-600">Sessions Attended</div>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">8</div>
          <div className="text-sm text-warm-600">Certificates Earned</div>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">30</div>
          <div className="text-sm text-warm-600">Day Streak 🔥</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-bold text-primary-900 mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className="bg-white rounded-2xl border border-warm-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-warm-600">{action.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Current Courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary-900">Continue Learning</h2>
              <Link
                href="/dashboard/courses"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {currentCourses.map((course, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-warm-200 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary-900 mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-warm-600">{course.lessons}</p>
                    </div>
                    <Play className="w-8 h-8 text-primary-600" />
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-warm-700">Progress</span>
                      <span className="font-semibold text-primary-600">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-warm-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-600 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href="/dashboard/courses"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    Next: {course.nextLesson}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-primary-900 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-2xl border border-warm-200 divide-y divide-warm-200">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="p-4 hover:bg-warm-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 bg-warm-100 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-warm-600 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-8">
          {/* Upcoming Sessions */}
          <div>
            <h2 className="text-xl font-bold text-primary-900 mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              {upcomingSessions.map((session, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-warm-200 p-4 hover:shadow-lg transition-all"
                >
                  <div className={`inline-block px-2 py-1 ${session.color} rounded-full text-xs font-medium mb-3`}>
                    {session.type}
                  </div>
                  
                  <h3 className="font-semibold text-primary-900 mb-2">
                    {session.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-warm-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {session.time} • {session.duration}
                    </div>
                    {session.spots && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {session.spots} spots left
                      </div>
                    )}
                    {session.coach && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Coach: {session.coach}
                      </div>
                    )}
                    <div className="inline-block px-2 py-0.5 bg-warm-100 text-warm-700 rounded text-xs">
                      {session.level}
                    </div>
                  </div>

                  <button className="w-full py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors text-sm">
                    Join Session
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">Level 5</div>
                <div className="text-sm text-white/80">Intermediate</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Next level</span>
                <span className="font-semibold">450/500 XP</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: '90%' }}
                />
              </div>
            </div>

            <Link
              href="/dashboard/progress"
              className="text-sm font-medium hover:underline flex items-center gap-1"
            >
              View full progress
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Upgrade CTA */}
          <div className="bg-white rounded-2xl border border-warm-200 p-6">
            <h3 className="font-semibold text-primary-900 mb-2">
              Upgrade to Premium
            </h3>
            <p className="text-sm text-warm-600 mb-4">
              Get unlimited access to all courses, coaching, and materials
            </p>
            <ul className="space-y-2 mb-4">
              {['Unlimited sessions', '1:1 coaching', 'Verified certificates'].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-warm-700">
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/pricing"
              className="block w-full py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors text-center text-sm"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
