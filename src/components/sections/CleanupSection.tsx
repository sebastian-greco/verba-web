import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export default function CleanupSection() {
  const t = useTranslations('cleanup');

  const cleanupFeatures = [
    t('feature_fillers'),
    t('feature_grammar'),
    t('feature_lists'),
    t('feature_styles'),
  ];

  return (
    <section className="py-24 bg-card/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-3xl sm:text-4xl font-bold">{t('headline')}</h2>
            <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/15">
              {t('badge')}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">{t('subheadline')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-card border border-border/50">
            <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">{t('before_label')}</p>
            <p className="text-sm leading-relaxed text-muted-foreground italic">{t('before_text')}</p>
          </div>
          <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20">
            <p className="text-xs font-mono text-primary mb-3 uppercase tracking-wider">{t('after_label')}</p>
            <p className="text-sm leading-relaxed">{t('after_text')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
          {cleanupFeatures.map((feature) => (
            <div key={feature} className="flex gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground font-mono text-center">{t('note')}</p>
      </div>
    </section>
  );
}
