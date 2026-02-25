import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { HardDrive, UserX, WifiOff } from 'lucide-react';

export default function PrivacySection() {
  const t = useTranslations('privacy_section');

  const cards = [
    { icon: HardDrive, title: t('local_storage_title'), desc: t('local_storage_desc') },
    { icon: UserX, title: t('no_account_title'), desc: t('no_account_desc') },
    { icon: WifiOff, title: t('offline_title'), desc: t('offline_desc') },
  ];

  return (
    <section id="privacy" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('headline')}</h2>
              <p className="text-lg text-muted-foreground">{t('subheadline')}</p>
            </div>

            <div className="flex flex-col gap-4">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="flex gap-4 p-4 rounded-xl bg-card border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">{card.title}</p>
                      <p className="text-sm text-muted-foreground">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <blockquote className="border-l-2 border-primary pl-4">
              <p className="text-lg font-medium text-primary italic">{t('quote')}</p>
            </blockquote>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-3xl" />
            <Image
              src="/images/privacy-visual.jpg"
              alt="Privacy architecture"
              width={560}
              height={420}
              className="relative rounded-2xl border border-border/50 object-cover w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
