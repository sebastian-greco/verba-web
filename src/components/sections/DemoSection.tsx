import { useTranslations } from 'next-intl';

export default function DemoSection() {
  const t = useTranslations('demo');

  const steps = [
    { label: t('step_hold'), num: '01' },
    { label: t('step_speak'), num: '02' },
    { label: t('step_done'), num: '03' },
  ];

  return (
    <section id="demo" className="py-24 sm:py-32 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif leading-none tracking-tighter mb-16 sm:mb-24 max-w-3xl">
          {t('headline')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-border">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`p-8 sm:p-12 flex flex-col justify-between aspect-square ${
                i !== steps.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-border' : ''
              }`}
            >
              <div className="font-mono text-5xl sm:text-7xl tracking-tighter text-muted-foreground opacity-50">
                {step.num}
              </div>
              <p className="text-xl sm:text-2xl font-mono uppercase tracking-tight text-foreground mt-8">
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}