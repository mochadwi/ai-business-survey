import { useState, useCallback } from 'react';
import type { SurveyData, SurveySubmissionResult, LeadScore } from '../types/survey';
import { calculateLeadScore } from '../lib/leadScoring';
import { submitToAirtable } from '../lib/airtable';
import { sendLeadEmail } from '../lib/email';

interface UseSurveySubmitReturn {
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  leadScore: LeadScore | null;
  airtableRecordId: string | null;
  emailSent: boolean;
  submitSurvey: (data: SurveyData) => Promise<SurveySubmissionResult>;
  reset: () => void;
}

/**
 * Hook for handling survey submission with lead scoring, Airtable, and email
 */
export function useSurveySubmit(): UseSurveySubmitReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [leadScore, setLeadScore] = useState<LeadScore | null>(null);
  const [airtableRecordId, setAirtableRecordId] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const submitSurvey = useCallback(async (
    data: SurveyData
  ): Promise<SurveySubmissionResult> => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    setLeadScore(null);
    setAirtableRecordId(null);
    setEmailSent(false);

    try {
      // Step 1: Calculate lead score
      const score = calculateLeadScore(data);
      setLeadScore(score);
      console.log('Lead score calculated:', score);

      // Step 2: Submit to Airtable
      const airtableResult = await submitToAirtable(data, score);
      
      if (!airtableResult.success) {
        console.warn('Airtable submission issue:', airtableResult.error);
        // Continue even if Airtable fails - we still want to show results
      } else {
        setAirtableRecordId(airtableResult.recordId || null);
        console.log('Submitted to Airtable:', airtableResult.recordId);
      }

      // Step 3: Send follow-up email
      const email = typeof data.email === 'string' ? data.email : '';
      let emailSuccess = false;
      
      if (email) {
        const emailResult = await sendLeadEmail(email, score.category, score.totalScore);
        emailSuccess = emailResult.success;
        setEmailSent(emailResult.success);
        console.log('Email sent:', emailResult.success);
      }

      // Step 4: Mark as successful (even if some services failed)
      setSubmitSuccess(true);

      return {
        success: true,
        airtableRecordId: airtableResult.recordId,
        leadScore: score,
        emailSent: emailSuccess,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Survey submission error:', error);
      setSubmitError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(false);
    setLeadScore(null);
    setAirtableRecordId(null);
    setEmailSent(false);
  }, []);

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    leadScore,
    airtableRecordId,
    emailSent,
    submitSurvey,
    reset,
  };
}
