import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { APP_NAME, CONTACT_EMAIL, LICENSE_DEVICES, TRIAL_TRANSCRIPTIONS } from "@/lib/constants";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const contact = (chunks: ReactNode) => (
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
      {chunks}
    </a>
  );
  const values = { devices: LICENSE_DEVICES, transcriptions: TRIAL_TRANSCRIPTIONS, email: CONTACT_EMAIL, contact };

  return (
    <div className="min-h-screen pt-14" lang={locale}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block">
          <span aria-hidden="true">← </span>{APP_NAME}
        </Link>
        <h1 className="text-3xl font-bold mb-2">{t("terms_title")}</h1>
        <p className="text-sm text-muted-foreground mb-12">{t("last_updated")}</p>
        <div className="space-y-8 text-muted-foreground leading-relaxed text-sm">
          {["grant", "trial", "paid", "refund"].map((key) => (
            <section key={key}>
              <h2 className="text-lg font-semibold text-foreground mb-3">{t(`terms.${key}_title`)}</h2>
              <p>{t.rich(`terms.${key}_body`, values)}</p>
            </section>
          ))}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">{t("terms.restrictions_title")}</h2>
            <ul className="list-disc pl-5 space-y-1">
              {["share", "modify", "law"].map((key) => (
                <li key={key}>{t(`terms.restriction_${key}`)}</li>
              ))}
            </ul>
          </section>
          {["warranty", "liability", "changes", "contact"].map((key) => (
            <section key={key}>
              <h2 className="text-lg font-semibold text-foreground mb-3">{t(`terms.${key}_title`)}</h2>
              <p>{t.rich(`terms.${key}_body`, values)}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
