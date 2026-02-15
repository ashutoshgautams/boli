'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BookOpen, Clock, CheckCircle2, Lock, Award } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  enrolled: boolean;
  progress: number;
  href: string;
}

export default function DashboardCoursesPage() {
  const [activeTab, setActiveTab] = useState<'enrolled' | 'coming'>('enrolled');
  const [beProgress, setBeProgress] = useState(0);

  useEffect(() => {
    fetch('/api/course-progress?courseId=business-english')
      .then((r) => r.json())
      .then((d) => {
        const done = d.completedLessons?.length || 0;
        setBeProgress(Math.round((done / 8) * 100));
      })
      .catch(() => {});
  }, []);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Business English Mastery',
      description: 'Professional email writing, meeting skills, and presentation techniques',
      level: 'Intermediate',
      duration: '8 lessons',
      lessons: 8,
      enrolled: true,
      progress: beProgress,
      href: '/dashboard/courses/business-english',
    },
    {
      id: '2',
      title: 'IELTS Preparation',
      description: 'Complete preparation for all four IELTS sections',
      level: 'Advanced',
      duration: '16 lessons',
      lessons: 16,
      enrolled: false,
      progress: 0,
      href: '#',
    },
    {
      id: '3',
      title: 'English Foundations',
      description: 'Grammar, vocabulary, and basic conversation for beginners',
      level: 'Beginner',
      duration: '12 lessons',
      lessons: 12,
      enrolled: false,
      progress: 0,
      href: '#',
    },
    {
      id: '4',
      title: 'Professional Communication',
      description: 'Advanced techniques for leadership and C-suite communication',
      level: 'Advanced',
      duration: '10 lessons',
      lessons: 10,
      enrolled: false,
      progress: 0,
      href: '#',
    },
  ];

  const enrolled = courses.filter((c) => c.enrolled);
  const coming = courses.filter((c) => !c.enrolled);
  const display = activeTab === 'enrolled' ? enrolled : coming;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-1">My Courses</h1>
        <p className="text-warm-600 text-sm">Text-based lessons with exams and certificates</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-warm-200">
        <button
          onClick={() => setActiveTab('enrolled')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'enrolled' ? 'border-primary-600 text-primary-600' : 'border-transparent text-warm-600'
          }`}
        >
          My Courses ({enrolled.length})
        </button>
        <button
          onClick={() => setActiveTab('coming')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'coming' ? 'border-primary-600 text-primary-600' : 'border-transparent text-warm-600'
          }`}
        >
          Coming Soon ({coming.length})
        </button>
      </div>

      {/* Courses */}
      <div className="grid sm:grid-cols-2 gap-4">
        {display.map((course) => {
          const isActive = course.href !== '#';
          return (
            <Link
              key={course.id}
              href={course.href}
              className={`bg-white rounded-xl border border-warm-200 p-5 transition-all block ${
                isActive ? 'hover:shadow-lg hover:-translate-y-0.5' : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={(e) => !isActive && e.preventDefault()}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                  course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {course.level}
                </span>
                {!isActive && <Lock className="w-4 h-4 text-warm-400" />}
                {course.enrolled && <Award className="w-4 h-4 text-primary-600" />}
              </div>

              <h3 className="font-semibold text-primary-900 mb-1">{course.title}</h3>
              <p className="text-xs text-warm-600 mb-3">{course.description}</p>

              <div className="flex items-center gap-3 text-xs text-warm-500">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{course.duration}</span>
                {course.enrolled && (
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />In progress</span>
                )}
                {!isActive && !course.enrolled && <span>Coming soon</span>}
              </div>

              {course.enrolled && (
                <div className="mt-3">
                  <div className="w-full h-1.5 bg-warm-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
