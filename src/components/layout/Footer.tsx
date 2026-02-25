import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-black text-white pt-24 sm:pt-48 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="flex flex-col max-w-sm">
            <div className="w-12 h-12 bg-primary mb-8" />
            <h3 className="font-serif text-3xl mb-4 text-foreground">Verba</h3>
            <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16 sm:gap-32">
            <div className="flex flex-col gap-6">
              <p className="font-mono text-xs tracking-widest uppercase text-primary mb-2">
                {t('product')}
              </p>
              <a href="#features" className="font-mono text-sm tracking-widest uppercase text-muted-foreground hover:text-white transition-none">
                {t('features_link')}
              </a>
              <a href="#privacy" className="font-mono text-sm tracking-widest uppercase text-muted-foreground hover:text-white transition-none">
                {t('privacy_link')}
              </a>
              <a href="#pricing" className="font-mono text-sm tracking-widest uppercase text-muted-foreground hover:text-white transition-none">
                {t('pricing_link')}
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <p className="font-mono text-xs tracking-widest uppercase text-primary mb-2">
                {t('legal')}
              </p>
              <Link href="/privacy" className="font-mono text-sm tracking-widest uppercase text-muted-foreground hover:text-white transition-none">
                {t('privacy_policy')}
              </Link>
              <Link href="/terms" className="font-mono text-sm tracking-widest uppercase text-muted-foreground hover:text-white transition-none">
                {t('terms')}
              </Link>
              <a
                href={`mailto:${t('contact_email')}`}
                className="font-mono text-sm tracking-widest uppercase text-muted-foreground hover:text-white transition-none"
              >
                {t('contact_email')}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
            {t('copyright')}
          </p>
          <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
            AESTHETIC: TECHNICAL MONOLITH
          </div>
        </div>
      </div>
    </footer>
  );
}