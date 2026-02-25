import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal');

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block">
          ← Verba
        </Link>

        <h1 className="text-3xl font-bold mb-2">{t('privacy_title')}</h1>
        <p className="text-sm text-muted-foreground mb-12">{t('last_updated')}</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">No Data Collection</h2>
            <p>
              Verba does not collect, transmit, store, or process any personal data on external servers.
              Your voice recordings, transcriptions, and usage data never leave your Mac.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">What Stays on Your Device</h2>
            <p>All data Verba creates is stored locally on your Mac:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Audio recordings: <code className="text-xs font-mono bg-card px-1 py-0.5 rounded">~/Library/Application Support/Verba/recordings/</code></li>
              <li>Transcription database: <code className="text-xs font-mono bg-card px-1 py-0.5 rounded">~/Library/Application Support/Verba/recordings.db</code></li>
              <li>AI models: <code className="text-xs font-mono bg-card px-1 py-0.5 rounded">~/Library/Application Support/Verba/models/</code></li>
              <li>License activation: stored in macOS Keychain, never on external servers</li>
              <li>App preferences: macOS UserDefaults (local)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">License Validation</h2>
            <p>
              The only network interaction Verba performs is license key validation through Polar (our payment
              processor) when you activate a license. This check confirms your license key is valid. License
              status is cached locally for up to 7 days so Verba works fully offline.
              No audio, transcriptions, or personal data are sent during this process.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">No Analytics or Telemetry</h2>
            <p>
              Verba contains zero analytics, crash reporting, or telemetry code. There are no third-party
              SDKs that phone home. We have no visibility into how you use the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">System Permissions</h2>
            <p>Verba requests the following macOS permissions:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-foreground">Microphone</strong> — required for audio recording. Audio is processed locally.</li>
              <li><strong className="text-foreground">Accessibility</strong> — required to paste transcribed text into other apps.</li>
            </ul>
            <p className="mt-2">These permissions are used solely for core app functionality. No data is shared externally.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Data Deletion</h2>
            <p>
              You can delete your recordings at any time from within the app. Uninstalling Verba and removing
              <code className="text-xs font-mono bg-card px-1 py-0.5 rounded mx-1">~/Library/Application Support/Verba/</code>
              removes all locally stored data completely.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
            <p>
              Questions about privacy? Email us at{' '}
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
