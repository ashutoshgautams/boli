// ============================================
// ELO RATING CALCULATION ENGINE
// ============================================

import { EloCalculationParams } from './../types/vocabulary-challenge';

/**
 * Main ELO Calculator
 * Based on the chess ELO system with modifications for vocabulary challenges
 */
export class EloCalculator {
  /**
   * Calculate ELO change based on performance
   */
  static calculateEloChange(params: EloCalculationParams): number {
    const {
      currentElo,
      accuracy,
      averageTime,
      averageOpponentElo,
      isGuest = false
    } = params;

    // 1. Determine K-factor (volatility)
    const kFactor = this.getKFactor(currentElo, isGuest);

    // 2. Calculate expected score (0 to 1)
    const expectedScore = this.calculateExpectedScore(currentElo, averageOpponentElo);

    // 3. Calculate actual performance (0 to 1)
    const actualScore = accuracy / 100;

    // 4. Speed factor bonus/penalty (-0.1 to +0.1)
    const speedFactor = this.calculateSpeedFactor(averageTime);

    // 5. Difficulty multiplier
    const difficultyMultiplier = this.getDifficultyMultiplier(averageOpponentElo);

    // 6. Calculate raw change
    const rawChange = kFactor * (actualScore - expectedScore);

    // 7. Apply speed bonus and difficulty multiplier
    const finalChange = Math.round(
      rawChange + (kFactor * speedFactor * difficultyMultiplier)
    );

    // 8. Apply min/max caps
    return this.capEloChange(finalChange, currentElo);
  }

  /**
   * Get K-factor based on current ELO and player type
   * Higher K-factor = more volatile rating changes
   */
  private static getKFactor(currentElo: number, isGuest: boolean): number {
    if (isGuest) {
      return 40; // High volatility for guests to show potential
    }

    // Progressive K-factor based on rating
    if (currentElo < 1200) return 40;      // Beginners
    if (currentElo < 1800) return 32;      // Intermediate
    if (currentElo < 2400) return 24;      // Advanced
    return 16;                              // Expert (stable)
  }

  /**
   * Calculate expected score using standard ELO formula
   * https://en.wikipedia.org/wiki/Elo_rating_system
   */
  private static calculateExpectedScore(
    playerElo: number,
    opponentElo: number
  ): number {
    return 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
  }

  /**
   * Calculate speed factor based on average time per question
   * Encourages fast, confident answers without penalizing thoughtfulness
   */
  private static calculateSpeedFactor(averageTime: number): number {
    // Optimal range: 5-12 seconds per question
    if (averageTime < 3) return -0.05;     // Too fast = likely guessing
    if (averageTime < 5) return 0.10;      // Very fast and confident
    if (averageTime < 8) return 0.05;      // Fast
    if (averageTime < 12) return 0;        // Normal speed
    if (averageTime < 15) return -0.05;    // Slow but acceptable
    return -0.10;                           // Too slow
  }

  /**
   * Difficulty multiplier based on opponent pool strength
   */
  private static getDifficultyMultiplier(averageOpponentElo: number): number {
    // Beating stronger competition is worth more
    if (averageOpponentElo > 2000) return 1.2;
    if (averageOpponentElo > 1600) return 1.1;
    if (averageOpponentElo > 1200) return 1.0;
    return 0.9; // Lower competition
  }

  /**
   * Cap ELO changes to prevent extreme swings
   */
  private static capEloChange(change: number, currentElo: number): number {
    const maxGain = currentElo < 1200 ? 100 : 60;   // New players can gain more
    const maxLoss = -40;                             // Limit losses
    
    return Math.max(maxLoss, Math.min(maxGain, change));
  }

  /**
   * Calculate points earned based on performance
   */
  static calculatePoints(
    isCorrect: boolean,
    difficulty: 'easy' | 'medium' | 'hard',
    timeSpent: number,
    currentStreak: number
  ): number {
    if (!isCorrect) return 0;

    // Base points by difficulty
    const basePoints = {
      'easy': 50,
      'medium': 100,
      'hard': 150
    }[difficulty];

    // Speed bonus (max 50 points if under 5 seconds)
    const speedBonus = Math.max(0, Math.round(50 - (timeSpent * 10)));

    // Streak multiplier (up to 2x at 10 streak)
    const streakMultiplier = 1 + Math.min(currentStreak * 0.1, 1.0);

    // Calculate total
    const total = Math.round((basePoints + speedBonus) * streakMultiplier);

    return total;
  }

  /**
   * Calculate global rank based on ELO
   * Uses percentile distribution
   */
  static calculateRank(elo: number, totalPlayers: number): number {
    // Approximate rank based on ELO distribution
    // Assumes normal distribution with mean=1200, stdDev=200
    
    const mean = 1200;
    const stdDev = 200;
    
    // Calculate z-score
    const zScore = (elo - mean) / stdDev;
    
    // Convert to percentile (approximation)
    const percentile = this.normalCDF(zScore);
    
    // Convert percentile to rank (higher ELO = lower rank number)
    const rank = Math.round(totalPlayers * (1 - percentile));
    
    return Math.max(1, rank); // Ensure rank is at least 1
  }

