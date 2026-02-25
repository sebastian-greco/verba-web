import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DOWNLOAD_URL = 'https://verbaspeech.app/download';
const BUY_URL = 'https://verbaspeech.app/buy';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="min-h-screen pt-14 flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-primary border-primary/40 bg-primary/10 text-xs">
              {t('badge_local')}
            </Badge>
            <Badge variant="outline" className="text-primary border-primary/40 bg-primary/10 text-xs">
              {t('badge_offline')}
            </Badge>
            <Badge variant="outline" className="text-primary border-primary/40 bg-primary/10 text-xs">
              {t('badge_no_account')}
            </Badge>
            <Badge variant="outline" className="text-primary border-primary/40 bg-primary/10 text-xs">
              {t('badge_silicon')}
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            {t('headline')}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            {t('subheadline')}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="font-semibold">
              <a href={DOWNLOAD_URL}>{t('cta_primary')}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={BUY_URL}>{t('cta_secondary')}</a>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground font-mono">{t('note')}</p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-3xl" />
          <Image
            src="/images/hero-visual.jpg"
            alt="Verba speech-to-text"
            width={560}
            height={400}
            className="relative rounded-2xl border border-border/50 shadow-2xl object-cover w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
