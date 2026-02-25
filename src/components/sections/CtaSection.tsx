import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

const DOWNLOAD_URL = 'https://verbaspeech.app/download';

export default function CtaSection() {
  const t = useTranslations('cta_block');

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-primary/10 border border-primary/20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">{t('headline')}</h2>
          <Button asChild size="lg" className="font-semibold text-base px-8">
            <a href={DOWNLOAD_URL}>{t('button')}</a>
          </Button>
          <p className="mt-6 text-xs text-muted-foreground font-mono">{t('note')}</p>
        </div>
      </div>
    </section>
  );
}
