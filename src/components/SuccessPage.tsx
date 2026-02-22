import { CheckCircle, Calendar, FileText, Gift } from 'lucide-react';

export function SuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-8 animate-scale-in">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/15 p-6">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Terima Kasih!
          </h2>
          
          <p className="text-muted-foreground">
            Assessment Anda telah berhasil dikirim. Tim kami akan menganalisis data Anda dan menghubungi Anda dalam waktu 1-2 hari kerja.
          </p>
        </div>

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