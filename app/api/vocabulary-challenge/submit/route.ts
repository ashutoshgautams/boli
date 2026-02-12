// app/api/vocabulary-challenge/submit/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { EloCalculator } from '@/lib/elo-calculator';
import { 
  ChallengeSubmission, 
  GameResult, 
  Question,
  UserAnswer 
} from '@/types/vocabulary-challenge';

interface GameResultData {
  challengeId: string;
  sessionId: string | undefined;
  score: number;
  accuracy: number;
  eloChange: number;
  newElo: number;
  answers: Array<{
    questionId: number;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    points: number;
    timeSpent: number;
    explanation?: string;
  }>;
}

// This would normally come from your database
// For now, mock data
const MOCK_CHALLENGE_QUESTIONS: Question[] = [
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
  // ... more questions
];

export async function POST(request: NextRequest) {
  try {
    const body: ChallengeSubmission = await request.json();
    const { challengeId, sessionId, answers } = body;

    // 1. Validate request
    if (!challengeId || !answers || answers.length !== 10) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_REQUEST', message: 'Invalid submission' } },
        { status: 400 }
      );
    }

    // 2. Get challenge questions (from database in production)
    const questions = MOCK_CHALLENGE_QUESTIONS;

    // 3. Get user's current ELO (from database or session)
    const currentElo = await getUserElo(sessionId);
    const isGuest = !sessionId || sessionId.startsWith('guest-');

    // 4. Evaluate answers
    const questionResults = answers.map((answer, idx) => {
      const question = questions[idx];
      const isCorrect = answer.answer === question.correctAnswer;
      
      // Calculate points for this question
      const points = EloCalculator.calculatePoints(
        isCorrect,
        question.difficulty,
        answer.timeSpent,
        calculateStreak(answers.slice(0, idx + 1), questions)
      );

      return {
        questionId: answer.questionId,
        question: question.word,
        userAnswer: answer.answer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        points,
        timeSpent: answer.timeSpent,
        explanation: question.explanation
      };
    });

    // 5. Calculate overall stats
    const correctCount = questionResults.filter(r => r.isCorrect).length;
    const totalScore = questionResults.reduce((sum, r) => sum + r.points, 0);
    const accuracy = (correctCount / questions.length) * 100;
    const averageTime = answers.reduce((sum, a) => sum + a.timeSpent, 0) / answers.length;

    // 6. Calculate ELO change
    const averageOpponentElo = await EloCalculator.getAverageOpponentElo(challengeId);
    const eloChange = EloCalculator.calculateEloChange({
      currentElo,
      accuracy,
      averageTime,
      averageOpponentElo,
      isGuest
    });

    const newElo = currentElo + eloChange;

    // 7. Calculate rank
    const totalPlayers = await getTotalPlayers();
    const rank = EloCalculator.calculateRank(newElo, totalPlayers);

    // 8. Save result to database (in production)
    await saveGameResult({
      challengeId,
      sessionId,
      score: totalScore,
      accuracy,
      eloChange,
      newElo,
      answers: questionResults
    });

    // 9. Update user's ELO (in production)
    await updateUserElo(sessionId, newElo, isGuest);

    // 10. Prepare response
    const result: GameResult = {
      score: totalScore,
      accuracy: accuracy,
      averageTime: averageTime,
      correctAnswers: correctCount,
      totalQuestions: questions.length,
      eloChange: eloChange,
      newElo: newElo,
      rank: rank,
      totalPlayers: totalPlayers,
      breakdown: questionResults
    };

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Challenge submission error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          code: 'SERVER_ERROR', 
          message: 'Failed to process submission' 
        } 
      },
      { status: 500 }
    );
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get user's current ELO rating
 * In production, query from database
 */
async function getUserElo(sessionId: string | undefined): Promise<number> {
  if (!sessionId) return 800; // Guest default

  // TODO: Query database
  // const user = await db.query('SELECT current_elo FROM user_elo_ratings WHERE user_id = ?', [sessionId]);
  
  // For now, return guest default
  return sessionId.startsWith('guest-') ? 800 : 1200;
}

/**
 * Calculate current streak from answers
 */
function calculateStreak(answers: UserAnswer[], questions: Question[]): number {
  let streak = 0;
  for (let i = answers.length - 1; i >= 0; i--) {
    if (answers[i].answer === questions[i].correctAnswer) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/**
 * Get total number of players
 * In production, query from database
 */
async function getTotalPlayers(): Promise<number> {
  // TODO: Query database
  // const result = await db.query('SELECT COUNT(DISTINCT user_id) FROM challenge_results');
  
  return 50000; // Mock value
}

/**
 * Save game result to database
 */
async function saveGameResult(data: GameResultData): Promise<void> {
  // TODO: Insert into database
  /*
  await db.query(`
    INSERT INTO challenge_results 
    (challenge_id, user_id, session_id, score, accuracy, elo_before, elo_after, elo_change, answers)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    data.challengeId,
    data.sessionId?.startsWith('guest-') ? null : data.sessionId,
    data.sessionId,
    data.score,
    data.accuracy,
    data.newElo - data.eloChange,
    data.newElo,
    data.eloChange,
    JSON.stringify(data.answers)
  ]);
  */
  
  console.log('Game result saved:', data);
}

/**
 * Update user's ELO rating
 */
async function updateUserElo(sessionId: string | undefined, newElo: number, isGuest: boolean): Promise<void> {
  if (!sessionId) return;

  // TODO: Update database
  /*
  if (isGuest) {
    await db.query(`
      UPDATE guest_sessions 
      SET temp_elo = ?, games_played = games_played + 1 
      WHERE session_id = ?
    `, [newElo, sessionId]);
  } else {
    await db.query(`
      UPDATE user_elo_ratings 
      SET current_elo = ?, games_played = games_played + 1 
      WHERE user_id = ?
    `, [newElo, sessionId]);
  }
  */
  
  console.log(`ELO updated for ${sessionId}:`, newElo);
}
