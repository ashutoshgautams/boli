'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Trophy, Clock, Target, Zap, Star, TrendingUp,
  CheckCircle, XCircle, ArrowRight, Share2,
  Brain, Award, Users, Crown, ChevronRight, Timer,
} from 'lucide-react';

/* =============================================
   TYPES
   ============================================= */

interface Question {
  id: number;
  type: 'word-to-meaning' | 'meaning-to-word' | 'synonym' | 'antonym' | 'fill-blank';
  word: string;
  correctAnswer: string;
  options: string[];
  context?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GameState {
  currentQuestion: number;
  answers: (string | null)[];
  timeSpent: number[];
  score: number;
  streak: number;
  maxStreak: number;
  isComplete: boolean;
}

interface Result {
  score: number;
  accuracy: number;
  averageTime: number;
  eloChange: number;
  newElo: number;
  correctCount: number;
}

/* =============================================
   DATA
   ============================================= */

const QUESTIONS: Question[] = [
  { id: 1, type: 'word-to-meaning', word: 'Ephemeral', correctAnswer: 'Lasting for a very short time', options: ['Lasting for a very short time', 'Extremely beautiful', 'Very difficult to understand', 'Relating to the physical world'], difficulty: 'medium' },
  { id: 2, type: 'meaning-to-word', word: 'Showing strong feeling; passionate', correctAnswer: 'Vehement', options: ['Vehement', 'Benevolent', 'Eloquent', 'Resilient'], difficulty: 'hard' },
  { id: 3, type: 'synonym', word: 'Ubiquitous', correctAnswer: 'Omnipresent', options: ['Omnipresent', 'Rare', 'Ancient', 'Mysterious'], context: 'Find the synonym of "Ubiquitous"', difficulty: 'medium' },
  { id: 4, type: 'antonym', word: 'Verbose', correctAnswer: 'Concise', options: ['Concise', 'Talkative', 'Lengthy', 'Detailed'], context: 'Find the opposite of "Verbose"', difficulty: 'easy' },
  { id: 5, type: 'fill-blank', word: 'The speaker\'s _____ speech captivated the entire audience.', correctAnswer: 'eloquent', options: ['eloquent', 'mundane', 'brief', 'hesitant'], difficulty: 'easy' },
  { id: 6, type: 'word-to-meaning', word: 'Serendipity', correctAnswer: 'Finding something good without looking for it', options: ['Finding something good without looking for it', 'A feeling of great happiness', 'The ability to make wise decisions', 'A peaceful state of mind'], difficulty: 'medium' },
  { id: 7, type: 'synonym', word: 'Meticulous', correctAnswer: 'Thorough', options: ['Thorough', 'Careless', 'Quick', 'Flexible'], context: 'Find the synonym of "Meticulous"', difficulty: 'easy' },
  { id: 8, type: 'word-to-meaning', word: 'Pragmatic', correctAnswer: 'Dealing with things sensibly and realistically', options: ['Dealing with things sensibly and realistically', 'Believing in supernatural powers', 'Acting without thinking', 'Being overly emotional'], difficulty: 'medium' },
  { id: 9, type: 'meaning-to-word', word: 'Capable of producing desired results with minimum waste', correctAnswer: 'Efficient', options: ['Efficient', 'Effective', 'Adequate', 'Proficient'], difficulty: 'hard' },
  { id: 10, type: 'fill-blank', word: 'Despite facing _____ challenges, she remained optimistic.', correctAnswer: 'formidable', options: ['formidable', 'trivial', 'simple', 'pleasant'], difficulty: 'medium' },
];

/* =============================================
   HELPERS
   ============================================= */

const TYPE_LABELS: Record<string, string> = {
  'word-to-meaning': 'What does this word mean?',
  'meaning-to-word': 'Which word matches this meaning?',
  synonym: 'Find the synonym',
  antonym: 'Find the antonym',
  'fill-blank': 'Fill in the blank',
};

const DIFF_STYLES: Record<string, string> = {
  easy: 'text-green-700 bg-green-100',
  medium: 'text-yellow-700 bg-yellow-100',
  hard: 'text-red-700 bg-red-100',
};

function calcPoints(difficulty: string, time: number, streak: number) {
  const base = difficulty === 'hard' ? 150 : difficulty === 'medium' ? 100 : 50;
  const speed = Math.max(0, 50 - time * 10);
  return Math.round(base + speed + streak * 10);
}

/* =============================================
   MAIN COMPONENT
   ============================================= */

export default function VocabChallengePage() {
  const [view, setView] = useState<'landing' | 'playing' | 'result'>('landing');
  const { data: session } = useSession();
  const [baseElo, setBaseElo] = useState(800);
  const isLoggedIn = !!session?.user;

  useEffect(() => {
    fetch('/api/vocab-elo').then(r => r.json()).then(d => { if (d.elo) setBaseElo(d.elo); }).catch(() => {});
  }, []);

  return (
    <>
      <Header />
      {view === 'landing' && <LandingView onStart={() => setView('playing')} baseElo={baseElo} isLoggedIn={isLoggedIn} />}
      {view === 'playing' && <GameView onFinish={() => setView('result')} baseElo={baseElo} />}
      {view === 'result' && <ResultView onReplay={() => setView('playing')} isLoggedIn={isLoggedIn} setBaseElo={setBaseElo} />}
      <Footer />
    </>
  );
}

/* =============================================
   1. LANDING VIEW
   ============================================= */

function LandingView({ onStart, baseElo, isLoggedIn }: { onStart: () => void; baseElo: number; isLoggedIn: boolean }) {
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleStart = () => {
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      onStart();
      return;
    }
    const t = setTimeout(() => setCountdown(countdown - 1), 800);
    return () => clearTimeout(t);
  }, [countdown, onStart]);

  return (
    <main className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-warm-50 to-white overflow-hidden">
      {/* Bg decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply blur-3xl opacity-40" />
      </div>

      {/* Countdown overlay */}
      {countdown !== null && (
        <div className="fixed inset-0 z-50 bg-primary-900/90 backdrop-blur-md flex items-center justify-center">
          <div className="text-center">
            <div className="text-[120px] sm:text-[160px] font-black text-white leading-none animate-bounce-once">
              {countdown === 0 ? 'GO!' : countdown}
            </div>
            <p className="text-primary-200 text-lg mt-4">Get ready...</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-200 rounded-full mb-6">
              <Brain className="w-4 h-4 text-yellow-700" />
              <span className="text-sm font-semibold text-yellow-800">Daily Vocabulary Challenge</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight mb-6">
              How sharp is your
              <br />
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">vocabulary?</span>
            </h1>

            <p className="text-xl text-warm-600 leading-relaxed mb-8 max-w-lg">
              10 questions. Timed. ELO-ranked against players worldwide. A new challenge drops every 24 hours — can you keep your streak alive?
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { icon: <Zap className="w-5 h-5 text-yellow-500" />, label: '10 Questions', sub: 'Timed rounds' },
                { icon: <Trophy className="w-5 h-5 text-yellow-500" />, label: 'ELO Ranked', sub: 'Global leaderboard' },
                { icon: <Clock className="w-5 h-5 text-yellow-500" />, label: 'New Daily', sub: 'Every 24 hours' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-center">
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary-900">{s.label}</div>
                    <div className="text-xs text-warm-500">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Current ELO */}
            {isLoggedIn && (
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-200 rounded-xl">
                <Trophy className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-bold text-primary-900">Your ELO: {baseElo}</span>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
            <button
              onClick={handleStart}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-primary-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-primary-800 transition-all hover:-translate-y-0.5"
            >
              <Zap className="w-6 h-6 text-yellow-400" />
              Start Today&apos;s Challenge
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            {isLoggedIn && (
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-5 text-primary-700 font-medium hover:text-primary-900 transition-colors">
                ← Back to Dashboard
              </Link>
            )}
            </div>

            <p className="text-sm text-warm-500 mt-4">Free to play · No sign-up required</p>
          </div>

          {/* Right: Preview card */}
          <div className="relative hidden lg:block">
            {/* Mock question card */}
            <div className="bg-white rounded-3xl border-2 border-warm-200 shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-warm-500 uppercase tracking-wider">Sample Question</span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">Medium</span>
              </div>

              <p className="text-sm text-warm-500 mb-3">What does this word mean?</p>
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 mb-6">
                <p className="text-3xl font-bold text-primary-900 text-center">Ephemeral</p>
              </div>

              <div className="space-y-3">
                {['Lasting for a very short time', 'Extremely beautiful', 'Very difficult to understand', 'Relating to the physical world'].map((opt, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      i === 0
                        ? 'border-green-400 bg-green-50'
                        : 'border-warm-200 opacity-60'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      i === 0 ? 'bg-green-500 text-white' : 'bg-warm-100 text-warm-600'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm font-medium text-primary-900">{opt}</span>
                    {i === 0 && <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-primary-900 rounded-2xl p-4 shadow-lg transform rotate-6">
              <div className="text-2xl font-black">+150</div>
              <div className="text-xs font-bold">points</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border-2 border-primary-200 rounded-2xl px-5 py-3 shadow-lg transform -rotate-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-primary-900 text-sm">#247 Global</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =============================================
   2. GAME VIEW
   ============================================= */

function GameView({ onFinish, baseElo }: { onFinish: () => void; baseElo: number }) {
  const [gs, setGs] = useState<GameState>({
    currentQuestion: 0,
    answers: Array(QUESTIONS.length).fill(null),
    timeSpent: Array(QUESTIONS.length).fill(0),
    score: 0,
    streak: 0,
    maxStreak: 0,
    isComplete: false,
  });

  const [qTimer, setQTimer] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const q = QUESTIONS[gs.currentQuestion];

  // Per-question timer
  useEffect(() => {
    setQTimer(0);
    setSelected(null);
    setAnswered(false);
    timerRef.current = setInterval(() => setQTimer((t) => t + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gs.currentQuestion]);

  const handleAnswer = (answer: string) => {
    if (answered) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelected(answer);
    setAnswered(true);

    const isCorrect = answer === q.correctAnswer;
    const newStreak = isCorrect ? gs.streak + 1 : 0;

    const newAnswers = [...gs.answers];
    newAnswers[gs.currentQuestion] = answer;
    const newTime = [...gs.timeSpent];
    newTime[gs.currentQuestion] = qTimer;

    const pts = isCorrect ? calcPoints(q.difficulty, qTimer, gs.streak) : 0;

    setGs({
      ...gs,
      answers: newAnswers,
      timeSpent: newTime,
      score: gs.score + pts,
      streak: newStreak,
      maxStreak: Math.max(gs.maxStreak, newStreak),
    });
  };

  const handleNext = () => {
    if (gs.currentQuestion >= QUESTIONS.length - 1) {
      // Store result in sessionStorage for result view
      const correctCount = gs.answers.filter((a, i) =>
        i < gs.currentQuestion ? a === QUESTIONS[i].correctAnswer : selected === QUESTIONS[i].correctAnswer
      ).length + (selected === q.correctAnswer ? 0 : 0);

      const finalAnswers = [...gs.answers];
      // Already set in handleAnswer

      const cc = finalAnswers.filter((a, i) => a === QUESTIONS[i].correctAnswer).length;
      const acc = (cc / QUESTIONS.length) * 100;
      const avgT = gs.timeSpent.reduce((a, b) => a + b, 0) / QUESTIONS.length;
      const eloChange = Math.round(32 * (acc / 100 - 0.5));

      const result: Result = {
        score: gs.score,
        accuracy: acc,
        averageTime: avgT,
        eloChange,
        newElo: baseElo + eloChange,
        correctCount: cc,
      };

      sessionStorage.setItem('vocab-result', JSON.stringify(result));
      sessionStorage.setItem('vocab-answers', JSON.stringify(finalAnswers));
      onFinish();
    } else {
      setGs({ ...gs, currentQuestion: gs.currentQuestion + 1 });
    }
  };

  const progress = ((gs.currentQuestion + (answered ? 1 : 0)) / QUESTIONS.length) * 100;
  const isCorrect = selected === q.correctAnswer;

  return (
    <main className="min-h-[80vh] bg-gradient-to-b from-warm-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-warm-500">
              {gs.currentQuestion + 1}/{QUESTIONS.length}
            </span>
            {gs.streak >= 2 && (
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                🔥 {gs.streak} streak
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-warm-600">
              <Timer className="w-4 h-4" />
              <span className="font-mono font-bold">{qTimer}s</span>
            </div>
            <div className="text-sm font-bold text-primary-900">{gs.score} pts</div>
          </div>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-warm-200 rounded-full mb-8 overflow-hidden">
          <div className="h-full bg-primary-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-warm-200 shadow-lg p-6 sm:p-8 mb-6">
          {/* Meta */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-warm-500">{TYPE_LABELS[q.type]}</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${DIFF_STYLES[q.difficulty]}`}>
              {q.difficulty}
            </span>
          </div>

          {q.context && <p className="text-sm text-warm-500 mb-3">{q.context}</p>}

          {/* Word */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 mb-8">
            <p className="text-2xl sm:text-3xl font-bold text-primary-900 text-center">{q.word}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isThis = opt === selected;
              const isRight = opt === q.correctAnswer;

              let style = 'border-warm-200 hover:border-primary-400 hover:bg-primary-50 cursor-pointer';
              if (answered) {
                if (isRight) style = 'border-green-400 bg-green-50';
                else if (isThis && !isRight) style = 'border-red-400 bg-red-50';
                else style = 'border-warm-200 opacity-50';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  disabled={answered}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${style}`}
                >
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    answered && isRight ? 'bg-green-500 text-white'
                    : answered && isThis && !isRight ? 'bg-red-400 text-white'
                    : 'bg-warm-100 text-warm-700'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-medium text-primary-900 flex-1">{opt}</span>
                  {answered && isRight && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
                  {answered && isThis && !isRight && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {answered && (
            <div className={`mt-6 p-4 rounded-xl text-sm font-medium ${
              isCorrect ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {isCorrect
                ? `✅ Correct! +${calcPoints(q.difficulty, qTimer, gs.streak - 1)} points`
                : `❌ The answer was "${q.correctAnswer}"`}
            </div>
          )}
        </div>

        {/* Next */}
        {answered && (
          <button
            onClick={handleNext}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-md"
          >
            {gs.currentQuestion < QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </main>
  );
}

/* =============================================
   3. RESULT VIEW
   ============================================= */

function ResultView({ onReplay, isLoggedIn, setBaseElo }: { onReplay: () => void; isLoggedIn: boolean; setBaseElo: (v: number) => void }) {
  const [result, setResult] = useState<Result | null>(null);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    const r = sessionStorage.getItem('vocab-result');
    const a = sessionStorage.getItem('vocab-answers');
    if (r) {
      const parsed = JSON.parse(r) as Result;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult(parsed);
      // Save ELO to DB if logged in
      if (isLoggedIn && parsed.eloChange !== undefined) {
        fetch('/api/vocab-elo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eloChange: parsed.eloChange }),
        }).then(res => res.json()).then(d => {
          if (d.newElo) setBaseElo(d.newElo);
        }).catch(() => {});
      }
    }
    if (a) setAnswers(JSON.parse(a));
  }, [isLoggedIn, setBaseElo]);

  if (!result) return null;

  const grade =
    result.accuracy >= 90 ? { emoji: '🏆', label: 'Outstanding', color: 'from-yellow-400 to-yellow-500' }
    : result.accuracy >= 70 ? { emoji: '🔥', label: 'Great Job', color: 'from-green-400 to-green-500' }
    : result.accuracy >= 50 ? { emoji: '👍', label: 'Good Effort', color: 'from-blue-400 to-blue-500' }
    : { emoji: '💪', label: 'Keep Practicing', color: 'from-warm-400 to-warm-500' };

  return (
    <main className="min-h-[80vh] bg-gradient-to-b from-warm-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Celebration header */}
        <div className="text-center mb-10">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${grade.color} rounded-full mb-4 shadow-lg`}>
            <span className="text-4xl">{grade.emoji}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-2">
            {grade.label}!
          </h1>
          <p className="text-warm-600">Challenge complete — here&apos;s how you did</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { val: `${Math.round(result.accuracy)}%`, label: 'Accuracy', icon: <Target className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' },
            { val: `${result.score}`, label: 'Score', icon: <Zap className="w-5 h-5 text-green-600" />, bg: 'bg-green-50' },
            { val: `${result.averageTime.toFixed(1)}s`, label: 'Avg Time', icon: <Clock className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-50' },
            { val: `${result.correctCount}/${QUESTIONS.length}`, label: 'Correct', icon: <CheckCircle className="w-5 h-5 text-primary-600" />, bg: 'bg-primary-50' },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} rounded-2xl p-5 text-center`}>
              <div className="flex justify-center mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-primary-900">{s.val}</div>
              <div className="text-xs text-warm-600">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ELO card */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-800 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-primary-200 mb-1">Your ELO Rating</div>
              <div className="text-3xl font-bold flex items-baseline gap-2">
                {result.newElo}
                <span className={`text-lg ${result.eloChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {result.eloChange >= 0 ? '+' : ''}{result.eloChange}
                </span>
              </div>
            </div>
            <TrendingUp className="w-10 h-10 text-primary-300" />
          </div>
          <p className="text-xs text-primary-300 mt-3">{isLoggedIn ? 'Your rating has been saved to your account' : 'Sign up to save your rating and track your progress'}</p>
        </div>

        {/* Question breakdown */}
        <div className="mb-8">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full flex items-center justify-between p-4 bg-white border border-warm-200 rounded-xl hover:bg-warm-50 transition-all"
          >
            <span className="font-semibold text-primary-900">Question Breakdown</span>
            <ChevronRight className={`w-5 h-5 text-warm-500 transition-transform ${showBreakdown ? 'rotate-90' : ''}`} />
          </button>

          {showBreakdown && (
            <div className="mt-3 space-y-2">
              {QUESTIONS.map((qq, i) => {
                const userAns = answers[i];
                const correct = userAns === qq.correctAnswer;
                return (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border text-sm ${
                    correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    {correct
                      ? <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                    <span className="font-medium text-primary-900 flex-1 truncate">{qq.word}</span>
                    {!correct && (
                      <span className="text-xs text-warm-600 truncate max-w-[120px]">→ {qq.correctAnswer}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onReplay}
            className="group flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-md"
          >
            <Zap className="w-5 h-5 text-yellow-400" />
            Play Again
          </button>
          <Link
            href="/vocabulary-challenge/leaderboard"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-primary-200 text-primary-700 rounded-xl font-semibold hover:bg-warm-50 transition-all"
          >
            <Trophy className="w-5 h-5 text-yellow-500" />
            Leaderboard
          </Link>
        </div>

        {/* Bottom CTA */}
        {isLoggedIn ? (
          <div className="mt-8 bg-gradient-to-br from-primary-50 to-warm-50 border border-primary-200 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-primary-900 mb-2">Rating saved!</h3>
            <p className="text-sm text-warm-600 mb-4">Your ELO has been updated. Come back tomorrow for a new challenge.</p>
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all">
              Back to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-8 bg-gradient-to-br from-primary-50 to-warm-50 border border-primary-200 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-primary-900 mb-2">Save your progress & climb the ranks</h3>
            <p className="text-sm text-warm-600 mb-4">Create a free account to keep your ELO rating and track your streaks.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all">
              Sign up — it&apos;s free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
