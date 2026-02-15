'use client';

import { useEffect, useState } from 'react';
import { Trophy, BookOpen, Brain, CheckCircle2, Award } from 'lucide-react';

export default function DashboardProgressPage() {
  const [vocabElo, setVocabElo] = useState(800);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/vocab-elo').then((r) => r.json()),
      fetch('/api/course-progress?courseId=business-english').then((r) => r.json()),
    ])
      .then(([eloData, progressData]) => {
        if (eloData.elo) setVocabElo(eloData.elo);
        if (progressData.completedLessons) setCompletedLessons(progressData.completedLessons.length);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const courseProgress = Math.round((completedLessons / 8) * 100);

  const achievements = [
    { name: 'First Lesson', desc: 'Completed your first lesson', icon: '🎓', earned: completedLessons >= 1 },
    { name: 'Email Expert', desc: 'Completed Email Writing module', icon: '📧', earned: completedLessons >= 4 },
    { name: 'Course Complete', desc: 'Finish an entire course', icon: '🎉', earned: completedLessons >= 8 },
    { name: 'Vocab Starter', desc: 'Take your first vocab challenge', icon: '🧠', earned: vocabElo !== 800 },
    { name: 'Rising Star', desc: 'Reach 900 ELO in vocab', icon: '⭐', earned: vocabElo >= 900 },
    { name: 'Vocab Master', desc: 'Reach 1000 ELO in vocab', icon: '🏆', earned: vocabElo >= 1000 },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-1">My Progress</h1>
        <p className="text-warm-600 text-sm">Track your learning journey</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-warm-500 text-sm">Loading your progress...</div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            <div className="bg-white rounded-xl border border-warm-200 p-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 text-primary-600 bg-primary-100">
                <Brain className="w-5 h-5" />
              </div>
              <div className="text-xl font-bold text-primary-900">{vocabElo}</div>
              <div className="text-xs text-warm-500">Vocab ELO Rating</div>
            </div>
            <div className="bg-white rounded-xl border border-warm-200 p-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 text-green-600 bg-green-100">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xl font-bold text-primary-900">{completedLessons} / 8</div>
              <div className="text-xs text-warm-500">Lessons Completed</div>
            </div>
            <div className="bg-white rounded-xl border border-warm-200 p-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 text-blue-600 bg-blue-100">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-xl font-bold text-primary-900">1</div>
              <div className="text-xs text-warm-500">Course Enrolled</div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-white rounded-xl border border-warm-200 p-5 mb-6">
            <h2 className="font-semibold text-primary-900 mb-4">Business English Mastery</h2>
            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-warm-600">Course Progress</span>
                <span className="font-semibold text-primary-600">{courseProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-warm-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-600 rounded-full transition-all duration-500" style={{ width: `${courseProgress}%` }} />
              </div>
            </div>
            <p className="text-xs text-warm-500 mt-2">
              {completedLessons === 8
                ? 'Course completed! Take the final exam to earn your certificate.'
                : `${8 - completedLessons} lessons remaining`}
            </p>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl border border-warm-200 p-5">
            <h2 className="font-semibold text-primary-900 mb-4">Achievements</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {achievements.map((a, i) => (
                <div key={i} className={`text-center p-4 rounded-xl border transition-all ${a.earned ? 'bg-primary-50 border-primary-200' : 'bg-warm-50 border-warm-200 opacity-40'}`}>
                  <div className="text-3xl mb-2">{a.icon}</div>
                  <div className="text-xs font-bold text-primary-900">{a.name}</div>
                  <div className="text-[10px] text-warm-500 mt-0.5">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
