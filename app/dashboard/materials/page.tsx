'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FileText, Download, CheckCircle2, Award, BookOpen, Lock } from 'lucide-react';

interface Material {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  pages: number;
  downloadUrl: string;
  isCompleted: boolean;
  isPremium: boolean;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  requirement: string;
}

export default function DashboardMaterialsPage() {
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  // Mock materials - would come from API
  const materials: Material[] = [
    {
      id: '1',
      title: 'Complete English Grammar Guide',
      description: 'Comprehensive guide covering all grammar rules from basics to advanced',
      category: 'Grammar',
      level: 'Beginner',
      pages: 120,
      downloadUrl: '/materials/grammar-guide.pdf',
      isCompleted: true,
      isPremium: false
    },
    {
      id: '2',
      title: 'Business English Vocabulary Handbook',
      description: 'Essential vocabulary for professional workplace communication',
      category: 'Vocabulary',
      level: 'Intermediate',
      pages: 85,
      downloadUrl: '/materials/business-vocab.pdf',
      isCompleted: true,
      isPremium: false
    },
    {
      id: '3',
      title: 'IELTS Speaking Strategies',
      description: 'Proven techniques and sample answers for IELTS speaking test',
      category: 'IELTS Prep',
      level: 'Advanced',
      pages: 95,
      downloadUrl: '/materials/ielts-speaking.pdf',
      isCompleted: false,
      isPremium: false
    },
    {
      id: '4',
      title: 'Email Writing Templates',
      description: 'Professional email templates for various business scenarios',
      category: 'Writing',
      level: 'Intermediate',
      pages: 45,
      downloadUrl: '/materials/email-templates.pdf',
      isCompleted: false,
      isPremium: false
    },
    {
      id: '5',
      title: 'Advanced Idioms & Phrases',
      description: 'Master native-level expressions and colloquialisms',
      category: 'Vocabulary',
      level: 'Advanced',
      pages: 110,
      downloadUrl: '/materials/idioms-advanced.pdf',
      isCompleted: false,
      isPremium: true
    },
    {
      id: '6',
      title: 'Interview Questions & Answers Guide',
      description: '50+ common interview questions with model answers',
      category: 'Interview Prep',
      level: 'Intermediate',
      pages: 75,
      downloadUrl: '/materials/interview-qa.pdf',
      isCompleted: true,
      isPremium: false
    }
  ];

  const badges: Badge[] = [
    {
      id: 'first-download',
      name: 'First Steps',
      description: 'Downloaded your first material',
      icon: '📚',
      earnedAt: '2026-01-15',
      requirement: 'Download any material'
    },
    {
      id: 'grammar-master',
      name: 'Grammar Master',
      description: 'Completed all grammar materials',
      icon: '📝',
      earnedAt: '2026-02-01',
      requirement: 'Complete all grammar PDFs'
    },
    {
      id: 'vocab-guru',
      name: 'Vocabulary Guru',
      description: 'Completed 10 vocabulary materials',
      icon: '📖',
      requirement: 'Complete 10 vocabulary materials'
    },
    {
      id: 'completionist',
      name: 'Completionist',
      description: 'Marked all materials as completed',
      icon: '🏆',
      requirement: 'Complete all available materials'
    },
    {
      id: 'early-bird',
      name: 'Early Bird',
      description: 'Downloaded material within first week',
      icon: '🌅',
      earnedAt: '2026-01-10',
      requirement: 'Download within first week'
    }
  ];

  const filteredMaterials = materials.filter(m => {
    if (filter === 'all') return true;
    return m.level.toLowerCase() === filter;
  });

  const handleMarkComplete = (materialId: string) => {
    // TODO: API call to mark as complete
    console.log('Marking complete:', materialId);
  };

  const handleDownload = (material: Material) => {
    // TODO: Track download and check for badge eligibility
    console.log('Downloading:', material.title);
  };

  const completedCount = materials.filter(m => m.isCompleted).length;
  const totalCount = materials.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          Learning Materials
        </h1>
        <p className="text-warm-600">
          Download PDF guides and earn badges as you learn
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">{totalCount}</div>
          <div className="text-sm text-warm-600">Total Materials</div>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">{completedCount}</div>
          <div className="text-sm text-warm-600">Completed</div>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-primary-900 mb-1">
            {badges.filter(b => b.earnedAt).length}
          </div>
          <div className="text-sm text-warm-600">Badges Earned</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="flex gap-3">
            {[
              { key: 'all', label: 'All Levels' },
              { key: 'beginner', label: 'Beginner' },
              { key: 'intermediate', label: 'Intermediate' },
              { key: 'advanced', label: 'Advanced' }
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as 'all' | 'beginner' | 'intermediate' | 'advanced')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filter === f.key
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white border border-warm-200 text-warm-700 hover:bg-warm-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Materials List */}
          <div className="space-y-4">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-white rounded-2xl border border-warm-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    material.isCompleted ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {material.isCompleted ? (
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    ) : (
                      <FileText className="w-7 h-7 text-blue-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-primary-900 mb-1 flex items-center gap-2">
                          {material.title}
                          {material.isPremium && (
                            <Lock className="w-4 h-4 text-yellow-600" />
                          )}
                        </h3>
                        <p className="text-sm text-warm-600 mb-2">
                          {material.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {material.level}
                      </span>
                      <span className="px-3 py-1 bg-warm-100 text-warm-700 rounded-full text-xs font-medium">
                        {material.category}
                      </span>
                      <span className="text-xs text-warm-600">
                        {material.pages} pages
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {!material.isPremium ? (
                        <>
                          <button
                            onClick={() => handleDownload(material)}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-all flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download PDF
                          </button>
                          {!material.isCompleted && (
                            <button
                              onClick={() => handleMarkComplete(material.id)}
                              className="px-4 py-2 bg-white border border-warm-200 text-warm-700 rounded-lg font-medium text-sm hover:bg-warm-50 transition-all"
                            >
                              Mark Complete
                            </button>
                          )}
                        </>
                      ) : (
                        <Link
                          href="/pricing"
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium text-sm hover:bg-yellow-700 transition-all flex items-center gap-2"
                        >
                          <Lock className="w-4 h-4" />
                          Upgrade to Premium
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Badges */}
        <div className="space-y-6">
          {/* Overall Progress */}
          <div className="bg-white rounded-2xl border border-warm-200 p-6">
            <h3 className="text-lg font-bold text-primary-900 mb-4">
              Your Progress
            </h3>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-warm-700">Completion</span>
                <span className="font-semibold text-primary-900">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="w-full h-3 bg-warm-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-warm-600">
              {completedCount} of {totalCount} materials completed
            </p>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl border border-warm-200 p-6">
            <h3 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Badges
            </h3>
            <div className="space-y-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border transition-all ${
                    badge.earnedAt
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-warm-50 border-warm-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary-900 mb-1 text-sm">
                        {badge.name}
                      </h4>
                      <p className="text-xs text-warm-600 mb-2">
                        {badge.description}
                      </p>
                      {badge.earnedAt ? (
                        <div className="text-xs text-green-600 font-medium">
                          ✓ Earned {new Date(badge.earnedAt).toLocaleDateString()}
                        </div>
                      ) : (
                        <div className="text-xs text-warm-500">
                          {badge.requirement}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browse Courses CTA */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">
              Want More?
            </h3>
            <p className="text-white/90 text-sm mb-4">
              Explore our full course library with video lessons and certificates
            </p>
            <Link
              href="/dashboard/courses"
              className="block w-full py-2.5 bg-white text-primary-600 rounded-lg font-semibold text-center hover:bg-warm-50 transition-all text-sm"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
