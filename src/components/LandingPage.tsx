import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  const benefits = [
    'Identifikasi proses yang bisa di-automatisasi',
    'Temukan potensi penghematan biaya operasional',
    'Dapatkan roadmap implementasi AI yang terukur',
    'Konsultasi gratis dengan AI specialist',
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-4 py-4 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="font-semibold text-foreground">AI Business Assessment</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto w-full space-y-8 animate-fade-up">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              <span>Assessment Gratis — Waktu 5 Menit</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground">
              Tingkatkan Daya Saing Bisnis Anda dengan{' '}
              <span className="text-primary">Implementasi AI</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Temukan potensi efisiensi dan pertumbuhan yang tersembunyi dalam operasional harian Anda melalui assessment komprehensif ini.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
            <p className="font-medium text-foreground text-center">
              Apa yang akan Anda dapatkan:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={onStart}
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg transition-all active:scale-[0.98] hover:bg-primary/90 shadow-lg shadow-primary/25"
            >
              Mulai Assessment Gratis
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <p className="text-sm text-muted-foreground">
              Tidak ada komitmen. Data Anda aman & confidential.
            </p>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Sudah membantu 50+ UKM & Korporasi</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Konsultasi Gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Data Confidential</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}