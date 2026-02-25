import { useTranslations } from 'next-intl';
import Image from 'next/image';

const DOWNLOAD_URL = 'https://verbaspeech.app/download';
const BUY_URL = 'https://verbaspeech.app/buy';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="min-h-screen pt-24 pb-12 flex flex-col justify-between">
      <div className="mx-auto px-4 sm:px-6 w-full grow flex flex-col justify-center max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
          
          <div className="col-span-1 lg:col-span-8 flex flex-col justify-center">
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-9xl leading-[0.9] tracking-tighter text-foreground">
              {t('headline')}
            </h1>
          </div>

          <div className="col-span-1 lg:col-span-4 flex flex-col justify-end pb-2">
            <p className="text-xl sm:text-2xl font-light text-muted-foreground leading-snug mb-8">
              {t('subheadline')}
            </p>

            <div className="flex flex-col gap-0 border border-border">
              <a 
                href={DOWNLOAD_URL} 
                className="group relative flex items-center justify-between p-4 sm:p-6 bg-primary text-black hover:bg-white transition-none border-b border-border"
              >
                <span className="font-mono text-sm tracking-widest uppercase font-bold">
                  {t('cta_primary')}
                </span>
                <span className="font-serif text-2xl">→</span>
              </a>
              <a 
                href={BUY_URL} 
                className="group relative flex items-center justify-between p-4 sm:p-6 bg-background text-foreground hover:bg-foreground hover:text-background transition-none"
              >
                <span className="font-mono text-sm tracking-widest uppercase">
                  {t('cta_secondary')}
                </span>
                <span className="font-serif text-2xl">→</span>
              </a>
            </div>
            
            <p className="mt-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
              {t('note')}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full border-y border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary"></div> {t('badge_local')}
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary"></div> {t('badge_offline')}
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary"></div> {t('badge_no_account')}
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary"></div> {t('badge_silicon')}
          </span>
        </div>
      </div>
    </section>
  );
}