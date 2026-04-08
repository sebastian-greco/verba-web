import { Polar } from "@polar-sh/sdk";
import { NextRequest, NextResponse } from "next/server";
import { CHECKOUT_SUCCESS_URL } from "@/lib/constants";

/**
 * GET /mac-license
 *
 * Serverless checkout entry point for the Verba Mac app and website CTA.
 * Creates a Polar checkout session and 302-redirects to the hosted payment page.
 *
 * Product ID is resolved entirely server-side from POLAR_PRODUCT_ID secret —
 * it never appears in frontend code, build output, or the request URL.
 *
 * Cloudflare: runs inside the same Worker as the rest of the site via
 * @opennextjs/cloudflare. No separate Worker needed.
 */
export async function GET(_req: NextRequest): Promise<Response> {
  const accessToken = process.env.POLAR_ACCESS_TOKEN;
  const productId = process.env.POLAR_PRODUCT_ID;

  if (!accessToken || !productId) {
    return new Response("Checkout not configured", { status: 503 });
  }

  const server = process.env.POLAR_ENV === "sandbox" ? "sandbox" : "production";
  const polar = new Polar({ accessToken, server });

  const checkout = await polar.checkouts.create({
    products: [productId],
    successUrl: CHECKOUT_SUCCESS_URL,
  });

  return NextResponse.redirect(checkout.url);
}
