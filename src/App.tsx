import { useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { LandingPage } from './components/LandingPage';
import { SuccessPage } from './components/SuccessPage';
import { surveyQuestions } from './data/questions';
import { useSurveySubmit } from './hooks/useSurveySubmit';
import type { SurveyData } from './types/survey';

function App() {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({});
  
  const { isSubmitting, submitError, leadScore, submitSurvey } = useSurveySubmit();

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = useCallback((questionId: string, value: string | string[]) => {
    setSurveyData(prev => ({
      ...prev,
      [questionId]: value
    }));
  }, []);

  const handleNext = async () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Submit survey data
      const result = await submitSurvey(surveyData);
      
      if (result.success || !result.error) {
        // Show success even if partial submission worked
        setCompleted(true);
      }
      // Error will be shown via the submitError state from hook
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentQ = surveyQuestions[currentQuestion];
  const isAnswered = () => {
    const value = surveyData[currentQ.id];
    if (!value) return false;
    if (Array.isArray(value)) return value.length > 0;
    return typeof value === 'string' && value.trim().length > 0;
  };

  if (!started) {
    return <LandingPage onStart={handleStart} />;
  }

  if (completed) {
    return <SuccessPage leadScore={leadScore} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-foreground">
              AI Business Assessment
            </h1>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {surveyQuestions.length}
            </span>
          </div>
          <div className="mt-3">
            <ProgressBar 
              current={currentQuestion} 
              total={surveyQuestions.length} 
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center py-8 px-4">
          <div className="w-full max-w-2xl">
            {submitError && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                <p className="font-medium">Terjadi kesalahan:</p>
                <p className="text-sm mt-1">{submitError}</p>
                <p className="text-sm mt-2">Silakan coba lagi atau hubungi tim kami.</p>
              </div>
            )}
            
            <QuestionCard
              question={currentQ}
              value={surveyData[currentQ.id]}
              onChange={handleAnswer}
            />
          </div>
        </div>

        <footer className="sticky bottom-0 bg-background/80 backdrop-blur-md border-t border-border px-4 py-4">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-3 rounded-lg border border-border bg-muted text-muted-foreground font-medium transition-all hover:bg-muted/80 active:scale-[0.98] disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isAnswered() || isSubmitting}
              className="ml-auto flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  {currentQuestion === surveyQuestions.length - 1 ? 'Kirim' : 'Lanjut'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;