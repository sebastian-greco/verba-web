# OpenNext Starter

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Read the documentation at https://opennext.js.org/cloudflare.

## Develop

Run the Next.js development server:

```bash
npm run dev
# or similar package manager command
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Preview

Preview the application locally on the Cloudflare runtime:

```bash
npm run preview
# or similar package manager command
```

## Deploy

Deploy the application to Cloudflare:

```bash
npm run deploy
# or similar package manager command
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Polar API version

Server-side checkout creation and the purchase confirmation page share
`src/lib/polar.ts`. It imports the released `@polar-sh/sdk/2026-10` client, which
sends `Polar-Version: 2026-10` on every request. The package is pinned to SDK
`1.0.0`; the package version and API version are separate. `POLAR_ENV=sandbox`
still selects the sandbox server. Product, organization, benefit, and access
token configuration remain in the existing environment variables.

Polar's [API changelog](https://polar.sh/docs/changelog/api) says `2026-10`
becomes Current on October 1, 2026. Its checkout contracts are unchanged from
`2026-04`; license responses add nullable `member_id` and `member` fields.
The SDK migration also accommodates nullable customer `avatar_url` values that
the previous `0.47.0` response parser rejected. The new SDK uses snake_case
models and returns list items directly rather than under `.result`.
See [versioning](https://polar.sh/docs/api-reference/2026-04/versioning),
the [TypeScript SDK](https://polar.sh/docs/integrate/sdk/typescript), and the
[official SDK release](https://github.com/polarsource/polar/releases/tag/sdk%2F1.0.0).

Run `bun run test:polar` for offline mock tests of the actual checkout route,
checkout lookup, license lookup and email fallbacks. Fixtures are synthetic
responses derived from the public `2026-10` OpenAPI schemas and include nullable
avatar/member fields. These tests never create real checkouts or access user data.
After deployment, confirm the `Polar-Version` response header during a sandbox
purchase before testing a production purchase.

This repository contains no Polar webhook handler or endpoint provisioning.
The unused `@polar-sh/nextjs` dependency does not configure an endpoint.
Dashboard or external webhook endpoints must be audited separately: their
`api_version` is independent of the request header. Future events use the
endpoint's selected version; redelivered events retain their original version.
The October version removes the `secret` argument for endpoint creation/update;
Polar generates new secrets. Existing secrets are not changed here. The changelog
also documents the September 8 signing cutoff; existing legacy secrets retain
their signing behavior, and regeneration requires a matching handler update.

The macOS repository's `LicenseManager.polarRequest` sends activate, validate,
and deactivate requests directly to Polar with its own `Polar-Version: 2026-04`
pin. The site's `2026-10` pin does not affect these requests. The published
`2026-04` and `2026-10` schemas preserve those request contracts, and the new
nullable member fields do not affect Swift's existing decoded fields. Review
the macOS pin separately against Polar's version lifecycle; no macOS source
was edited by this website change.

Review the API pin before each quarterly release. Under Polar's documented
lifecycle, Current becomes Deprecated at the next release and is removed at the
following release; an unsupported or removed version returns `404`. The pin
prevents an unplanned default switch but does not make a contract permanent.
