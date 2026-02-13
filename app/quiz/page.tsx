'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, CheckCircle2, RotateCcw, Clock, Target, TrendingUp } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  level: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Choose the correct sentence:',
    options: [
      'She don\'t like coffee.',
      'She doesn\'t likes coffee.',
      'She doesn\'t like coffee.',
      'She not like coffee.',
    ],
    correct: 2,
    level: 'A1',
  },
  {
    id: 2,
    question: 'Fill in the blank: "I _____ to the gym every morning."',
    options: ['go', 'goes', 'going', 'gone'],
    correct: 0,
    level: 'A1',
  },
  {
    id: 3,
    question: 'What does "postpone" mean?',
    options: [
      'To cancel completely',
      'To do something early',
      'To delay to a later time',
      'To repeat something',
    ],
    correct: 2,
    level: 'A2',
  },
  {
    id: 4,
    question: 'Choose the correct form: "If I _____ rich, I would travel the world."',
    options: ['am', 'was', 'were', 'be'],
    correct: 2,
    level: 'B1',
  },
  {
    id: 5,
    question: '"She\'s been working here _____ 2019."',
    options: ['for', 'since', 'from', 'during'],
    correct: 1,
    level: 'B1',
  },
  {
    id: 6,
    question: 'Which sentence uses the passive voice correctly?',
    options: [
      'The report was wrote by the manager.',
      'The report was written by the manager.',
      'The report written by the manager.',
      'The report is write by the manager.',
    ],
    correct: 1,
    level: 'B2',
  },
  {
    id: 7,
    question: 'Choose the best word: "The new policy had a _____ impact on employee morale."',
    options: ['detrimental', 'destroyed', 'damaged', 'decreased'],
    correct: 0,
    level: 'B2',
  },
  {
    id: 8,
    question: '"Had I known about the meeting, I _____ attended."',
    options: [
      'will have',
      'would have',
      'could',
      'should',
    ],
    correct: 1,
    level: 'C1',
  },
  {
    id: 9,
    question: 'What does "ubiquitous" mean?',
    options: [
      'Extremely rare',
      'Found everywhere',
      'Very expensive',
      'Difficult to understand',
    ],
    correct: 1,
    level: 'C1',
  },
  {
    id: 10,
    question: 'Identify the correct sentence:',
    options: [
      'Not only did she finish the project, but she also exceeded expectations.',
      'Not only she finished the project, but she also exceeded expectations.',
      'Not only did she finished the project, but she also exceeded expectations.',
      'Not only she did finish the project, but also exceeded expectations.',
    ],
    correct: 0,
    level: 'C2',
  },
];

