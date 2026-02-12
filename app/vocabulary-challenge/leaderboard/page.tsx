'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trophy, Medal, TrendingUp, TrendingDown, Crown, Zap, Target, Calendar } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  elo: number;
  eloChange: number;
  gamesPlayed: number;
  accuracy: number;
  streak: number;
  isCurrentUser?: boolean;
}

type TimeFilter = 'today' | 'week' | 'month' | 'all-time';

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');
  const [isSignedIn, setIsSignedIn] = useState(false); // TODO: Get from auth

  // Mock data - would come from API
  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      userId: '1',
      username: 'VocabMaster2026',
      avatar: 'VM',
      elo: 2450,
      eloChange: +45,
      gamesPlayed: 156,
      accuracy: 94.5,
      streak: 42
    },
    {
      rank: 2,
      userId: '2',
      username: 'WordWizard',
      avatar: 'WW',
      elo: 2380,
      eloChange: +28,
      gamesPlayed: 142,
      accuracy: 92.1,
      streak: 28
    },
    {
      rank: 3,
      userId: '3',
      username: 'EnglishPro',
      avatar: 'EP',
      elo: 2310,
      eloChange: +15,
      gamesPlayed: 198,
      accuracy: 89.7,
      streak: 35
    },
    {
      rank: 4,
      userId: '4',
      username: 'LexiconLegend',
      avatar: 'LL',
      elo: 2245,
      eloChange: +12,
      gamesPlayed: 167,
      accuracy: 88.4,
      streak: 21
    },
    {
      rank: 5,
      userId: '5',
      username: 'GrammarGuru',
      avatar: 'GG',
      elo: 2180,
      eloChange: -8,
      gamesPlayed: 203,
      accuracy: 87.2,
      streak: 14
    },
    // Current user (example)
    {
      rank: 1247,
      userId: 'current',
      username: 'You',
      avatar: 'JD',
      elo: 1456,
      eloChange: +32,
      gamesPlayed: 45,
      accuracy: 76.8,
      streak: 7,
      isCurrentUser: true
    }
  ];

  const topPlayers = leaderboardData.slice(0, 5);
  const currentUser = leaderboardData.find(p => p.isCurrentUser);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />;
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-warm-200 to-warm-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-white to-warm-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="text-2xl font-bold text-primary-900">Boli</span>
          </Link>

          <Link
            href="/vocabulary-challenge"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Play Today&apos;s Challenge
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-primary-900 mb-2">
            Global Leaderboard
          </h1>
          <p className="text-warm-600">
            Compete with vocabulary masters from around the world
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-xl border border-warm-200 p-1">
            {[
              { key: 'today', label: 'Today' },
              { key: 'week', label: 'This Week' },
              { key: 'month', label: 'This Month' },
              { key: 'all-time', label: 'All Time' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setTimeFilter(filter.key as TimeFilter)}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                  timeFilter === filter.key
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-warm-700 hover:bg-warm-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-warm-200 overflow-hidden">
              {/* Top 3 Podium */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8">
                <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
                  <Trophy className="w-6 h-6" />
                  Top Performers
                </h2>
                <div className="flex items-end justify-center gap-4">
                  {/* 2nd Place */}
                  {topPlayers[1] && (
                    <div className="flex-1 max-w-[160px]">
                      <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
                        <div className="relative inline-block mb-3">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {topPlayers[1].avatar}
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center border-2 border-white">
                            <span className="text-white font-bold text-sm">2</span>
                          </div>
                        </div>
                        <div className="font-semibold text-primary-900 text-sm truncate mb-1">
                          {topPlayers[1].username}
                        </div>
                        <div className="text-2xl font-bold text-primary-900">
                          {topPlayers[1].elo}
                        </div>
                        <div className={`text-xs font-medium ${topPlayers[1].eloChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {topPlayers[1].eloChange >= 0 ? '+' : ''}{topPlayers[1].eloChange}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1st Place */}
                  {topPlayers[0] && (
                    <div className="flex-1 max-w-[180px]">
                      <div className="bg-white rounded-2xl p-4 text-center shadow-2xl transform scale-110">
                        <div className="relative inline-block mb-3">
                          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                            {topPlayers[0].avatar}
                          </div>
                          <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-white">
                            <Crown className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="font-bold text-primary-900 mb-1 truncate">
                          {topPlayers[0].username}
                        </div>
                        <div className="text-3xl font-bold text-primary-900">
                          {topPlayers[0].elo}
                        </div>
                        <div className={`text-sm font-medium ${topPlayers[0].eloChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {topPlayers[0].eloChange >= 0 ? '+' : ''}{topPlayers[0].eloChange}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3rd Place */}
                  {topPlayers[2] && (
                    <div className="flex-1 max-w-[160px]">
                      <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
                        <div className="relative inline-block mb-3">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {topPlayers[2].avatar}
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                            <span className="text-white font-bold text-sm">3</span>
                          </div>
                        </div>
                        <div className="font-semibold text-primary-900 text-sm truncate mb-1">
                          {topPlayers[2].username}
                        </div>
                        <div className="text-2xl font-bold text-primary-900">
                          {topPlayers[2].elo}
                        </div>
                        <div className={`text-xs font-medium ${topPlayers[2].eloChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {topPlayers[2].eloChange >= 0 ? '+' : ''}{topPlayers[2].eloChange}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Rankings List */}
              <div className="divide-y divide-warm-200">
                {topPlayers.slice(3).map((player) => (
                  <div
                    key={player.userId}
                    className="p-4 hover:bg-warm-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 text-center">
                        <span className="text-lg font-bold text-warm-700">
                          {player.rank}
                        </span>
                      </div>
                      
                      <div className="w-12 h-12 bg-gradient-to-br from-warm-200 to-warm-300 rounded-full flex items-center justify-center text-warm-700 font-bold">
                        {player.avatar}
                      </div>

                      <div className="flex-1">
                        <div className="font-semibold text-primary-900">
                          {player.username}
                        </div>
                        <div className="text-sm text-warm-600">
                          {player.gamesPlayed} games · {player.accuracy}% accuracy
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-900">
                          {player.elo}
                        </div>
                        <div className={`text-sm font-medium flex items-center justify-end gap-1 ${
                          player.eloChange >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {player.eloChange >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          {player.eloChange >= 0 ? '+' : ''}{player.eloChange}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Rank */}
            {currentUser && (
              <div className="bg-white rounded-2xl border-2 border-primary-300 p-6">
                <h3 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Your Rank
                </h3>
                
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                    {currentUser.avatar}
                  </div>
                  <div className="text-3xl font-bold text-primary-900 mb-1">
                    #{currentUser.rank.toLocaleString()}
                  </div>
                  <div className="text-sm text-warm-600">Global Ranking</div>
                </div>

                <div className="space-y-3 pt-4 border-t border-warm-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-warm-600">ELO Rating</span>
                    <span className="text-lg font-bold text-primary-900">{currentUser.elo}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-warm-600">Today&apos;s Change</span>
                    <span className={`text-sm font-bold ${currentUser.eloChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {currentUser.eloChange >= 0 ? '+' : ''}{currentUser.eloChange}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-warm-600">Accuracy</span>
                    <span className="text-sm font-semibold text-primary-900">{currentUser.accuracy}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-warm-600">Streak</span>
                    <span className="text-sm font-semibold text-orange-600 flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {currentUser.streak} days
                    </span>
                  </div>
                </div>

                {!isSignedIn && (
                  <div className="mt-4 pt-4 border-t border-warm-200">
                    <Link
                      href="/signup"
                      className="block w-full py-3 bg-primary-600 text-white rounded-lg font-semibold text-center hover:bg-primary-700 transition-all"
                    >
                      Sign Up to Save Progress
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Stats Card */}
            <div className="bg-white rounded-2xl border border-warm-200 p-6">
              <h3 className="text-lg font-bold text-primary-900 mb-4">
                Global Stats
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-warm-600">Total Players</span>
                    <span className="text-lg font-bold text-primary-900">50,000+</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-warm-600">Games Today</span>
                    <span className="text-lg font-bold text-primary-900">12,456</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-warm-600">Avg Accuracy</span>
                    <span className="text-lg font-bold text-primary-900">72.5%</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-warm-600">Top ELO</span>
                    <span className="text-lg font-bold text-yellow-600">2,450</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Challenge */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6" />
                <h3 className="text-lg font-bold">Next Challenge</h3>
              </div>
              <p className="text-white/90 text-sm mb-4">
                Tomorrow&apos;s vocabulary challenge will be available in:
              </p>
              <div className="text-3xl font-bold mb-4">14h 23m</div>
              <Link
                href="/vocabulary-challenge"
                className="block w-full py-3 bg-white text-primary-600 rounded-lg font-semibold text-center hover:bg-warm-50 transition-all"
              >
                Play Today&apos;s Challenge
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
