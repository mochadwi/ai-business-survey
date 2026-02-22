import type { SurveyData, LeadScore, LeadCategory, ScoreBreakdown } from '../types/survey';

// Scoring weights for each question
const SCORING_RULES = {
  // Q1: Company Size
  company_size: {
    startup: 5,
    smb: 10,
    mid: 15,
    enterprise: 20,
  },
  
  // Q4: AI Adoption
  ai_adoption: {
    exploration: 5,
    sporadic: 10,
    partial: 15,
    operational: 20,
    strategic: 25,
  },
  
  // Q6: Priority
  priority: {
    efficiency: 10,
    revenue: 15,
    both: 25,
    unclear: 5,
  },
  
  // Q9: Budget
  budget: {
    none: 0,
    pilot: 5,
    small: 10,
    serious: 20,
    transformation: 30,
  },
  
  // Q10: Decision Authority
  decision_maker: {
    self: 20,
    recommend: 15,
    committee: 10,
    finance: 10,
    education: 5,
  },
  
  // Q8: Time Savings (Time Wasted)
  time_wasted: {
    low: 5,
    medium: 10,
    high: 15,
    critical: 20,
  },
} as const;

// Lead category thresholds
const CATEGORY_THRESHOLDS = {
  hot: { min: 90, max: 100 },
  warm: { min: 70, max: 89 },
  qualified: { min: 50, max: 69 },
  nurture: { min: 0, max: 49 },
} as const;

/**
 * Calculate lead score based on survey responses
 */
export function calculateLeadScore(surveyData: SurveyData): LeadScore {
  const breakdown: ScoreBreakdown = {
    companySize: getScore('company_size', surveyData.company_size),
    aiAdoption: getScore('ai_adoption', surveyData.ai_adoption),
    priority: getScore('priority', surveyData.priority),
    budget: getScore('budget', surveyData.budget),
    decisionAuthority: getScore('decision_maker', surveyData.decision_maker),
    timeSavings: getScore('time_wasted', surveyData.time_wasted),
  };

  const totalScore = Object.values(breakdown).reduce((sum, score) => sum + score, 0);
  
  return {
    totalScore,
    category: determineCategory(totalScore),
    breakdown,
  };
}

/**
 * Get score for a specific question answer
 */
function getScore(
  questionId: keyof typeof SCORING_RULES,
  answer: string | string[] | undefined
): number {
  if (!answer || Array.isArray(answer)) return 0;
  
  const rules = SCORING_RULES[questionId];
  return rules[answer as keyof typeof rules] ?? 0;
}

/**
 * Determine lead category based on total score
 */
function determineCategory(score: number): LeadCategory {
  if (score >= CATEGORY_THRESHOLDS.hot.min) return 'hot';
  if (score >= CATEGORY_THRESHOLDS.warm.min) return 'warm';
  if (score >= CATEGORY_THRESHOLDS.qualified.min) return 'qualified';
  return 'nurture';
}

/**
 * Get human-readable category label
 */
export function getCategoryLabel(category: LeadCategory): string {
  const labels: Record<LeadCategory, string> = {
    hot: 'Hot Lead',
    warm: 'Warm Lead',
    qualified: 'Qualified Lead',
    nurture: 'Nurture Lead',
  };
  return labels[category];
}

/**
 * Get category description
 */
export function getCategoryDescription(category: LeadCategory): string {
  const descriptions: Record<LeadCategory, string> = {
    hot: 'Immediate follow-up required - High intent and budget',
    warm: 'Priority nurture - Strong interest, needs education',
    qualified: 'Standard nurture - Moderate fit, long-term potential',
    nurture: 'Long-term education - Early stage, build awareness',
  };
  return descriptions[category];
}

/**
 * Get recommended action based on lead category
 */
export function getRecommendedAction(category: LeadCategory): string {
  const actions: Record<LeadCategory, string> = {
    hot: 'Schedule consultation within 24 hours',
    warm: 'Send educational content + soft pitch within 48 hours',
    qualified: 'Add to standard nurture sequence',
    nurture: 'Send value-first content, no sales pitch',
  };
  return actions[category];
}

/**
 * Get score breakdown for display
 */
export function getScoreBreakdownDisplay(breakdown: ScoreBreakdown): Array<{
  label: string;
  score: number;
  maxScore: number;
}> {
  return [
    { label: 'Company Size', score: breakdown.companySize, maxScore: 20 },
    { label: 'AI Adoption', score: breakdown.aiAdoption, maxScore: 25 },
    { label: 'Priority', score: breakdown.priority, maxScore: 25 },
    { label: 'Budget', score: breakdown.budget, maxScore: 30 },
    { label: 'Decision Authority', score: breakdown.decisionAuthority, maxScore: 20 },
    { label: 'Time Savings', score: breakdown.timeSavings, maxScore: 20 },
  ];
}

// Maximum possible score: 140 points
export const MAX_SCORE = 140;

/**
 * Calculate score percentage (for display)
 */
export function calculateScorePercentage(score: number): number {
  return Math.round((score / MAX_SCORE) * 100);
}
