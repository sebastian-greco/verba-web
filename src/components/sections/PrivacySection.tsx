import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function PrivacySection() {
  const t = useTranslations('privacy_section');

  const cards = [
    { num: 'I', title: t('local_storage_title'), desc: t('local_storage_desc') },
    { num: 'II', title: t('no_account_title'), desc: t('no_account_desc') },
    { num: 'III', title: t('offline_title'), desc: t('offline_desc') },
  ];

  return (
    <section id="privacy" className="py-24 sm:py-32 border-b border-border bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif leading-[0.9] tracking-tighter text-foreground max-w-2xl">
            {t('headline')}
          </h2>
          <p className="text-xl font-mono uppercase tracking-widest text-primary max-w-sm">
            {t('subheadline')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-border">
          
          <div className="col-span-1 lg:col-span-6 border-b lg:border-b-0 lg:border-r border-border flex flex-col">
            {cards.map((card, i) => (
              <div 
                key={card.title} 
                className={`p-8 sm:p-10 flex flex-col sm:flex-row gap-6 sm:gap-12 items-start ${
                  i !== cards.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="font-serif text-4xl sm:text-5xl text-muted-foreground shrink-0 w-12">
                  {card.num}
                </div>
                <div>
                  <h3 className="font-mono text-lg sm:text-xl uppercase tracking-widest mb-4">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
            <div className="p-8 sm:p-10 bg-primary text-black flex-grow flex items-center">
              <p className="text-2xl sm:text-3xl font-serif leading-none tracking-tight">
                "{t('quote')}"
              </p>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-6 relative aspect-square lg:aspect-auto bg-card">
            <Image
              src="/images/privacy-visual.jpg"
              alt="Privacy architecture diagram"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center grayscale contrast-125 opacity-80 mix-blend-luminosity"
            />
            <div className="absolute inset-0 border border-border/20 m-4 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}