  /**
   * Normal cumulative distribution function (approximation)
   */
  private static normalCDF(z: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    
    return z > 0 ? 1 - p : p;
  }

  /**
   * Determine player tier based on ELO
   */
  static getTier(elo: number): {
    name: string;
    color: string;
    icon: string;
    minElo: number;
    maxElo: number;
  } {
    if (elo >= 2400) {
      return {
        name: 'Grandmaster',
        color: 'text-purple-600',
        icon: '👑',
        minElo: 2400,
        maxElo: Infinity
      };
    }
    if (elo >= 2000) {
      return {
        name: 'Master',
        color: 'text-yellow-600',
        icon: '🏆',
        minElo: 2000,
        maxElo: 2399
      };
    }
    if (elo >= 1600) {
      return {
        name: 'Expert',
        color: 'text-blue-600',
        icon: '💎',
        minElo: 1600,
        maxElo: 1999
      };
    }
    if (elo >= 1200) {
      return {
        name: 'Intermediate',
        color: 'text-green-600',
        icon: '⭐',
        minElo: 1200,
        maxElo: 1599
      };
    }
    return {
      name: 'Beginner',
      color: 'text-gray-600',
      icon: '🌱',
      minElo: 0,
      maxElo: 1199
    };
  }

  /**
   * Calculate average opponent ELO for today
   * This would typically query the database
   */
  static async getAverageOpponentElo(challengeId: string): Promise<number> {
    // In production, query database for today's average
    // For now, return a reasonable default
    return 1200; // Default average
  }

  /**
   * Calculate probability of winning against opponent
   */
  static getWinProbability(playerElo: number, opponentElo: number): number {
    return this.calculateExpectedScore(playerElo, opponentElo) * 100;
  }

  /**
   * Estimate ELO needed to reach target rank
   */
  static estimateEloForRank(targetRank: number, totalPlayers: number): number {
    // Reverse calculation of rank to ELO
    const percentile = 1 - (targetRank / totalPlayers);
    
    // Inverse normal CDF (approximation)
    const zScore = this.inverseNormalCDF(percentile);
    
    // Convert back to ELO
    const mean = 1200;
    const stdDev = 200;
    const estimatedElo = Math.round(mean + (zScore * stdDev));
    
    return estimatedElo;
  }

  /**
   * Inverse normal CDF (approximation)
   */
  private static inverseNormalCDF(p: number): number {
    // Beasley-Springer-Moro algorithm (approximation)
    const a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637];
    const b = [-8.47351093090, 23.08336743743, -21.06224101826, 3.13082909833];
    const c = [0.3374754822726147, 0.9761690190917186, 0.1607979714918209, 
               0.0276438810333863, 0.0038405729373609, 0.0003951896511919,
               0.0000321767881768, 0.0000002888167364, 0.0000003960315187];
    
    if (p <= 0 || p >= 1) return 0;
    
    const q = p - 0.5;
    
    if (Math.abs(q) <= 0.425) {
      const r = 0.180625 - q * q;
      return q * (((a[3] * r + a[2]) * r + a[1]) * r + a[0]) /
             ((((b[3] * r + b[2]) * r + b[1]) * r + b[0]) * r + 1);
    }
    
    const r = q < 0 ? p : 1 - p;
    const s = Math.sqrt(-Math.log(r));
    const t = s - ((2.515517 + 0.802853 * s + 0.010328 * s * s) /
                 (1 + 1.432788 * s + 0.189269 * s * s + 0.001308 * s * s * s));
    
    return q < 0 ? -t : t;
  }
}

// ============================================
// USAGE EXAMPLES
// ============================================

// Example 1: Calculate ELO change after a game
/*
const eloChange = EloCalculator.calculateEloChange({
  currentElo: 1456,
  accuracy: 80,
  averageTime: 9.5,
  averageOpponentElo: 1200,
  isGuest: false
});
console.log('ELO Change:', eloChange); // e.g., +32
*/

// Example 2: Calculate points for a correct answer
/*
const points = EloCalculator.calculatePoints(
  true,           // isCorrect
  'medium',       // difficulty
  7,              // timeSpent in seconds
  3               // currentStreak
);
console.log('Points earned:', points); // e.g., 145
*/

// Example 3: Get player tier
/*
const tier = EloCalculator.getTier(1850);
console.log(tier); 
// { name: 'Expert', color: 'text-blue-600', icon: '💎', minElo: 1600, maxElo: 1999 }
*/

// Example 4: Calculate rank from ELO
/*
const rank = EloCalculator.calculateRank(1850, 50000);
console.log('Global Rank:', rank); // e.g., #3,456
*/
