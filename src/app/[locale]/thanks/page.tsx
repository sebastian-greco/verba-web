import { Polar } from "@polar-sh/sdk";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import LicenseKeyDisplay from "./LicenseKeyDisplay";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

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

    const confirmed = checkout.status === "confirmed" || checkout.status === "succeeded";
    const customerEmail = checkout.customerEmail ?? null;
    const customerId = checkout.customerId ?? null;

    let licenseKey: string | null = null;
    let displayKey: string | null = null;

    if (orgId && benefitId && customerId) {
      try {
        const keysPage = await polar.licenseKeys.list({
          organizationId: orgId,
          benefitId: benefitId,
          limit: 100,
        });
        const match = keysPage.result.items.find((k) => k.customerId === customerId);
        licenseKey = match?.key ?? null;
        displayKey = match?.displayKey ?? null;
      } catch (err) {
        console.error("Failed to fetch license keys:", err);
      }
    }

    return { customerEmail, licenseKey, displayKey, confirmed };
  } catch {
    return { customerEmail: null, licenseKey: null, displayKey: null, confirmed: false };
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

  const { customerEmail, licenseKey, displayKey, confirmed } = await fetchLicenseData(checkout_id);

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
      <main className="flex-grow pt-32 pb-24 px-6 max-w-4xl mx-auto w-full relative z-10">
        <div 
          className="rounded-[2.5rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 relative overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)"
          }}
        >
          {/* Decorative Subtle Accent */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ee7752]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto relative z-10">
            
            {/* Hero Section */}
            <div className="mb-14">
              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-stone-900 mb-5 leading-tight">
                {t("headline")}
              </h1>
              <p className="text-lg text-stone-600 font-medium max-w-md mx-auto">
                {licenseKey
                  ? t("subheadline_ready")
                  : confirmed
                    ? t("subheadline_email")
                    : customerEmail
                      ? t("subheadline_check_email", { email: customerEmail })
                      : t("subheadline_fallback")}
              </p>
            </div>

            {/* License Display Block */}
            {licenseKey && displayKey ? (
              <LicenseKeyDisplay fullKey={licenseKey} displayKey={displayKey} />
            ) : (
              <div className="mb-16 w-full max-w-md mx-auto flex items-start gap-4 bg-[#ee7752]/10 border border-[#ee7752]/20 rounded-2xl p-6 text-left shadow-sm">
                <span className="material-symbols-outlined text-[#ee7752] mt-0.5" style={{ fontSize: 22 }}>
                  mail
                </span>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {t("email_sent_to")}
                  {customerEmail ? (
                    <strong className="text-stone-900 font-bold">{customerEmail}</strong>
                  ) : (
                    t("email_address_fallback")
                  )}
                  {t("email_arrive_time")}
                </p>
              </div>
            )}

            {/* Activation Steps */}
            <div className="w-full max-w-xl text-left">
              <h2 className="text-lg font-bold font-serif text-stone-900 mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-[#ee7752]">check_circle</span>
                {t("how_to_activate")}
              </h2>
              <div className="space-y-8">
                {steps.map((step, i) => {
                  const isLast = i === steps.length - 1;
                  return (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                        isLast 
                          ? "bg-stone-900 text-white" 
                          : "border-2 border-stone-200 text-stone-500 group-hover:border-stone-400"
                      }`}>
                        {i + 1}
                      </div>
                      <p className={`leading-relaxed pt-1 w-full ${isLast ? "text-stone-900 font-medium" : "text-stone-700"}`}>
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer-like Info within Glass */}
            <div className="mt-20 pt-10 border-t border-stone-200/40 w-full grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-stone-400 text-xl">devices</span>
                  <h3 className="font-bold text-stone-900">{t("multi_device")}</h3>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {t("multi_device_desc")}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-stone-400 text-xl">help_outline</span>
                  <h3 className="font-bold text-stone-900">{t("need_help")}</h3>
                </div>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {t.rich("need_help_desc", {
                    support_link: (chunks) => <a href="#" className="text-stone-900 underline decoration-stone-200 hover:decoration-stone-400 underline-offset-4">{chunks}</a>
                  })}
                </p>
              </div>
            </div>
            
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-xs text-stone-400 uppercase tracking-[0.2em] font-bold">
            {t("digital_sanctuary")}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
