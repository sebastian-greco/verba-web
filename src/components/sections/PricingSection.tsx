import { useTranslations } from 'next-intl';

const DOWNLOAD_URL = 'https://verbaspeech.app/download';
const BUY_URL = 'https://verbaspeech.app/buy';

export default function PricingSection() {
  const t = useTranslations('pricing');

  return (
    <section id="pricing" className="py-24 sm:py-32 border-b border-border bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif leading-[0.9] tracking-tighter text-foreground max-w-2xl">
            {t('headline')}
          </h2>
          <p className="text-xl font-mono uppercase tracking-widest text-primary max-w-sm">
            {t('subheadline')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
          
          <div className="flex flex-col border-b md:border-b-0 md:border-r border-border">
            <div className="p-8 sm:p-12 flex-grow flex flex-col">
              <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-12">
                {t('trial_label')}
              </div>
              <div className="text-6xl sm:text-8xl font-serif tracking-tighter mb-4">
                0$
              </div>
              <div className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-12">
                50 transcriptions
              </div>
              
              <ul className="flex flex-col gap-4 font-mono text-sm uppercase tracking-wider text-muted-foreground flex-grow">
                <li className="flex items-start gap-4">
                  <span className="text-primary mt-0.5">■</span>
                  {t('trial_desc')}
                </li>
              </ul>
            </div>
            <a 
              href={DOWNLOAD_URL}
              className="p-6 border-t border-border bg-background text-foreground hover:bg-foreground hover:text-background transition-none text-center font-mono text-sm tracking-widest uppercase"
            >
              {t('trial_cta')}
            </a>
          </div>

          <div className="flex flex-col bg-primary text-black">
            <div className="p-8 sm:p-12 flex-grow flex flex-col relative">
              <div className="absolute top-8 right-8 font-mono text-xs tracking-widest uppercase border border-black px-2 py-1">
                {t('comparison_title')}
              </div>
              
              <div className="font-mono text-xs tracking-widest uppercase opacity-70 mb-12">
                {t('paid_label')}
              </div>
              <div className="text-6xl sm:text-8xl font-serif tracking-tighter mb-4 flex items-baseline gap-4">
                {t('paid_price')}
                <span className="text-2xl font-mono uppercase tracking-widest opacity-50">
                  {t('paid_period')}
                </span>
              </div>
              <div className="font-mono text-sm uppercase tracking-widest opacity-70 mb-12">
                3 devices · all updates
              </div>
              
              <ul className="flex flex-col gap-4 font-mono text-sm uppercase tracking-wider flex-grow">
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 opacity-50">■</span>
                  {t('paid_desc')}
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 opacity-50">■</span>
                  {t('guarantee')}
                </li>
              </ul>
            </div>
            <a 
              href={BUY_URL}
              className="p-6 border-t border-black bg-black text-primary hover:bg-white hover:text-black transition-none text-center font-mono text-sm tracking-widest uppercase font-bold"
            >
              {t('paid_cta')}
            </a>
          </div>

        </div>

        <div className="mt-24 border border-border">
          <div className="grid grid-cols-3 border-b border-border bg-border/20">
            <div className="p-4 sm:p-6 font-mono text-xs tracking-widest uppercase text-muted-foreground"></div>
            <div className="p-4 sm:p-6 font-mono text-xs tracking-widest uppercase text-muted-foreground border-l border-border">{t('comparison_others_label')}</div>
            <div className="p-4 sm:p-6 font-mono text-xs tracking-widest uppercase text-primary border-l border-border font-bold">Verba</div>
          </div>
          {[
            [t('comparison_row_price'), t('comparison_others_price'), t('comparison_verba_price')],
            [t('comparison_row_cloud'), t('comparison_others_cloud'), t('comparison_verba_cloud')],
            [t('comparison_row_account'), t('comparison_others_account'), t('comparison_verba_account')],
          ].map(([label, other, verba], i) => (
            <div key={i} className="grid grid-cols-3 border-b border-border last:border-0">
              <div className="p-4 sm:p-6 font-mono text-xs tracking-widest uppercase text-muted-foreground flex items-center">
                {label}
              </div>
              <div className="p-4 sm:p-6 border-l border-border font-serif text-lg sm:text-xl text-muted-foreground flex items-center">
                <span className="text-destructive mr-4 font-mono text-sm">×</span> {other}
              </div>
              <div className="p-4 sm:p-6 border-l border-border font-serif text-lg sm:text-xl text-foreground flex items-center">
                <span className="text-primary mr-4 font-mono text-sm">●</span> {verba}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}