function getLevel(score: number): { level: string; label: string; description: string; color: string } {
  if (score <= 2) return { level: 'A1', label: 'Beginner', description: 'You\'re just getting started. Our foundation courses will build your confidence from the ground up.', color: 'text-red-600' };
  if (score <= 4) return { level: 'A2', label: 'Elementary', description: 'You have basic understanding. Our structured courses will help you form proper sentences and expand vocabulary.', color: 'text-orange-600' };
  if (score <= 6) return { level: 'B1', label: 'Intermediate', description: 'You can communicate in everyday situations. Speaking clubs and coaching will take you to the next level.', color: 'text-yellow-600' };
  if (score <= 8) return { level: 'B2', label: 'Upper Intermediate', description: 'You\'re quite competent. Our advanced coaching and interview prep will polish your professional English.', color: 'text-primary-600' };
  if (score <= 9) return { level: 'C1', label: 'Advanced', description: 'Impressive! Our expert 1:1 sessions and professional masterclasses will refine your fluency.', color: 'text-green-600' };
  return { level: 'C2', label: 'Proficient', description: 'Outstanding! You\'re near-native. Our premium coaching can help with accent refinement and executive communication.', color: 'text-emerald-600' };
}

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  const handleSelect = (optionIdx: number) => {
    if (answered) return;
    setSelected(optionIdx);
    setAnswered(true);

    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIdx;
    setAnswers(newAnswers);

    if (optionIdx === questions[currentQ].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setAnswers(Array(questions.length).fill(null));
  };

  const result = getLevel(score);
  const progress = ((currentQ + (answered ? 1 : 0)) / questions.length) * 100;

  return (
    <>
      <Header />

      <main className="min-h-[80vh] bg-gradient-to-b from-warm-50 to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

          {/* Quiz in progress */}
          {!finished && (
            <>
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-sm text-warm-600 mb-2">
                  <span>Question {currentQ + 1} of {questions.length}</span>
                  <span className="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                    Level: {questions[currentQ].level}
                  </span>
                </div>
                <div className="h-2 bg-warm-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="bg-white rounded-2xl border border-warm-200 shadow-sm p-6 sm:p-8 mb-6 pb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-primary-900 mb-8 pb-9">
                  {questions[currentQ].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQ].options.map((option, idx) => {
                    const isCorrect = idx === questions[currentQ].correct;
                    const isSelected = idx === selected;

                    let optionStyle = 'border-warm-200 hover:border-primary-400 hover:bg-primary-50';
                    if (answered) {
                      if (isCorrect) optionStyle = 'border-green-500 bg-green-50';
                      else if (isSelected && !isCorrect) optionStyle = 'border-red-400 bg-red-50';
                      else optionStyle = 'border-warm-200 opacity-60';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={answered}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${optionStyle} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <span className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                          answered && isCorrect
                            ? 'bg-green-500 text-white'
                            : answered && isSelected && !isCorrect
                            ? 'bg-red-400 text-white'
                            : 'bg-warm-100 text-warm-700'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-primary-900 font-medium">{option}</span>
                        {answered && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next button */}
              {answered && (
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-sm hover:shadow-md"
                >
                  {currentQ < questions.length - 1 ? 'Next Question' : 'See Results'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </>
          )}

          {/* Results */}
          {finished && (
            <div className="text-center">
              {/* Score circle */}
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border-4 border-primary-300 flex flex-col items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-primary-700">{score}</span>
                  <span className="text-sm text-primary-600">/ {questions.length}</span>
                </div>
              </div>

              {/* Level result */}
              <div className="bg-white rounded-2xl border border-warm-200 shadow-sm p-8 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-4">
                  <Target className="w-4 h-4 text-primary-700" />
                  <span className="text-sm font-semibold text-primary-700">Your English Level</span>
                </div>

                <h2 className={`text-5xl font-bold mb-2 ${result.color}`}>
                  {result.level}
                </h2>
                <p className="text-xl font-semibold text-primary-900 mb-4 pb-6">{result.label}</p>
                <p className="inline-flex items-center text-warm-600 max-w-md mx-auto leading-relaxed">
                  {result.description}
                </p>

                {/* Breakdown */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-warm-200">
                  <div>
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-2xl font-bold text-primary-900">{score}</span>
                    </div>
                    <p className="text-xs text-warm-600">Correct</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <Clock className="w-4 h-4 text-warm-500" />
                      <span className="text-2xl font-bold text-primary-900">{questions.length - score}</span>
                    </div>
                    <p className="text-xs text-warm-600">Incorrect</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <TrendingUp className="w-4 h-4 text-primary-600" />
                      <span className="text-2xl font-bold text-primary-900">{Math.round((score / questions.length) * 100)}%</span>
                    </div>
                    <p className="text-xs text-warm-600">Accuracy</p>
                  </div>
                </div>
              </div>

              {/* What we recommend */}
              <div className="bg-gradient-to-br from-primary-50 to-warm-50 rounded-2xl border border-primary-200 p-8 mb-8 text-left">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 pb-6">Recommended for you</h3>
                <ul className="space-y-3">
                  {score <= 4 && (
                    <>
                      <RecommendItem text="English Foundations course (A1–A2)" />
                      <RecommendItem text="Daily speaking clubs for beginners" />
                      <RecommendItem text="1:1 coaching to build confidence" />
                    </>
                  )}
                  {score > 4 && score <= 7 && (
                    <>
                      <RecommendItem text="Conversational Fluency course (B1–B2)" />
                      <RecommendItem text="Interview preparation sessions" />
                      <RecommendItem text="Group coaching for real-world practice" />
                    </>
                  )}
                  {score > 7 && (
                    <>
                      <RecommendItem text="Professional Mastery course (C1–C2)" />
                      <RecommendItem text="1:1 executive coaching sessions" />
                      <RecommendItem text="Advanced speaking clubs for fluency" />
                    </>
                  )}
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  Start learning - it&apos;s free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                {/* <button
                  onClick={handleRestart}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 border-2 border-primary-200 rounded-xl font-semibold text-lg hover:bg-warm-50 transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  Retake Quiz
                </button> */}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

function RecommendItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
      </div>
      <span className="text-warm-800 font-medium">{text}</span>
    </li>
  );
}
