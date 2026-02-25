import { useTranslations } from 'next-intl';

export default function CleanupSection() {
  const t = useTranslations('cleanup');
  
  const cleanupFeatures = [
    t('feature_fillers'),
    t('feature_grammar'),
    t('feature_lists'),
    t('feature_styles'),
  ];

  return (
    <section className="py-24 sm:py-32 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="inline-block px-2 py-1 bg-primary text-black font-mono text-xs uppercase tracking-widest w-fit mb-4">
              {t('badge')}
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif leading-[0.9] tracking-tighter text-foreground max-w-2xl">
              {t('headline')}
            </h2>
          </div>
          <p className="text-xl font-mono uppercase tracking-widest text-primary max-w-sm">
            {t('subheadline')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border bg-card">
          <div className="p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-border flex flex-col">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              {t('before_label')}
            </div>
            <p className="font-serif text-2xl sm:text-4xl leading-tight text-muted-foreground line-through decoration-destructive decoration-2 flex-grow">
              {t('before_text')}
            </p>
          </div>
          <div className="p-8 sm:p-12 bg-primary text-black flex flex-col">
            <div className="font-mono text-xs uppercase tracking-widest mb-6 opacity-70">
              {t('after_label')}
            </div>
            <p className="font-serif text-2xl sm:text-4xl leading-tight flex-grow">
              {t('after_text')}
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border">
          {cleanupFeatures.map((feature, i) => (
            <div 
              key={i} 
              className={`p-6 sm:p-8 flex items-center gap-4 ${
                i % 4 !== 3 ? 'lg:border-r border-border' : ''
              } ${i % 2 === 0 ? 'sm:border-r border-border' : ''} ${
                i < 2 ? 'border-b border-border lg:border-b-0' : ''
              }`}
            >
              <div className="w-2 h-2 bg-primary rounded-none shrink-0" />
              <p className="font-mono text-sm tracking-widest uppercase text-muted-foreground leading-snug">
                {feature}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-16 text-xs font-mono tracking-widest uppercase text-muted-foreground text-center">
          {t('note')}
        </p>

      </div>
    </section>
  );
}