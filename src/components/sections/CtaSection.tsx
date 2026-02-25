import { useTranslations } from 'next-intl';

const DOWNLOAD_URL = 'https://verbaspeech.app/download';

export default function CtaSection() {
  const t = useTranslations('cta_block');

  return (
    <section className="py-24 sm:py-48 border-b border-border bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border border-primary bg-primary/5 p-12 sm:p-24 flex flex-col items-center justify-center text-center">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif leading-[0.9] tracking-tighter text-foreground mb-12 max-w-4xl">
            {t('headline')}
          </h2>
          <a 
            href={DOWNLOAD_URL}
            className="group relative flex items-center justify-between p-6 sm:p-8 bg-primary text-black hover:bg-white transition-none"
          >
            <span className="font-mono text-sm sm:text-base tracking-widest uppercase font-bold mr-8">
              {t('button')}
            </span>
            <span className="font-serif text-3xl">→</span>
          </a>
          <p className="mt-8 text-xs font-mono tracking-widest uppercase text-muted-foreground">
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
}