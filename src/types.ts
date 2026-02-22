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