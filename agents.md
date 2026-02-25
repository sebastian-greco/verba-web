# Verba Web — Agent Guidelines

## Role
This repo contains the marketing website for **Verba**, a privacy-first local speech-to-text macOS app. These guidelines apply to all AI agents working on this codebase.

## Stack (Non-Negotiable)
- **Next.js 16.1.6** (App Router only, no Pages Router)
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.js`)
- **shadcn/ui** (`new-york` style, Tailwind v4)
- **next-intl 4.x** (`localePrefix: 'always'`, 6 locales: en/es/it/fr/de/nl)
- **bun** as package manager
- **@opennextjs/cloudflare 1.x** for deployment

## Project Structure
```
src/app/[locale]/       ← all pages live here
src/components/sections/ ← landing page sections
src/components/layout/  ← Nav, Footer
src/i18n/               ← routing.ts, request.ts, navigation.ts
src/proxy.ts            ← next-intl middleware (Next.js 16 uses proxy.ts)
messages/               ← translation files (en/es/it/fr/de/nl)
public/                 ← static assets (logo.svg, images/)
```

## Critical Rules

### Never
- Do NOT create `tailwind.config.js` — Tailwind v4 is CSS-first
- Do NOT use `middleware.ts` — Next.js 16 uses `proxy.ts`
- Do NOT use `print()` or `console.log` for debugging
- Do NOT hardcode prices or URLs in component code — use translation keys or constants
- Do NOT add cloud dependencies or analytics

### Always
- Run `bun run build` after significant changes to verify compilation
- Use `@/` path alias for all internal imports
- Use `setRequestLocale(locale)` in every `[locale]/page.tsx` for static rendering
- Use OKLCH colors in CSS (not HSL or hex for theme variables)
- Keep all i18n keys in sync — after editing `en.json`, update all other language files

### Commit Pattern
- Commit after each phase completes
- Message format: `feat: <what>` / `chore: <what>` / `fix: <what>`
- Run `bun run build` before committing

## i18n Guidelines
- Keys use `section.element` naming (e.g., `hero.cta_primary`)
- All string values must exist in all 6 language files
- Run `bun run test:i18n` to validate completeness
- German expands ~35% vs English — design all UI with `min-width` on buttons

## Design Direction
- Dark-primary theme (deep charcoal background)
- Brand accent: warm amber/copper
- Typography: Geist Sans (body), Geist Mono (code/technical)
- Tone: calm confidence — specific, honest, no hype words
- Sections: Nav, Hero, Demo, Privacy Architecture, Feature Grid, Pricing, Smart Cleanup, Download CTA, Footer

## App Facts (for copy accuracy)
- App name: **Verba**
- Domain: verbaspeech.app
- Platform: macOS 15+, Apple Silicon only
- Trial: **50 transcriptions** (no time limit, no credit card, no account)
- License: ~$22 one-time, 3 devices, perpetual
- Transcription model: Whisper Large v3 Turbo Q8_0 (874MB)
- Cleanup model: Qwen2.5-1.5B-Instruct Q8_0 (985MB, optional)
- Hotkey: `Fn` to record, `Fn+Space` to lock
- Speed: ~2–3s for 10s of audio on Apple Silicon
- 99 languages supported, auto-detection

## Testing
```bash
bun run build          # must pass before committing
bun run test:i18n      # validates all translation files
bun run dev            # local development
bun run preview        # Cloudflare workerd local preview
```
