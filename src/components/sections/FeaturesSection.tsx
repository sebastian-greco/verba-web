import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Mic, Globe, Keyboard, History, Zap, Languages, Sparkles, ShieldOff } from 'lucide-react';

export default function FeaturesSection() {
  const t = useTranslations('features');

  const features = [
    { icon: Mic, titleKey: 'transcription_title', descKey: 'transcription_desc', experimental: false },
    { icon: Globe, titleKey: 'languages_title', descKey: 'languages_desc', experimental: false },
    { icon: Keyboard, titleKey: 'push_to_talk_title', descKey: 'push_to_talk_desc', experimental: false },
    { icon: History, titleKey: 'history_title', descKey: 'history_desc', experimental: false },
    { icon: Zap, titleKey: 'metal_title', descKey: 'metal_desc', experimental: false },
    { icon: Languages, titleKey: 'translation_title', descKey: 'translation_desc', experimental: false },
    { icon: Sparkles, titleKey: 'cleanup_title', descKey: 'cleanup_desc', experimental: true },
    { icon: ShieldOff, titleKey: 'telemetry_title', descKey: 'telemetry_desc', experimental: false },
  ] as const;

  const tCleanup = useTranslations('cleanup');

  return (
    <section id="features" className="py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">{t('headline')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.titleKey}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  {feature.experimental && (
                    <Badge className="text-xs bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/15">
                      {tCleanup('badge')}
                    </Badge>
                  )}
                </div>
                <p className="font-semibold text-sm">{t(feature.titleKey)}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{t(feature.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
