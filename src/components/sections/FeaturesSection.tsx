import { useTranslations } from 'next-intl';

export default function FeaturesSection() {
  const t = useTranslations('features');
  const tCleanup = useTranslations('cleanup');
  
  const features = [
    { titleKey: 'transcription_title', descKey: 'transcription_desc', experimental: false },
    { titleKey: 'languages_title', descKey: 'languages_desc', experimental: false },
    { titleKey: 'push_to_talk_title', descKey: 'push_to_talk_desc', experimental: false },
    { titleKey: 'history_title', descKey: 'history_desc', experimental: false },
    { titleKey: 'metal_title', descKey: 'metal_desc', experimental: false },
    { titleKey: 'translation_title', descKey: 'translation_desc', experimental: false },
    { titleKey: 'cleanup_title', descKey: 'cleanup_desc', experimental: true },
    { titleKey: 'telemetry_title', descKey: 'telemetry_desc', experimental: false },
  ] as const;

  return (
    <section id="features" className="py-24 sm:py-32 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-none tracking-tighter mb-16 sm:mb-24">
          {t('headline')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border">
          {features.map((feature, i) => (
            <div 
              key={feature.titleKey} 
              className={`p-6 sm:p-8 flex flex-col justify-between aspect-square relative border-b border-border ${
                i % 4 !== 3 ? 'lg:border-r' : ''
              } ${i % 2 === 0 ? 'sm:border-r' : ''}`}
            >
              {feature.experimental && (
                <div className="absolute top-6 right-6 px-2 py-1 bg-primary text-black font-mono text-[10px] uppercase tracking-widest">
                  {tCleanup('badge')}
                </div>
              )}
              
              <div className="font-mono text-2xl text-muted-foreground/30">
                / 0{i + 1}
              </div>

              <div>
                <h3 className="font-mono text-lg uppercase tracking-widest mb-4 mt-8">
                  {t(feature.titleKey as any)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(feature.descKey as any)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}