import { createPolarClient } from "@/lib/polar";
import { PolarClientError, PolarNetworkError, PolarServerError } from "@polar-sh/sdk";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /mac-license
 *
 * Serverless checkout entry point for the Verba Mac app and website CTA.
 * Creates a Polar checkout session and redirects to the hosted payment page.
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

  try {
    const polar = createPolarClient(accessToken);

    const checkout = await polar.checkouts.create({
      products: [productId],
      success_url: `${_req.nextUrl.origin}/thanks?checkout_id={CHECKOUT_ID}`,
    });

    return NextResponse.redirect(checkout.url);
  } catch (error) {
    // SDK messages may include API response bodies. Log only known error types
    // and HTTP status so credentials and customer data cannot enter Worker logs.
    console.error("Polar checkout creation failed", {
      type: error instanceof PolarClientError ? "PolarClientError"
        : error instanceof PolarNetworkError ? "PolarNetworkError"
        : error instanceof PolarServerError ? "PolarServerError"
        : "UnexpectedError",
      status: error instanceof PolarClientError ? error.statusCode : null,
    });
    return new Response("Checkout is currently unavailable. Please try again later.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
