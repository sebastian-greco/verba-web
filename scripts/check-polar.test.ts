import { afterEach, beforeEach, describe, expect, mock, spyOn, test } from "bun:test";
import { NextRequest } from "next/server";
import { GET } from "@/app/mac-license/route";
import { createPolarClient, fetchLicenseData } from "@/lib/polar";
import fixtures from "./fixtures/polar-2026-10.json";

// Synthetic responses derived from Polar's published 2026-10 OpenAPI schemas.
// No access tokens, real customers, or network requests are used by these tests.
const originalFetch = globalThis.fetch;
const envKeys = ["POLAR_ACCESS_TOKEN", "POLAR_PRODUCT_ID", "POLAR_ORG_ID", "POLAR_BENEFIT_ID", "POLAR_ENV"] as const;
const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
let requests: Request[];
let responseStatus: number;
let failLicenseLookup: boolean;
let checkoutResponse: typeof fixtures.checkout;
let failFetch: boolean;
let checkoutErrorLog: ReturnType<typeof spyOn>;

beforeEach(() => {
  requests = [];
  responseStatus = 200;
  failLicenseLookup = false;
  failFetch = false;
  checkoutErrorLog = spyOn(console, "error").mockImplementation(() => {});
  checkoutResponse = structuredClone(fixtures.checkout);
  process.env.POLAR_ACCESS_TOKEN = "test-access-token";
  process.env.POLAR_PRODUCT_ID = "test-product";
  process.env.POLAR_ORG_ID = "test-organization";
  process.env.POLAR_BENEFIT_ID = "test-benefit";
  delete process.env.POLAR_ENV;
  globalThis.fetch = mock(async (input: string | URL | Request, init?: RequestInit) => {
    const request = new Request(input, init);
    requests.push(request);
    if (failFetch) throw new DOMException("Private upstream failure details", "TimeoutError");
    const isLicenseLookup = new URL(request.url).pathname === "/v1/license-keys/";
    const status = isLicenseLookup && failLicenseLookup ? 503 : responseStatus;
    return Response.json(status >= 400 ? { detail: "Test failure" } : isLicenseLookup ? fixtures.licenseKeys : checkoutResponse, {
      status,
      headers: { "Polar-Version": "2026-10" },
    });
  }) as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  checkoutErrorLog.mockRestore();
  for (const key of envKeys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

function expectPinnedRequests(host: string) {
  for (const request of requests) {
    expect(new URL(request.url).hostname).toBe(host);
    expect(request.headers.get("Polar-Version")).toBe("2026-10");
    expect(request.headers.get("Authorization")).toBe("Bearer test-access-token");
  }
}

describe("Polar 2026-10 integration", () => {
  test.each([undefined, "sandbox"])("checkout redirects using the same product and success URL (environment %s)", async (environment) => {
    if (environment) process.env.POLAR_ENV = environment;
    const response = await GET(new NextRequest("https://verbaspeech.app/mac-license"));
    expect(response.status).toBe(307);
    expect(response.headers.get("Location")).toBe(fixtures.checkout.url);
    expect(requests).toHaveLength(1);
    expect(requests[0].method).toBe("POST");
    expect(new URL(requests[0].url).pathname).toBe("/v1/checkouts/");
    expect(await requests[0].json()).toEqual({
      products: ["test-product"],
      success_url: "https://verbaspeech.app/thanks?checkout_id={CHECKOUT_ID}",
    });
    expectPinnedRequests(environment === "sandbox" ? "sandbox-api.polar.sh" : "api.polar.sh");
  });

  test("checkout lookup and license list retain customer matching with nullable avatar and member fields", async () => {
    expect(fixtures.licenseKeys.items[0].customer.avatar_url).toBeNull();
    expect(fixtures.licenseKeys.items[0].member_id).toBeNull();
    expect(fixtures.licenseKeys.items[0].member).toBeNull();
    expect(await fetchLicenseData(fixtures.checkout.id)).toEqual({
      customerEmail: fixtures.checkout.customer_email,
      licenseKey: fixtures.licenseKeys.items[0].key,
      displayKey: fixtures.licenseKeys.items[0].display_key,
      confirmed: true,
    });
    expect(requests).toHaveLength(2);
    expect(new URL(requests[0].url).pathname).toBe(`/v1/checkouts/${fixtures.checkout.id}`);
    const licenseUrl = new URL(requests[1].url);
    expect(licenseUrl.pathname).toBe("/v1/license-keys/");
    expect(licenseUrl.searchParams.get("organization_id")).toBe("test-organization");
    expect(licenseUrl.searchParams.get("benefit_id")).toBe("test-benefit");
    expect(licenseUrl.searchParams.get("limit")).toBe("100");
    expectPinnedRequests("api.polar.sh");
  });

  test("license lookup failure preserves the email fallback", async () => {
    failLicenseLookup = true;
    expect(await fetchLicenseData(fixtures.checkout.id)).toEqual({
      customerEmail: fixtures.checkout.customer_email,
      licenseKey: null,
      displayKey: null,
      confirmed: true,
    });
  });

  test("keys belonging to a different checkout customer are not displayed", async () => {
    checkoutResponse.customer_id = "another-customer";
    expect((await fetchLicenseData(fixtures.checkout.id)).licenseKey).toBeNull();
  });

  test("missing checkout configuration makes no requests", async () => {
    delete process.env.POLAR_PRODUCT_ID;
    expect((await GET(new NextRequest("https://verbaspeech.app/mac-license"))).status).toBe(503);
    delete process.env.POLAR_ACCESS_TOKEN;
    expect(await fetchLicenseData(fixtures.checkout.id)).toEqual({ customerEmail: null, licenseKey: null, displayKey: null, confirmed: false });
    expect(requests).toHaveLength(0);
  });

  test("invalid Polar credentials return an uncached unavailable response and safe diagnostics", async () => {
    responseStatus = 401;
    const response = await GET(new NextRequest("https://verbaspeech.app/mac-license"));
    expect(response.status).toBe(503);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("Location")).toBeNull();
    expect(await response.text()).toBe("Checkout is currently unavailable. Please try again later.");
    expect(checkoutErrorLog).toHaveBeenCalledWith("Polar checkout creation failed", {
      type: "PolarClientError",
      status: 401,
    });
    expect(requests).toHaveLength(1);
  });

  test("Polar network timeouts return unavailable without logging upstream details", async () => {
    failFetch = true;
    const response = await GET(new NextRequest("https://verbaspeech.app/mac-license"));
    expect(response.status).toBe(503);
    expect(checkoutErrorLog).toHaveBeenCalledWith("Polar checkout creation failed", {
      type: "PolarNetworkError",
      status: null,
    });
    expect(JSON.stringify(checkoutErrorLog.mock.calls)).not.toContain("Private upstream failure details");
    expect(requests).toHaveLength(1);
  });

  test("unsupported API responses fail instead of displaying license data", async () => {
    responseStatus = 404;
    await expect(createPolarClient("test-access-token").checkouts.get(fixtures.checkout.id)).rejects.toThrow();
    expect(await fetchLicenseData(fixtures.checkout.id)).toEqual({ customerEmail: null, licenseKey: null, displayKey: null, confirmed: false });
    expectPinnedRequests("api.polar.sh");
  });
});
