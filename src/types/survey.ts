// Extended survey types with lead scoring

export interface Option {
  id: string;
  label: string;
  emoji?: string;
}

export interface Question {
  id: string;
  section: string;
  sectionEmoji: string;
  question: string;
  subtitle?: string;
  type: 'single' | 'multi' | 'text';
  options?: Option[];
  placeholder?: string;
  required: boolean;
  maxSelections?: number;
}

export type SurveyData = Record<string, string | string[]>;

// Lead scoring types
export interface LeadScore {
  totalScore: number;
  category: LeadCategory;
  breakdown: ScoreBreakdown;
}

export type LeadCategory = 
  | 'hot'      // 90-100: Hot Lead (Immediate follow-up)
  | 'warm'     // 70-89: Warm Lead (Priority nurture)
  | 'qualified' // 50-69: Qualified Lead (Standard nurture)
  | 'nurture';  // <50: Nurture Lead (Long-term education)

export interface ScoreBreakdown {
  companySize: number;
  aiAdoption: number;
  priority: number;
  budget: number;
  decisionAuthority: number;
  timeSavings: number;
}

// Airtable record types
export interface AirtableRecord {
  fields: {
    // Contact info
    Email: string;
    WhatsApp: string;
    
    // Company profile
    CompanySize: string;
    Position: string;
    Industry: string;
    
    // Current state
    AIAdoption: string;
    Challenges: string;
    
    // Priority & pain points
    Priority: string;
    Workflows: string;
    TimeWasted: string;
    
    // Budget & decision making
    Budget: string;
    DecisionMaker: string;
    
    // Solution needs
    Deliverables: string;
    EngagementModel: string;
    Benefit: string;
    
    // Lead scoring
    LeadScore: number;
    LeadCategory: string;
    
    // Metadata
    SubmittedAt: string;
    Source: string;
  };
}

// Email types
export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export interface SurveySubmissionResult {
  success: boolean;
  airtableRecordId?: string;
  leadScore?: LeadScore;
  emailSent?: boolean;
  error?: string;
}
