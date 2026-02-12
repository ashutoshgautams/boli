// ============================================
// VOCABULARY CHALLENGE - TYPE DEFINITIONS
// ============================================

/**
 * Question Types
 */
export type QuestionType =
  | 'word-to-meaning'    // Show word, choose meaning
  | 'meaning-to-word'    // Show meaning, choose word
  | 'synonym'            // Find word with same meaning
  | 'antonym'            // Find opposite word
  | 'fill-blank'         // Complete the sentence
  | 'usage'              // Correct usage in context
  | 'prefix-suffix';     // Word formation

export type Difficulty = 'easy' | 'medium' | 'hard';

export type TimeFilter = 'today' | 'week' | 'month' | 'all-time';

/**
 * Question Structure
 */
export interface Question {
  id: number;
  type: QuestionType;
  word: string;                    // Main word or sentence
  correctAnswer: string;
  options: string[];               // Array of 4 options
  context?: string;                // Additional instructions
  difficulty: Difficulty;
  explanation?: string;            // Post-answer learning content
  category?: string;               // 'business', 'academic', 'casual'
}

/**
 * Daily Challenge
 */
export interface DailyChallenge {
  id: string;
  date: string;                    // ISO date: '2026-02-10'
  questions: Question[];           // Array of 10 questions
  difficultyLevel?: Difficulty;    // Overall difficulty
  theme?: string;                  // Optional theme (e.g., 'Business English')
}

/**
 * User Answer
 */
export interface UserAnswer {
  questionId: number;
  answer: string;
  timeSpent: number;               // Seconds spent on this question
  isCorrect?: boolean;             // Set after evaluation
}

/**
 * Game State
 */
export interface GameState {
  currentQuestion: number;
  answers: (string | null)[];      // User's selected answers
  timeSpent: number[];             // Time per question in seconds
  score: number;
  streak: number;                  // Current streak of correct answers
  isComplete: boolean;
}

/**
 * Result Breakdown per Question
 */
export interface QuestionResult {
  questionId: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
  timeSpent: number;
  explanation?: string;
}

/**
 * Overall Game Result
 */
export interface GameResult {
  score: number;                   // Total points earned
  accuracy: number;                // Percentage (0-100)
  averageTime: number;             // Average seconds per question
  correctAnswers: number;
  totalQuestions: number;
  eloChange: number;               // +/- change
  newElo: number;                  // Updated ELO rating
  rank: number;                    // Global rank
  totalPlayers: number;
  breakdown: QuestionResult[];     // Per-question breakdown
}

/**
 * User ELO Stats
 */
export interface UserEloStats {
  userId?: string;                 // Null for guests
  currentElo: number;
  peakElo: number;
  gamesPlayed: number;
  totalScore: number;
  averageAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  rank: number;
  lastPlayed?: string;             // ISO date
  createdAt: string;
  updatedAt: string;
}

/**
 * Leaderboard Entry
 */
export interface LeaderboardEntry {
  rank: number;
  userId: string | null;           // Null for anonymous/guest entries
  username: string;
  avatar: string;
  elo: number;
  eloChange: number;               // Change for the filtered period
  gamesPlayed: number;
  accuracy: number;                // Percentage
  streak: number;
  isCurrentUser?: boolean;
}

/**
 * Leaderboard Response
 */
export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  currentUser: LeaderboardEntry | null;
  meta: {
    total: number;
    period: TimeFilter;
    updatedAt: string;
    page?: number;
    limit?: number;
  };
}

/**
 * Guest Session
 */
export interface GuestSession {
  sessionId: string;
  tempElo: number;
  gamesPlayed: number;
  createdAt: string;
  expiresAt: string;
  lastGameResult?: GameResult;
}

/**
 * Achievement/Badge
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;             // e.g., "Complete 7-day streak"
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;            // ISO date if unlocked
}

/**
 * Challenge Submission (API Request)
 */
export interface ChallengeSubmission {
  challengeId: string;
  sessionId?: string;              // For guests
  answers: UserAnswer[];
}

/**
 * Today's Challenge Response (API)
 */
export interface TodayChallengeResponse {
  challenge: DailyChallenge;
  userStats: UserEloStats | null;  // Null for guests
  hasPlayed: boolean;              // Whether user already played today
  canReplay: boolean;              // Whether replay is allowed
}

/**
 * ELO Calculation Params
 */
export interface EloCalculationParams {
  currentElo: number;
  accuracy: number;                // 0-100
  averageTime: number;             // Seconds
  averageOpponentElo: number;      // Today's average player ELO
  isGuest?: boolean;
}

/**
 * Stats Summary
 */
export interface StatsSummary {
  totalGames: number;
  averageScore: number;
  averageAccuracy: number;
  averageTime: number;
  bestStreak: number;
  totalWordsLearned: number;
  eloProgress: {
    current: number;
    peak: number;
    change30d: number;
  };
}

/**
 * Notification Preferences
 */
export interface NotificationPreferences {
  email: {
    dailyChallenge: boolean;
    weeklyReport: boolean;
    achievements: boolean;
  };
  push: {
    dailyReminder: boolean;
    rankChange: boolean;
    friendChallenges: boolean;
  };
}

/**
 * Tournament
 */
export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  participants: number;
  prizes?: string[];
  minElo?: number;
  maxElo?: number;
}

/**
 * History Entry
 */
export interface HistoryEntry {
  challengeId: string;
  date: string;
  score: number;
  accuracy: number;
  eloChange: number;
  rank: number;
  totalPlayers: number;
}

/**
 * Word of the Day
 */
export interface WordOfDay {
  word: string;
  meaning: string;
  example: string;
  pronunciation?: string;
  etymology?: string;
  synonyms: string[];
  antonyms: string[];
  difficulty: Difficulty;
  category: string;
}

// ============================================
// UTILITY TYPES
// ============================================

/**
 * API Response Wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Pagination
 */
export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
