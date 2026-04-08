/**
 * Verba — product constants.
 * This is the single source of truth for pricing and key product facts.
 * Edit here and it propagates everywhere: components, i18n interpolations, etc.
 */

// ─── Pricing ────────────────────────────────────────────────────────────────

/** Numeric price in euros, used for display and calculations. */
export const PRICE_AMOUNT = 25;

/** Currency symbol */
export const PRICE_CURRENCY = "€";

/** Formatted price string, e.g. "€25" */
export const PRICE = `${PRICE_CURRENCY}${PRICE_AMOUNT}`;

/** Number of devices covered by one license */
export const LICENSE_DEVICES = 3;

// ─── Trial ───────────────────────────────────────────────────────────────────

/** Number of free transcriptions in trial */
export const TRIAL_TRANSCRIPTIONS = 50;

// ─── App ─────────────────────────────────────────────────────────────────────

export const APP_NAME = "Verba";
export const APP_DOMAIN = "verbaspeech.app";
export const DOWNLOAD_URL = `https://${APP_DOMAIN}/download`;
export const CONTACT_EMAIL = `hello@${APP_DOMAIN}`;

// ─── Polar / Checkout ────────────────────────────────────────────────────────

/** Checkout entry point — used by website CTAs and Mac app. Product ID is resolved server-side. */
export const BUY_URL = `https://${APP_DOMAIN}/mac-license`;

/** Redirected to after a successful Polar checkout ({CHECKOUT_ID} is replaced by Polar) */
export const CHECKOUT_SUCCESS_URL = `https://${APP_DOMAIN}/thanks?checkout_id={CHECKOUT_ID}`;
