import { useTranslations } from 'next-intl';
import { Keyboard, Mic, CheckCircle } from 'lucide-react';

export default function DemoSection() {
  const t = useTranslations('demo');

  const steps = [
    { icon: Keyboard, label: t('step_hold') },
    { icon: Mic, label: t('step_speak') },
    { icon: CheckCircle, label: t('step_done') },
  ];

  return (
    <section id="demo" className="py-24 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">{t('headline')}</h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex sm:flex-row items-center">
                <div className="flex flex-col items-center gap-4 px-8 py-6 rounded-2xl bg-card border border-border/50 min-w-[160px]">
                  <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-center">{step.label}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden sm:block text-muted-foreground/40 text-2xl mx-3">→</div>
                )}
                {i < steps.length - 1 && (
                  <div className="sm:hidden text-muted-foreground/40 text-2xl my-2">↓</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
