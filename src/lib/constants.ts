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
export const BUY_URL = `https://${APP_DOMAIN}/buy`;
export const CONTACT_EMAIL = `hello@${APP_DOMAIN}`;
