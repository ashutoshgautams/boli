'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Play, Clock, CheckCircle2, Lock, Download, Award, Star } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  instructor: string;
  enrolled: boolean;
  progress: number;
  certificate?: {
    available: boolean;
    downloadUrl?: string;
  };
  modules: Module[];
  thumbnail: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

export default function DashboardCoursesPage() {
  const [activeTab, setActiveTab] = useState<'enrolled' | 'available'>('enrolled');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Business English Mastery',
      description: 'Complete guide to professional English communication in business settings',
      level: 'Intermediate',
      duration: '8 weeks',
      lessons: 24,
      instructor: 'Sarah Johnson',
      enrolled: true,
      progress: 65,
      certificate: {
        available: false
      },
      thumbnail: 'bg-gradient-to-br from-blue-400 to-blue-600',
      modules: [
        {
          id: 'm1',
          title: 'Module 1: Email Writing',
          lessons: [
            { id: 'l1', title: 'Introduction to Business Emails', duration: '12 min', completed: true, locked: false },
            { id: 'l2', title: 'Formal vs Informal Communication', duration: '15 min', completed: true, locked: false },
            { id: 'l3', title: 'Email Structure & Templates', duration: '18 min', completed: true, locked: false },
            { id: 'l4', title: 'Common Email Mistakes', duration: '10 min', completed: true, locked: false }
          ]
        },
        {
          id: 'm2',
          title: 'Module 2: Meeting Skills',
          lessons: [
            { id: 'l5', title: 'Preparing for Meetings', duration: '14 min', completed: true, locked: false },
            { id: 'l6', title: 'Active Participation Techniques', duration: '16 min', completed: true, locked: false },
            { id: 'l7', title: 'Taking Meeting Notes', duration: '12 min', completed: false, locked: false },
            { id: 'l8', title: 'Following Up After Meetings', duration: '10 min', completed: false, locked: false }
          ]
        },
        {
          id: 'm3',
          title: 'Module 3: Presentations',
          lessons: [
            { id: 'l9', title: 'Structuring Your Presentation', duration: '20 min', completed: false, locked: false },
            { id: 'l10', title: 'PowerPoint Best Practices', duration: '15 min', completed: false, locked: false },
            { id: 'l11', title: 'Handling Q&A Sessions', duration: '12 min', completed: false, locked: false },
            { id: 'l12', title: 'Body Language & Confidence', duration: '18 min', completed: false, locked: false }
          ]
        },
        {
          id: 'm4',
          title: 'Module 4: Negotiations',
          lessons: [
            { id: 'l13', title: 'Negotiation Fundamentals', duration: '22 min', completed: false, locked: true },
            { id: 'l14', title: 'Win-Win Strategies', duration: '18 min', completed: false, locked: true },
            { id: 'l15', title: 'Handling Difficult Conversations', duration: '20 min', completed: false, locked: true },
            { id: 'l16', title: 'Closing the Deal', duration: '15 min', completed: false, locked: true }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'IELTS Preparation Complete',
      description: 'Comprehensive IELTS training covering all four sections with practice tests',
      level: 'Advanced',
      duration: '10 weeks',
      lessons: 32,
      instructor: 'Michael Chen',
      enrolled: true,
      progress: 100,
      certificate: {
        available: true,
        downloadUrl: '/certificates/ielts-complete.pdf'
      },
      thumbnail: 'bg-gradient-to-br from-green-400 to-green-600',
      modules: [
        {
          id: 'm1',
          title: 'Module 1: Listening',
          lessons: [
            { id: 'l1', title: 'Listening Strategies', duration: '15 min', completed: true, locked: false },
            { id: 'l2', title: 'Note-taking Techniques', duration: '12 min', completed: true, locked: false },
            { id: 'l3', title: 'Practice Test 1', duration: '30 min', completed: true, locked: false },
            { id: 'l4', title: 'Common Traps & Solutions', duration: '18 min', completed: true, locked: false }
          ]
        },
        {
          id: 'm2',
          title: 'Module 2: Reading',
          lessons: [
            { id: 'l5', title: 'Skimming & Scanning', duration: '16 min', completed: true, locked: false },
            { id: 'l6', title: 'Time Management', duration: '14 min', completed: true, locked: false },
            { id: 'l7', title: 'Practice Test 1', duration: '60 min', completed: true, locked: false },
            { id: 'l8', title: 'Vocabulary Building', duration: '20 min', completed: true, locked: false }
          ]
        },
        {
          id: 'm3',
          title: 'Module 3: Writing',
          lessons: [
            { id: 'l9', title: 'Task 1: Letter Writing', duration: '25 min', completed: true, locked: false },
            { id: 'l10', title: 'Task 2: Essay Writing', duration: '30 min', completed: true, locked: false },
            { id: 'l11', title: 'Grammar & Cohesion', duration: '18 min', completed: true, locked: false },
            { id: 'l12', title: 'Practice & Feedback', duration: '40 min', completed: true, locked: false }
          ]
        },
        {
          id: 'm4',
          title: 'Module 4: Speaking',
          lessons: [
            { id: 'l13', title: 'Part 1: Introduction', duration: '15 min', completed: true, locked: false },
            { id: 'l14', title: 'Part 2: Cue Card', duration: '20 min', completed: true, locked: false },
            { id: 'l15', title: 'Part 3: Discussion', duration: '18 min', completed: true, locked: false },
            { id: 'l16', title: 'Mock Tests', duration: '45 min', completed: true, locked: false }
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'English Foundations',
      description: 'Perfect for beginners starting their English learning journey',
      level: 'Beginner',
      duration: '12 weeks',
      lessons: 40,
      instructor: 'Priya Patel',
      enrolled: false,
      progress: 0,
      thumbnail: 'bg-gradient-to-br from-purple-400 to-purple-600',
      modules: []
    },
    {
      id: '4',
      title: 'Professional Communication',
      description: 'Advanced techniques for C-suite and leadership roles',
      level: 'Advanced',
      duration: '10 weeks',
      lessons: 30,
      instructor: 'David Williams',
      enrolled: false,
      progress: 0,
      thumbnail: 'bg-gradient-to-br from-orange-400 to-orange-600',
      modules: []
    }
  ];

  const enrolledCourses = courses.filter(c => c.enrolled);
  const availableCourses = courses.filter(c => !c.enrolled);

  const displayCourses = activeTab === 'enrolled' ? enrolledCourses : availableCourses;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          My Courses
        </h1>
        <p className="text-warm-600">
          Continue learning with expert-led video courses
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-warm-200">
        <button
          onClick={() => setActiveTab('enrolled')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'enrolled'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-warm-600 hover:text-primary-600'
          }`}
        >
          My Courses ({enrolledCourses.length})
        </button>
        <button
          onClick={() => setActiveTab('available')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'available'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-warm-600 hover:text-primary-600'
          }`}
        >
          Available Courses ({availableCourses.length})
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {displayCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-warm-200 overflow-hidden hover:shadow-lg transition-all"
          >
            {/* Thumbnail */}
            <div className={`h-48 ${course.thumbnail} flex items-center justify-center relative`}>
              <BookOpen className="w-16 h-16 text-white/80" />
              {course.enrolled && course.progress === 100 && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                  {course.level}
                </span>
                {course.enrolled && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Enrolled
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-primary-900 mb-2">
                {course.title}
              </h3>

              <p className="text-sm text-warm-600 mb-4">
                {course.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-warm-600 mb-4">
                <div className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  {course.lessons} lessons
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
              </div>

              {course.enrolled && course.progress > 0 && (
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
              )}

              {course.certificate?.available && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-yellow-600" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary-900 text-sm mb-1">
                        Certificate Available!
                      </h4>
                      <p className="text-xs text-warm-600">
                        Download your completion certificate
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-all flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {course.enrolled ? (
                  <>
                    <button
                      onClick={() => setSelectedCourse(course.id)}
                      className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all"
                    >
                      {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                    </button>
                    {course.progress === 100 && !course.certificate?.available && (
                      <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Self Attest
                      </button>
                    )}
                  </>
                ) : (
                  <Link
                    href="#"
                    className="flex-1 py-3 bg-white border border-warm-200 text-warm-700 rounded-lg font-semibold hover:bg-warm-50 transition-all text-center"
                  >
                    Enroll Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-warm-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary-900">
                {courses.find(c => c.id === selectedCourse)?.title}
              </h2>
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-warm-100 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {courses.find(c => c.id === selectedCourse)?.modules.map((module) => (
                <div key={module.id} className="mb-6">
                  <h3 className="text-lg font-bold text-primary-900 mb-4">
                    {module.title}
                  </h3>
                  <div className="space-y-2">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`p-4 rounded-xl border transition-all ${
                          lesson.locked
                            ? 'bg-warm-50 border-warm-200 opacity-60'
                            : 'bg-white border-warm-200 hover:shadow-md cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              </div>
                            ) : lesson.locked ? (
                              <div className="w-8 h-8 bg-warm-100 rounded-lg flex items-center justify-center">
                                <Lock className="w-5 h-5 text-warm-400" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                <Play className="w-5 h-5 text-primary-600" />
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium text-primary-900">
                                {lesson.title}
                              </h4>
                              <p className="text-xs text-warm-600">{lesson.duration}</p>
                            </div>
                          </div>
                          {!lesson.locked && (
                            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                              {lesson.completed ? 'Rewatch' : 'Start'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Free Counselling CTA */}
      <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">
              Need Help Choosing a Course?
            </h3>
            <p className="text-white/90 mb-4">
              Book a free counselling session. We&apos;ll assess your goals and recommend 
              the perfect learning path with special discounts!
            </p>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-bold hover:bg-warm-50 transition-all shadow-xl"
          >
            Schedule Free Session
          </Link>
        </div>
      </div>
    </div>
  );
}
