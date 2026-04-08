import { Polar } from "@polar-sh/sdk";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import LicenseKeyDisplay from "./LicenseKeyDisplay";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { DOWNLOAD_URL } from "@/lib/constants";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'thanks' });

  return {
    title: t("headline"),
    description: t("subheadline_ready"),
    robots: { index: false },
  };
}

async function fetchLicenseData(checkoutId: string) {
  const accessToken = process.env.POLAR_ACCESS_TOKEN;
  const orgId = process.env.POLAR_ORG_ID;
  const benefitId = process.env.POLAR_BENEFIT_ID;

  if (!accessToken) return { customerEmail: null, licenseKey: null, confirmed: false };

  try {
    const server = process.env.POLAR_ENV === "sandbox" ? "sandbox" : "production";
    const polar = new Polar({ accessToken, server });

    const checkout = await polar.checkouts.get({ id: checkoutId });

    // Only proceed if checkout is confirmed/completed
    const confirmed = checkout.status === "confirmed" || checkout.status === "succeeded";
    const customerEmail = checkout.customerEmail ?? null;
    const customerId = checkout.customerId ?? null;

    let licenseKey: string | null = null;

    if (orgId && benefitId && customerId) {
      // Fetch license keys for this org+benefit and find the one for this customer
      const keysPage = await polar.licenseKeys.list({
        organizationId: orgId,
        benefitId: benefitId,
        limit: 100,
      });
      const match = keysPage.result.items.find((k) => k.customerId === customerId);
      licenseKey = match?.displayKey ?? null;
    }

    return { customerEmail, licenseKey, confirmed };
  } catch {
    return { customerEmail: null, licenseKey: null, confirmed: false };
  }
}

export default async function ThanksPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ checkout_id?: string; customer_session_token?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("thanks");
  
  const { checkout_id } = await searchParams;
  if (!checkout_id) notFound();

  const { customerEmail, licenseKey, confirmed } = await fetchLicenseData(checkout_id);

  const steps = [
    t("step_1"),
    t("step_2"),
    t("step_3"),
    t("step_4"),
    t("step_5"),
  ];

  return (
    <>
      <Nav locale={locale} />
      <main className="min-h-screen flex items-center justify-center px-6 py-32 relative z-10">
        <div className="w-full max-w-xl">

          {/* Success badge */}
          <div className="flex justify-center mb-10">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center bg-white/5 border border-[#ff9f0a]/30 shadow-[0_0_48px_rgba(255,159,10,0.15)]"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff9f0a]">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-black text-center text-foreground mb-4 font-serif leading-tight">
            {t("headline")}
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-10 leading-relaxed font-serif">
            {licenseKey
              ? t("subheadline_ready")
              : confirmed
                ? t("subheadline_email")
                : customerEmail
                  ? t("subheadline_check_email", { email: customerEmail })
                  : t("subheadline_fallback")}
          </p>

          {/* License key block */}
          {licenseKey ? (
            <section className="bg-white/5 border border-white/10 rounded-[28px] p-8 mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#ff9f0a]/80 mb-1">
                {t("license_key_label")}
              </p>
              <LicenseKeyDisplay licenseKey={licenseKey} />
            </section>
          ) : (
            <div className="bg-[#ff9f0a]/10 border border-[#ff9f0a]/20 rounded-[28px] p-6 mb-8 flex items-start gap-4">
              <span className="material-symbols-outlined text-[#ff9f0a] mt-0.5" style={{ fontSize: 22 }}>
                mail
              </span>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {t("email_sent_to")}
                {customerEmail ? (
                  <strong className="text-foreground">{customerEmail}</strong>
                ) : (
                  t("email_address_fallback")
                )}
                {t("email_arrive_time")}
              </p>
            </div>
          )}

          {/* Activation steps */}
          <section className="bg-white/5 border border-white/10 rounded-[28px] p-8 mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#ff9f0a]/80 mb-6">
              {t("how_to_activate")}
            </p>
            <ol className="space-y-5">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mt-0.5 bg-[#ff9f0a]/10 border border-[#ff9f0a]/20 text-[#ff9f0a]">
                    {i + 1}
                  </span>
                  <span className="text-foreground/90 text-base leading-relaxed font-serif">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Helpful note */}
          <p className="text-sm text-center text-muted-foreground mb-8 leading-relaxed px-2">
            {t("helpful_note")}
          </p>

          {/* Download CTA */}
          <div className="flex justify-center mb-12">
            <a
              href={DOWNLOAD_URL}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-base transition-all duration-200 bg-white text-black hover:bg-neutral-200 hover:scale-105 active:scale-95"
            >
              <Download size={18} strokeWidth={2.5} />
              {t("download_cta")}
            </a>
          </div>

          {/* Already closed this page */}
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">{t("already_closed")}</span>{" "}
              {t("open_from_menu")}
              <span className="font-mono text-xs bg-white/10 px-2 py-0.5 rounded text-foreground">
                {t("activate_license")}
              </span>
              .
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
