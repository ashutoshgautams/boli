'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Trophy, Clock, Target, Zap, Star, TrendingUp, 
  CheckCircle, XCircle, ArrowRight, Share2, Timer,
  Brain, Award, Users
} from 'lucide-react';

interface Challenge {
  id: string;
  date: string;
  questions: Question[];
}

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
  isComplete: boolean;
}

interface Result {
  score: number;
  accuracy: number;
  averageTime: number;
  eloChange: number;
  newElo: number;
  globalRank: number;
  totalPlayers: number;
}

export default function VocabChallengePage() {
  const [isSignedIn, setIsSignedIn] = useState(false); // TODO: Get from auth
  const [currentElo, setCurrentElo] = useState(800); // Guest default or user's actual ELO
  
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    answers: Array(10).fill(null),
    timeSpent: Array(10).fill(0),
    score: 0,
    streak: 0,
    isComplete: false
  });

  const [questionTimer, setQuestionTimer] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
  const [mockGlobalRank] = useState(() => Math.floor(Math.random() * 10000) + 1);

  // Mock today's challenge - In production, fetch from API
  const todayChallenge: Challenge = {
    id: '2026-02-10',
    date: '2026-02-10',
    questions: [
      {
        id: 1,
        type: 'word-to-meaning',
        word: 'Ephemeral',
        correctAnswer: 'Lasting for a very short time',
        options: [
          'Lasting for a very short time',
          'Extremely beautiful',
          'Very difficult to understand',
          'Relating to the physical world'
        ],
        difficulty: 'medium'
      },
      {
        id: 2,
        type: 'meaning-to-word',
        word: 'Showing strong feeling; passionate',
        correctAnswer: 'Vehement',
        options: ['Vehement', 'Benevolent', 'Eloquent', 'Resilient'],
        difficulty: 'hard'
      },
      {
        id: 3,
        type: 'synonym',
        word: 'Ubiquitous',
        correctAnswer: 'Omnipresent',
        options: ['Omnipresent', 'Rare', 'Ancient', 'Mysterious'],
        context: 'Find the word that means the same as "Ubiquitous"',
        difficulty: 'medium'
      },
      {
        id: 4,
        type: 'antonym',
        word: 'Verbose',
        correctAnswer: 'Concise',
        options: ['Concise', 'Talkative', 'Lengthy', 'Detailed'],
        context: 'Find the opposite of "Verbose"',
        difficulty: 'easy'
      },
      {
        id: 5,
        type: 'fill-blank',
        word: 'The speaker\'s _____ speech captivated the entire audience.',
        correctAnswer: 'eloquent',
        options: ['eloquent', 'mundane', 'brief', 'hesitant'],
        difficulty: 'easy'
      },
      {
        id: 6,
        type: 'word-to-meaning',
        word: 'Serendipity',
        correctAnswer: 'Finding something good without looking for it',
        options: [
          'Finding something good without looking for it',
          'A feeling of great happiness',
          'The ability to make wise decisions',
          'A peaceful state of mind'
        ],
        difficulty: 'medium'
      },
      {
        id: 7,
        type: 'synonym',
        word: 'Meticulous',
        correctAnswer: 'Thorough',
        options: ['Thorough', 'Careless', 'Quick', 'Flexible'],
        context: 'Find the word closest in meaning to "Meticulous"',
        difficulty: 'easy'
      },
      {
        id: 8,
        type: 'word-to-meaning',
        word: 'Pragmatic',
        correctAnswer: 'Dealing with things sensibly and realistically',
        options: [
          'Dealing with things sensibly and realistically',
          'Believing in supernatural powers',
          'Acting without thinking',
          'Being overly emotional'
        ],
        difficulty: 'medium'
      },
      {
        id: 9,
        type: 'meaning-to-word',
        word: 'Capable of producing desired results with minimum waste',
        correctAnswer: 'Efficient',
        options: ['Efficient', 'Effective', 'Adequate', 'Proficient'],
        difficulty: 'hard'
      },
      {
        id: 10,
        type: 'fill-blank',
        word: 'Despite facing _____ challenges, she remained optimistic.',
        correctAnswer: 'formidable',
        options: ['formidable', 'trivial', 'simple', 'pleasant'],
        difficulty: 'medium'
      }
    ]
  };

  const currentQ = todayChallenge.questions[gameState.currentQuestion];

  // Timer for current question
  useEffect(() => {
    if (gameState.isComplete) return;
    
    const interval = setInterval(() => {
      setQuestionTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.currentQuestion, gameState.isComplete]);

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === currentQ.correctAnswer;
    const newAnswers = [...gameState.answers];
    newAnswers[gameState.currentQuestion] = answer;
    
    const newTimeSpent = [...gameState.timeSpent];
    newTimeSpent[gameState.currentQuestion] = questionTimer;

    const newScore = gameState.score + (isCorrect ? calculatePoints() : 0);
    const newStreak = isCorrect ? gameState.streak + 1 : 0;

    if (gameState.currentQuestion === todayChallenge.questions.length - 1) {
      // Last question - complete the game
      finishGame(newAnswers, newTimeSpent, newScore);
    } else {
      setGameState({
        ...gameState,
        currentQuestion: gameState.currentQuestion + 1,
        answers: newAnswers,
        timeSpent: newTimeSpent,
        score: newScore,
        streak: newStreak
      });
      setQuestionTimer(0);
    }
  };

  const calculatePoints = () => {
    // Points based on difficulty and speed
    const basePoints = currentQ.difficulty === 'hard' ? 150 : 
                      currentQ.difficulty === 'medium' ? 100 : 50;
    
    // Speed bonus (max 50 bonus points if answered under 5 seconds)
    const speedBonus = Math.max(0, 50 - (questionTimer * 10));
    
    // Streak bonus
    const streakBonus = gameState.streak * 10;
    
    return Math.round(basePoints + speedBonus + streakBonus);
  };

  const calculateEloChange = (score: number, accuracy: number) => {
    // Simplified ELO calculation
    // In production, this would be more sophisticated
    const expectedScore = 0.5; // 50% expected
    const actualScore = accuracy / 100;
    const kFactor = isSignedIn ? 32 : 40; // Higher K for guests to encourage signup
    
    const eloChange = Math.round(kFactor * (actualScore - expectedScore));
    return eloChange;
  };

  const finishGame = (answers: (string | null)[], timeSpent: number[], finalScore: number) => {
    const correctCount = answers.filter((ans, idx) => 
      ans === todayChallenge.questions[idx].correctAnswer
    ).length;
    
    const accuracy = (correctCount / todayChallenge.questions.length) * 100;
    const avgTime = timeSpent.reduce((a, b) => a + b, 0) / timeSpent.length;
    const eloChange = calculateEloChange(finalScore, accuracy);
    const newElo = currentElo + eloChange;

    const result: Result = {
      score: finalScore,
      accuracy: accuracy,
      averageTime: avgTime,
      eloChange: eloChange,
      newElo: newElo,
      globalRank: mockGlobalRank,
      totalPlayers: 50000 // Mock
    };

    setResult(result);
    setGameState({ ...gameState, isComplete: true, score: finalScore });
    setShowResult(true);
    
    // Show sign-up prompt for guests after a delay
    if (!isSignedIn) {
      setTimeout(() => setShowSignUpPrompt(true), 2000);
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'word-to-meaning': return 'What does this word mean?';
      case 'meaning-to-word': return 'Which word matches this meaning?';
      case 'synonym': return 'Find the synonym';
      case 'antonym': return 'Find the antonym';
      case 'fill-blank': return 'Fill in the blank';
      default: return 'Question';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-50 via-white to-warm-100">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header with Logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="text-2xl font-bold text-primary-900">Boli</span>
          </Link>

          {/* Result Card */}
          <div className="bg-white rounded-3xl border-2 border-warm-200 p-8 shadow-xl mb-6">
            {/* Celebration Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">
                Challenge Complete! 🎉
              </h1>
              <p className="text-warm-600">
                {result.accuracy >= 80 ? 'Outstanding performance!' : 
                 result.accuracy >= 60 ? 'Great job!' : 
                 'Keep practicing!'}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-blue-900 mb-1">
                  {Math.round(result.accuracy)}%
                </div>
                <div className="text-sm text-blue-700">Accuracy</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
                <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-900 mb-1">
                  {result.score}
                </div>
                <div className="text-sm text-green-700">Score</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-900 mb-1">
                  {result.averageTime.toFixed(1)}s
                </div>
                <div className="text-sm text-purple-700">Avg Time</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center">
                <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-orange-900 mb-1">
                  #{result.globalRank.toLocaleString()}
                </div>
                <div className="text-sm text-orange-700">Global Rank</div>
              </div>
            </div>

            {/* ELO Change */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 mb-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-90 mb-1">Your ELO Rating</div>
                  <div className="text-4xl font-bold flex items-center gap-3">
                    {result.newElo}
                    <span className={`text-2xl ${result.eloChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                      {result.eloChange >= 0 ? '+' : ''}{result.eloChange}
                    </span>
                  </div>
                </div>
                <TrendingUp className="w-12 h-12 opacity-50" />
              </div>
              <div className="mt-4 text-sm opacity-90">
                Top {((result.globalRank / result.totalPlayers) * 100).toFixed(1)}% of players
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href="/vocabulary-challenge/leaderboard"
                className="block w-full py-4 bg-warm-100 hover:bg-warm-200 text-primary-900 rounded-xl font-semibold text-center transition-all"
              >
                View Global Leaderboard
              </Link>

              <button className="w-full py-4 bg-white border-2 border-warm-200 hover:border-primary-300 text-primary-900 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share Your Score
              </button>

              <div className="text-center text-sm text-warm-600 pt-2">
                Come back tomorrow for a new challenge! 🔥
              </div>
            </div>
          </div>

          {/* Guest Sign-Up Prompt */}
          {!isSignedIn && showSignUpPrompt && (
            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-8 text-white shadow-2xl animate-in slide-in-from-bottom duration-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-900" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    Don&apos;t Lose Your Progress! ⚠️
                  </h3>
                  <p className="text-white/90">
                    Your ELO rating of <strong>{result.newElo}</strong> and global rank <strong>#{result.globalRank}</strong> will be lost unless you create an account.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Keep your ELO rating & compete on leaderboards</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Track your progress & build streaks</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Unlock achievements & badges</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Challenge friends & join tournaments</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href="/signup"
                  className="flex-1 py-4 bg-white text-primary-600 rounded-xl font-bold text-center hover:bg-warm-50 transition-all flex items-center justify-center gap-2"
                >
                  Sign Up Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => setShowSignUpPrompt(false)}
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all"
                >
                  Maybe Later
                </button>
              </div>

              <div className="mt-4 text-center text-sm text-white/70">
                Already have an account?{' '}
                <Link href="/login" className="text-white font-semibold underline">
                  Log in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-white to-warm-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="text-2xl font-bold text-primary-900">Boli</span>
          </Link>

          <div className="flex items-center gap-4">
            {!isSignedIn ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-warm-700 hover:text-primary-600"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-semibold text-primary-900">{currentElo}</div>
                  <div className="text-xs text-warm-600">ELO Rating</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Game Card */}
        <div className="bg-white rounded-3xl border-2 border-warm-200 p-8 shadow-xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-warm-700">
                Question {gameState.currentQuestion + 1} of {todayChallenge.questions.length}
              </span>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-warm-600" />
                <span className="text-sm font-mono font-medium text-warm-900">
                  {questionTimer}s
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-warm-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
                style={{ width: `${((gameState.currentQuestion + 1) / todayChallenge.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQ.difficulty)}`}>
                {currentQ.difficulty.toUpperCase()}
              </span>
              {gameState.streak > 0 && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {gameState.streak} streak
                </span>
              )}
            </div>

            <h2 className="text-xl font-semibold text-primary-900 mb-2">
              {getQuestionTypeLabel(currentQ.type)}
            </h2>

            {currentQ.context && (
              <p className="text-sm text-warm-600 mb-4">{currentQ.context}</p>
            )}

            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 mb-6">
              <p className="text-2xl font-bold text-primary-900 text-center">
                {currentQ.word}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="w-full p-5 bg-white border-2 border-warm-200 hover:border-primary-400 hover:bg-primary-50 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-warm-100 group-hover:bg-primary-200 rounded-lg flex items-center justify-center font-bold text-warm-700 group-hover:text-primary-700 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-lg text-primary-900 font-medium">
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Score Display */}
          <div className="mt-8 pt-6 border-t border-warm-200 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-sm text-warm-600 mb-1">Current Score</div>
                <div className="text-2xl font-bold text-primary-900">{gameState.score}</div>
              </div>
              {!isSignedIn && (
                <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                  ⚠️ Guest Mode - Sign up to save progress
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl border border-warm-200 p-4 text-center">
            <Brain className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-warm-900">Daily Challenge</div>
            <div className="text-xs text-warm-600">New words every 24h</div>
          </div>
          
          <div className="bg-white rounded-xl border border-warm-200 p-4 text-center">
            <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-warm-900">ELO Rating</div>
            <div className="text-xs text-warm-600">Compete globally</div>
          </div>
          
          <div className="bg-white rounded-xl border border-warm-200 p-4 text-center">
            <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-warm-900">Achievements</div>
            <div className="text-xs text-warm-600">Unlock badges</div>
          </div>
        </div>
      </div>
    </div>
  );
}
