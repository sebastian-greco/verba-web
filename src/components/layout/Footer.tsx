import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Verba" width={24} height={24} />
              <span className="font-semibold">Verba</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">{t('tagline')}</p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">{t('product')}</p>
            <div className="flex flex-col gap-2">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('features_link')}
              </a>
              <a href="#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('privacy_link')}
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('pricing_link')}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">{t('legal')}</p>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('privacy_policy')}
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('terms')}
              </Link>
              <a
                href={`mailto:${t('contact_email')}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('contact_email')}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
