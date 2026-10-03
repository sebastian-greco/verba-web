import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { APP_NAME, CONTACT_EMAIL } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const contact = (chunks: ReactNode) => (
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
      {chunks}
    </a>
  );

  return (
    <div className="min-h-screen pt-14" lang={locale}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block">
          <span aria-hidden="true">← </span>{APP_NAME}
        </Link>
        <h1 className="text-3xl font-bold mb-2">{t("privacy_title")}</h1>
        <p className="text-sm text-muted-foreground mb-12">{t("last_updated")}</p>
        <div className="space-y-8 text-muted-foreground leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">{t("privacy.local_title")}</h2>
            <p>{t("privacy.local_body")}</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">{t("privacy.stored_title")}</h2>
            <p>{t("privacy.stored_body")}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {["stored_audio", "stored_transcripts", "stored_dictionary", "stored_preferences"].map((key) => (
                <li key={key}>{t(`privacy.${key}`)}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">{t("privacy.network_title")}</h2>
            <p>{t("privacy.network_body")}</p>
            <p className="mt-2">{t("privacy.network_license")}</p>
            <p className="mt-2">{t("privacy.network_audio")}</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">{t("privacy.analytics_title")}</h2>
            <p>{t("privacy.analytics_body")}</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">{t("privacy.permissions_title")}</h2>
            <p>{t("privacy.permissions_body")}</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              {["microphone", "accessibility"].map((key) => (
                <li key={key}>
                  <strong className="text-foreground">{t(`privacy.permission_${key}`)}</strong>
                  {" — "}{t(`privacy.permission_${key}_body`)}
                </li>
              ))}
            </ul>
            <p className="mt-2">{t("privacy.permissions_note")}</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">{t("privacy.deletion_title")}</h2>
            <p>{t("privacy.deletion_body")}</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">{t("privacy.contact_title")}</h2>
            <p>{t.rich("privacy.contact_body", { email: CONTACT_EMAIL, contact })}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
