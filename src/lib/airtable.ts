import type { SurveyData, AirtableRecord, LeadScore } from '../types/survey';

const AIRTABLE_API_BASE = 'https://api.airtable.com/v0';

// Get environment variables
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY || '';
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID || '';
const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Survey Responses';

/**
 * Check if Airtable is configured
 */
export function isAirtableConfigured(): boolean {
  return Boolean(AIRTABLE_API_KEY && AIRTABLE_BASE_ID);
}

/**
 * Convert survey data to Airtable record format
 */
function transformToAirtableRecord(
  surveyData: SurveyData,
  leadScore: LeadScore
): AirtableRecord {
  // Helper to safely get string value
  const getString = (key: string): string => {
    const value = surveyData[key];
    return Array.isArray(value) ? value.join(', ') : (value || '');
  };

  // Helper to get array value as comma-separated string
  const getArray = (key: string): string => {
    const value = surveyData[key];
    return Array.isArray(value) ? value.join(', ') : (value || '');
  };

  return {
    fields: {
      // Contact info
      Email: getString('email'),
      WhatsApp: getString('whatsapp'),
      
      // Company profile
      CompanySize: getString('company_size'),
      Position: getString('position'),
      Industry: getString('industry'),
      
      // Current state
      AIAdoption: getString('ai_adoption'),
      Challenges: getArray('challenges'),
      
      // Priority & pain points
      Priority: getString('priority'),
      Workflows: getArray('workflows'),
      TimeWasted: getString('time_wasted'),
      
      // Budget & decision making
      Budget: getString('budget'),
      DecisionMaker: getString('decision_maker'),
      
      // Solution needs
      Deliverables: getArray('deliverables'),
      EngagementModel: getString('engagement_model'),
      Benefit: getString('benefit'),
      
      // Lead scoring
      LeadScore: leadScore.totalScore,
      LeadCategory: leadScore.category,
      
      // Metadata
      SubmittedAt: new Date().toISOString(),
      Source: 'AI Business Survey Web App',
    },
  };
}

/**
 * Submit survey response to Airtable
 */
export async function submitToAirtable(
  surveyData: SurveyData,
  leadScore: LeadScore
): Promise<{ success: boolean; recordId?: string; error?: string }> {
  if (!isAirtableConfigured()) {
    console.warn('Airtable not configured - skipping submission');
    return { 
      success: false, 
      error: 'Airtable not configured. Please set VITE_AIRTABLE_API_KEY and VITE_AIRTABLE_BASE_ID environment variables.' 
    };
  }

  try {
    const record = transformToAirtableRecord(surveyData, leadScore);
    
    const url = `${AIRTABLE_API_BASE}/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Airtable API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    
    return {
      success: true,
      recordId: data.id,
    };
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Test Airtable connection
 */
export async function testAirtableConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  if (!isAirtableConfigured()) {
    return {
      success: false,
      message: 'Airtable not configured. Please set VITE_AIRTABLE_API_KEY and VITE_AIRTABLE_BASE_ID.',
    };
  }

  try {
    const url = `${AIRTABLE_API_BASE}/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}?maxRecords=1`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Airtable API error: ${response.status} ${response.statusText}`
      );
    }

    return {
      success: true,
      message: 'Successfully connected to Airtable!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to connect to Airtable',
    };
  }
}
