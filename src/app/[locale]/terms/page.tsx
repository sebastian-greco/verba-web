import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal');

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block">
          ← Verba
        </Link>

        <h1 className="text-3xl font-bold mb-2">{t('terms_title')}</h1>
        <p className="text-sm text-muted-foreground mb-12">{t('last_updated')}</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">License Grant</h2>
            <p>
              Verba grants you a personal, non-exclusive, non-transferable license to use Verba on up to
              3 devices that you own or control. This license is for your personal or professional use only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Trial</h2>
            <p>
              Verba includes a free trial of 50 transcriptions. No credit card is required. No account is
              created. After 50 transcriptions, a paid license is required to continue using the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Paid License</h2>
            <p>
              A paid license is a one-time purchase that grants lifetime access to Verba and all future
              updates. The license key is in the format <code className="text-xs font-mono bg-card px-1 py-0.5 rounded">VERBA_XXXXXXXX</code>.
              Licenses are issued through Polar and are non-refundable after the 30-day money-back period.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">30-Day Money-Back Guarantee</h2>
            <p>
              If you are unsatisfied with Verba for any reason, contact us within 30 days of purchase at{' '}
              <a href="mailto:hello@verbaspeech.app" className="text-primary hover:underline">
                hello@verbaspeech.app
              </a>{' '}
              for a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Restrictions</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You may not redistribute, sell, sublicense, or share your license key.</li>
              <li>You may not reverse engineer or modify the app binaries.</li>
              <li>You may not use Verba in violation of applicable laws.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">No Warranty</h2>
            <p>
              Verba is provided &ldquo;as is&rdquo; without warranty of any kind. We do not warrant that the app will
              be error-free or uninterrupted. Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Verba and its developers shall not be liable for any
              indirect, incidental, special, or consequential damages arising from your use of the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Changes to These Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of Verba after changes constitutes
              acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
            <p>
              Questions about these terms? Email us at{' '}
              <a href="mailto:hello@verbaspeech.app" className="text-primary hover:underline">
                hello@verbaspeech.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
