import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const DOWNLOAD_URL = 'https://verbaspeech.app/download';
const BUY_URL = 'https://verbaspeech.app/buy';

export default function PricingSection() {
  const t = useTranslations('pricing');

  const trialFeatures = [
    t('trial_desc'),
  ];

  const paidFeatures = [
    t('paid_desc'),
    t('guarantee'),
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('headline')}</h2>
          <p className="text-lg text-muted-foreground">{t('subheadline')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          <div className="flex flex-col p-6 rounded-2xl bg-card border border-border/50">
            <p className="text-sm font-medium text-muted-foreground mb-2">{t('trial_label')}</p>
            <p className="text-4xl font-bold mb-1">Free</p>
            <p className="text-sm text-muted-foreground mb-6">50 transcriptions</p>
            <div className="flex flex-col gap-2 mb-8 flex-1">
              {trialFeatures.map((f) => (
                <div key={f} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full">
              <a href={DOWNLOAD_URL}>{t('trial_cta')}</a>
            </Button>
          </div>

          <div className="flex flex-col p-6 rounded-2xl bg-card border-2 border-primary/50 relative">
            <div className="absolute -top-3 left-6">
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded font-medium">
                {t('comparison_title')}
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-2">{t('paid_label')}</p>
            <div className="flex items-baseline gap-1 mb-1">
              <p className="text-4xl font-bold">{t('paid_price')}</p>
              <p className="text-sm text-muted-foreground">{t('paid_period')}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">3 devices · all updates</p>
            <div className="flex flex-col gap-2 mb-8 flex-1">
              {paidFeatures.map((f) => (
                <div key={f} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <Button asChild className="w-full font-semibold">
              <a href={BUY_URL}>{t('paid_cta')}</a>
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl border border-border/50 overflow-hidden">
            <div className="grid grid-cols-3 bg-card/50 text-xs font-medium text-muted-foreground px-4 py-3 border-b border-border/50">
              <span></span>
              <span className="text-center">{t('comparison_others_label')}</span>
              <span className="text-center text-primary">Verba</span>
            </div>
            {[
              [t('comparison_others_price'), t('comparison_verba_price')],
              [t('comparison_others_cloud'), t('comparison_verba_cloud')],
              [t('comparison_others_account'), t('comparison_verba_account')],
            ].map(([other, verba], i) => (
              <div key={i} className="grid grid-cols-3 px-4 py-3 border-b last:border-0 border-border/30 text-sm">
                <span></span>
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
                  <X className="w-3.5 h-3.5 text-destructive shrink-0" />
                  <span className="text-center text-xs">{other}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-foreground">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-center text-xs">{verba}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
