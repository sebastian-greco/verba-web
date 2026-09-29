import { createPolar } from "@polar-sh/sdk/2026-10";

/** The versioned SDK sets Polar-Version: 2026-10 on every request. */
export function createPolarClient(
  accessToken: string,
  environment: "sandbox" | "production" = process.env.POLAR_ENV === "sandbox" ? "sandbox" : "production",
) {
  return createPolar({
    accessToken,
    environment,
    timeout: 15,
  });
}

export async function fetchLicenseData(checkoutId: string) {
  const accessToken = process.env.POLAR_ACCESS_TOKEN;
  const orgId = process.env.POLAR_ORG_ID;
  const benefitId = process.env.POLAR_BENEFIT_ID;
  const fallback = { customerEmail: null, licenseKey: null, displayKey: null, confirmed: false };

  if (!accessToken) return fallback;

  try {
    const polar = createPolarClient(accessToken);
    const checkout = await polar.checkouts.get(checkoutId);
    const confirmed = checkout.status === "confirmed" || checkout.status === "succeeded";
    const customerEmail = checkout.customer_email ?? null;
    const customerId = checkout.customer_id ?? null;
    let licenseKey: string | null = null;
    let displayKey: string | null = null;

    if (orgId && benefitId && customerId) {
      try {
        const keysPage = await polar.licenseKeys.list({
          organization_id: orgId,
          benefit_id: benefitId,
          limit: 100,
        });
        const match = keysPage.items.find((key) => key.customer_id === customerId);
        licenseKey = match?.key ?? null;
        displayKey = match?.display_key ?? null;
      } catch {
        // Keep the existing email fallback if the benefit is not available yet.
      }
    }

    return { customerEmail, licenseKey, displayKey, confirmed };
  } catch {
    return fallback;
  }
}
