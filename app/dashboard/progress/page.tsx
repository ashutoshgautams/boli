'use client';

import { Trophy, Award, TrendingUp, Calendar, Target, Star, Download, CheckCircle2 } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  type: 'course' | 'material' | 'achievement';
  downloadUrl: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  progress?: number;
  total?: number;
}

export default function DashboardProgressPage() {
  const stats = {
    totalHours: 156,
    coursesCompleted: 2,
    materialsCompleted: 6,
    currentStreak: 30,
    longestStreak: 45,
    sessionsAttended: 42,
    averageScore: 82,
    eloRating: 1488
  };

  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'Business English Fundamentals',
      issueDate: '2026-02-01',
      type: 'course',
      downloadUrl: '/certificates/business-english.pdf'
    },
    {
      id: '2',
      title: 'IELTS Preparation Course',
      issueDate: '2026-01-15',
      type: 'course',
      downloadUrl: '/certificates/ielts-prep.pdf'
    },
    {
      id: '3',
      title: 'Grammar Master Badge',
      issueDate: '2026-02-05',
      type: 'material',
      downloadUrl: '/certificates/grammar-badge.pdf'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Completed your first course',
      icon: '🎓',
      earnedAt: '2026-01-10'
    },
    {
      id: '2',
      name: '30-Day Streak',
      description: 'Practiced for 30 consecutive days',
      icon: '🔥',
      earnedAt: '2026-02-08'
    },
    {
      id: '3',
      name: 'Social Butterfly',
      description: 'Attended 25 speaking club sessions',
      icon: '🦋',
      earnedAt: '2026-01-28',
      progress: 42,
      total: 50
    },
    {
      id: '4',
      name: 'Vocabulary Champion',
      description: 'Completed 50 vocabulary challenges',
      icon: '📚',
      progress: 35,
      total: 50
    },
    {
      id: '5',
      name: 'Perfect Score',
      description: 'Scored 100% in any challenge',
      icon: '💯',
      earnedAt: '2026-01-20'
    },
    {
      id: '6',
      name: 'Early Bird',
      description: 'Completed activities before 8 AM',
      icon: '🌅',
      progress: 8,
      total: 10
    }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.1 },
    { day: 'Fri', hours: 2.7 },
    { day: 'Sat', hours: 1.5 },
    { day: 'Sun', hours: 2.0 }
  ];

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          My Progress
        </h1>
        <p className="text-warm-600">
          Track your learning journey and celebrate achievements
        </p>
      </div>

      {/* Overall Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8" />
            <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
              All Time
            </span>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.totalHours}</div>
          <div className="text-sm text-white/80">Total Hours</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="text-3xl font-bold mb-1">{stats.coursesCompleted}</div>
          <div className="text-sm text-white/80">Courses Completed</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8" />
            <span className="text-lg">🔥</span>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.currentStreak}</div>
          <div className="text-sm text-white/80">Day Streak</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8" />
          </div>
          <div className="text-3xl font-bold mb-1">{stats.averageScore}</div>
          <div className="text-sm text-white/80">Average Score</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Weekly Activity */}
          <div className="bg-white rounded-2xl border border-warm-200 p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-6">
              This Week&apos;s Activity
            </h2>
            <div className="flex items-end justify-between gap-4 h-48">
              {weeklyActivity.map((day, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex-1 w-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-primary-500 to-primary-600 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${(day.hours / maxHours) * 100}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-primary-900">
                      {day.hours}h
                    </div>
                    <div className="text-xs text-warm-600">{day.day}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-warm-200 flex items-center justify-between text-sm">
              <span className="text-warm-600">Total this week</span>
              <span className="font-bold text-primary-900">
                {weeklyActivity.reduce((sum, d) => sum + d.hours, 0).toFixed(1)} hours
              </span>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl border border-warm-200 p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6" />
              Achievements & Badges
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border transition-all ${
                    achievement.earnedAt
                      ? 'bg-yellow-50 border-yellow-200 hover:shadow-md'
                      : 'bg-warm-50 border-warm-200 opacity-70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary-900 mb-1">
                        {achievement.name}
                      </h4>
                      <p className="text-xs text-warm-600 mb-2">
                        {achievement.description}
                      </p>
                      {achievement.earnedAt ? (
                        <div className="text-xs text-green-600 font-medium">
                          ✓ Earned {new Date(achievement.earnedAt).toLocaleDateString('en-IN')}
                        </div>
                      ) : achievement.progress !== undefined ? (
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-warm-600">Progress</span>
                            <span className="font-semibold text-primary-900">
                              {achievement.progress}/{achievement.total}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-warm-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-600 rounded-full"
                              style={{ width: `${(achievement.progress! / achievement.total!) * 100}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-warm-500">
                          Not earned yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="bg-white rounded-2xl border border-warm-200 p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-6">
              My Certificates
            </h2>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-4 border border-warm-200 rounded-xl hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-900 mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-warm-600">
                        Issued: {new Date(cert.issueDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>

            {certificates.length === 0 && (
              <div className="text-center py-8 text-warm-600">
                <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No certificates yet. Complete courses to earn certificates!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Level & Rank */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">Level 8</div>
                <div className="text-sm text-white/80">Intermediate Pro</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Next Level</span>
                <span className="font-semibold">2,450 / 3,000 XP</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: '82%' }}
                />
              </div>
            </div>

            <div className="text-sm text-white/90">
              550 XP to next level
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl border border-warm-200 p-6">
            <h3 className="font-bold text-primary-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-600">Sessions Attended</span>
                <span className="font-semibold text-primary-900">{stats.sessionsAttended}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-600">Materials Downloaded</span>
                <span className="font-semibold text-primary-900">{stats.materialsCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-600">Longest Streak</span>
                <span className="font-semibold text-primary-900">{stats.longestStreak} days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-600">Vocab ELO</span>
                <span className="font-semibold text-primary-900">{stats.eloRating}</span>
              </div>
            </div>
          </div>

          {/* Next Milestone */}
          <div className="bg-warm-50 rounded-2xl border border-warm-200 p-6">
            <h3 className="font-bold text-primary-900 mb-4">Next Milestone</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-warm-700">Complete 3 Courses</span>
                  <span className="text-xs font-semibold text-primary-600">2/3</span>
                </div>
                <div className="w-full h-2 bg-warm-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600 rounded-full" style={{ width: '67%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-warm-700">50-Day Streak</span>
                  <span className="text-xs font-semibold text-primary-600">30/50</span>
                </div>
                <div className="w-full h-2 bg-warm-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-warm-700">100 Vocab Challenges</span>
                  <span className="text-xs font-semibold text-primary-600">35/100</span>
                </div>
                <div className="w-full h-2 bg-warm-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '35%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Share Progress */}
          <div className="bg-primary-50 rounded-2xl border border-primary-200 p-6 text-center">
            <Trophy className="w-12 h-12 text-primary-600 mx-auto mb-3" />
            <h3 className="font-bold text-primary-900 mb-2">
              Share Your Progress
            </h3>
            <p className="text-sm text-warm-700 mb-4">
              Show off your achievements on social media!
            </p>
            <button className="w-full py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all">
              Share on LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
