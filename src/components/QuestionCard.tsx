import { useState, useEffect } from 'react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  value: string | string[] | undefined;
  onChange: (questionId: string, value: string | string[]) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const [otherValue, setOtherValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Handle "other" option for single/multi select
  useEffect(() => {
    if (typeof value === 'string' && value.startsWith('other:')) {
      setOtherValue(value.slice(6));
    }
  }, [value]);

  const handleSingleSelect = (optionId: string) => {
    if (optionId === 'other') {
      onChange(question.id, otherValue ? `other:${otherValue}` : 'other:');
    } else {
      onChange(question.id, optionId);
      setOtherValue('');
    }
  };

  const handleMultiSelect = (optionId: string) => {
    const currentValue = (value as string[]) || [];
    
    if (optionId === 'other') {
      const hasOther = currentValue.some(v => v.startsWith('other:'));
      if (hasOther) {
        onChange(question.id, currentValue.filter(v => !v.startsWith('other:')));
      } else {
        onChange(question.id, [...currentValue, 'other:']);
      }
    } else {
      if (currentValue.includes(optionId)) {
        onChange(question.id, currentValue.filter(v => v !== optionId));
      } else {
        if (!question.maxSelections || currentValue.length < question.maxSelections) {
          onChange(question.id, [...currentValue, optionId]);
        }
      }
    }
  };

  const handleOtherChange = (newValue: string) => {
    setOtherValue(newValue);
    if (question.type === 'single') {
      onChange(question.id, `other:${newValue}`);
    } else {
      const currentValue = (value as string[]) || [];
      const filtered = currentValue.filter(v => !v.startsWith('other:'));
      if (newValue) {
        onChange(question.id, [...filtered, `other:${newValue}`]);
      } else {
        onChange(question.id, filtered);
      }
    }
  };

  const isSelected = (optionId: string) => {
    if (!value) return false;
    if (Array.isArray(value)) {
      if (optionId === 'other') {
        return value.some(v => v.startsWith('other:'));
      }
      return value.includes(optionId);
    }
    if (optionId === 'other') {
      return typeof value === 'string' && value.startsWith('other:');
    }
    return value === optionId;
  };

  const showOtherInput = question.options?.some(opt => opt.id === 'other');
  const isOtherSelected = Array.isArray(value) 
    ? value.some(v => v.startsWith('other:'))
    : typeof value === 'string' && value.startsWith('other:');

  return (
    <div className="animate-fade-up space-y-6">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <span>{question.sectionEmoji}</span>
          <span className="uppercase tracking-wider text-xs">{question.section}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold leading-tight text-foreground">
          {question.question}
        </h2>
        
        {question.subtitle && (
          <p className="text-sm text-muted-foreground">{question.subtitle}</p>
        )}
      </div>

      {/* Text Input */}
      {question.type === 'text' && (
        <div className="relative">
          <input
            type="text"
            value={(value as string) || ''}
            onChange={(e) => onChange(question.id, e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={question.placeholder}
            className={`w-full rounded-lg border bg-card px-4 py-3.5 text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 ${
              isFocused ? 'border-primary ring-1 ring-primary/30' : 'border-border'
            }`}
          />
        </div>
      )}

      {/* Single Select */}
      {question.type === 'single' && question.options && (
        <div className="grid gap-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSingleSelect(option.id)}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3.5 text-left transition-all duration-200 active:scale-[0.98] ${
                isSelected(option.id)
                  ? 'border-primary bg-primary/10 text-foreground card-glow'
                  : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted'
              }`}
            >
              {option.emoji && <span className="text-lg">{option.emoji}</span>}
              <span className="font-medium text-sm sm:text-base">{option.label}</span>
              {isSelected(option.id) && (
                <span className="ml-auto text-primary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Multi Select */}
      {question.type === 'multi' && question.options && (
        <>
          <div className="grid gap-3">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleMultiSelect(option.id)}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3.5 text-left transition-all duration-200 active:scale-[0.98] ${
                  isSelected(option.id)
                    ? 'border-primary bg-primary/10 text-foreground card-glow'
                    : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted'
                }`}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  isSelected(option.id)
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground/30'
                }`}>
                  {isSelected(option.id) && (
                    <svg className="w-3.5 h-3.5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                {option.emoji && <span className="text-lg">{option.emoji}</span>}
                <span className="font-medium text-sm sm:text-base">{option.label}</span>
              </button>
            ))}
          </div>
          
          {question.maxSelections && (
            <p className="text-xs text-muted-foreground mt-2">
              Pilih maksimal {question.maxSelections} opsi
            </p>
          )}
        </>
      )}

      {/* Other Input for Select */}
      {showOtherInput && isOtherSelected && (
        <div className="mt-3">
          <input
            type="text"
            value={otherValue}
            onChange={(e) => handleOtherChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Tulis jawaban Anda di sini..."
            className={`w-full rounded-lg border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 text-sm ${
              isFocused ? 'border-primary ring-1 ring-primary/30' : 'border-primary/40'
            }`}
            autoFocus
          />
        </div>
      )}
    </div>
  );
}