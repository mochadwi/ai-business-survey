import { CheckCircle, Calendar, FileText, Gift, Loader2, AlertCircle } from 'lucide-react';
import type { LeadScore } from '../types/survey';
import { getCategoryLabel, getCategoryDescription, getScoreBreakdownDisplay } from '../lib/leadScoring';

interface SuccessPageProps {
  leadScore?: LeadScore | null;
  emailSent?: boolean;
  error?: string | null;
}

export function SuccessPage({ 
  leadScore, 
  emailSent = false,
  error 
}: SuccessPageProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hot': return 'from-red-500 to-orange-500';
      case 'warm': return 'from-pink-500 to-rose-500';
      case 'qualified': return 'from-blue-500 to-cyan-500';
      case 'nurture': return 'from-gray-500 to-slate-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getCategoryBgColor = (category: string) => {
    switch (category) {
      case 'hot': return 'bg-red-50 border-red-200 text-red-800';
      case 'warm': return 'bg-pink-50 border-pink-200 text-pink-800';
      case 'qualified': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'nurture': return 'bg-gray-50 border-gray-200 text-gray-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center space-y-6 animate-scale-in">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/15 p-6">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Terima Kasih!
          </h2>
          
          <p className="text-muted-foreground">
            Assessment Anda telah berhasil dikirim. Tim kami akan menganalisis data Anda dan menghubungi Anda dalam waktu 1-2 hari kerja.
          </p>
        </div>

        {/* Lead Score Card */}
        {leadScore && (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <p className="font-semibold text-foreground text-center text-lg">
              Hasil Assessment AI Readiness Anda
            </p>
            
            {/* Score Circle */}
            <div className="flex justify-center">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getCategoryColor(leadScore.category)} flex items-center justify-center shadow-lg`}>
                <div className="w-28 h-28 rounded-full bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-foreground">{leadScore.totalScore}</span>
                  <span className="text-xs text-muted-foreground">/ 140 pts</span>
                </div>
              </div>
            </div>

            {/* Category Badge */}
            <div className={`inline-block px-4 py-2 rounded-full border font-semibold text-sm ${getCategoryBgColor(leadScore.category)}`}>
              {getCategoryLabel(leadScore.category)}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground">
              {getCategoryDescription(leadScore.category)}
            </p>

            {/* Score Breakdown */}
            <div className="space-y-2 pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground text-left">Detail Skor:</p>
              {getScoreBreakdownDisplay(leadScore.breakdown).map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground text-left flex-1">{item.label}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                    />
                  </div>
                  <span className="text-foreground font-medium w-12 text-right">{item.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Messages */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-yellow-800">Perhatian</p>
              <p className="text-xs text-yellow-700">{error}</p>
            </div>
          </div>
        )}

        {emailSent && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-sm text-green-800">
              ✅ Email konfirmasi telah dikirim ke inbox Anda
            </p>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4 text-left">
          <p className="font-semibold text-foreground text-center">
            Langkah Selanjutnya:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Analisis Data</p>
                <p className="text-xs text-muted-foreground">Tim kami menganalisis kebutuhan AI spesifik untuk bisnis Anda</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Jadwalkan Konsultasi</p>
                <p className="text-xs text-muted-foreground">Konsultasi gratis 30 menit dengan AI specialist</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Gift className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Terima Laporan</p>
                <p className="text-xs text-muted-foreground">AI Readiness Report & rekomendasi implementasi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p>Ada pertanyaan? Hubungi kami:</p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="mailto:hello@aibusiness.id" 
              className="text-primary hover:underline"
            >
              hello@aibusiness.id
            </a>
            <span>•</span>
            <a 
              href="https://wa.me/628xxxxxxxxxx" 
              className="text-primary hover:underline"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Kembali ke Halaman Awal
        </button>
      </div>
    </div>
  );
}

// Loading component for submission state
export function SubmittingPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <Loader2 className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Mengirim Assessment...
          </h2>
          <p className="text-muted-foreground text-sm">
            Mohon tunggu sebentar, kami sedang memproses data Anda
          </p>
        </div>
      </div>
    </div>
  );
}
