# Verba — Landing Page Product Brief

> Reference document for all copy, design, and feature decisions on the marketing site.

---

## 1. What Is Verba?

Verba is a **macOS menu bar app** that transcribes your voice to text, instantly, entirely on your machine. No internet. No account. No cloud.

You hold `Fn`, speak, release — and your words appear wherever your cursor is. That's the whole product.

It's the privacy-first alternative to Wispr Flow: same frictionless experience, none of the subscription or cloud dependency.

---

## 2. The Core User

Someone who dictates often — developers, writers, knowledge workers — and is bothered by the idea of their voice being sent to a server. They've looked at Wispr Flow, maybe tried it, but the subscription model or the privacy tradeoff stopped them.

They want **Wispr Flow, but local**.

---

## 3. Primary Differentiator

| | Wispr Flow | Verba |
|---|---|---|
| Price | ~$10–15/month (~$120–180/yr) | **$22 once** |
| Processing | Cloud (audio sent to servers) | **100% on-device** |
| Account | Required | **None** |
| Offline | No | **Yes** |
| Platform | Mac + Windows + iOS | Mac (Apple Silicon) |

The pitch in one line:
> **"Pay once. Own it forever. Your voice never leaves your Mac."**

---

## 4. How It Works (User Flow)

1. **Hold `Fn`** — recording overlay appears instantly
2. **Speak** — in any of 99 languages, naturally
3. **Release `Fn`** — Whisper transcribes (~2–3s for 10s of audio)
4. **Text auto-pastes** — into whatever app is active

Alternative: `Fn+Space` locks recording hands-free. Click `||` to pause. Double-tap `Esc` or click `X` to cancel without processing.

---

## 5. Features (Complete & Accurate)

### Core
- **Push-to-talk** — `Fn` to record, `Fn+Space` for lock (hands-free) mode
- **Auto-paste** — transcribed text lands directly at the cursor, in any app
- **99 languages** — Whisper Large v3 Turbo auto-detects language; no configuration needed
- **Translation mode** — speak in any language, get English output
- **Recording history** — every transcription saved locally in SQLite with timing metadata
- **Microphone selection** — choose any input device from menu bar

### Performance
- **~2–3s transcription** for 10s of audio on Apple Silicon
- **Metal GPU acceleration** — 8x faster than Whisper large-v3 standard
- **Total latency**: ~3–4s end to end (no cleanup), ~4–5s with cleanup

### Smart Cleanup (Optional, Experimental)
- Powered by **Qwen2.5-1.5B** running entirely locally (985MB model)
- Removes filler words: *um, uh, like, you know, basically*
- Fixes grammar and punctuation
- Handles self-corrections (e.g., "no wait, I meant...")
- Requires downloading the model separately; off by default

### Privacy Architecture
- **Zero network calls** during operation — no telemetry, no analytics, nothing
- **All data stays local**: recordings in `~/Library/Application Support/Verba/Recordings/`
- **No account required** — ever
- **Works fully offline** after initial model download

---

## 6. Technical Specs (Exact — Use These, Not Approximations)

| Spec | Value |
|------|-------|
| Platform | macOS 15+ (Sequoia), Apple Silicon only |
| Transcription model | Whisper Large v3 Turbo Q8_0 |
| Model size | 874MB |
| Cleanup model | Qwen2.5-1.5B-Instruct Q8_0 |
| Cleanup model size | 985MB (optional) |
| Languages supported | 99 (auto-detect) |
| Transcription speed | ~2–3s for 10s of audio (M4 Pro) |
| Model download host | Cloudflare R2 CDN (downloads.verbaspeech.app) |
| Data storage | SQLite at `~/Library/Application Support/Verba/` |
| Distribution | Direct (not App Store) — signed + notarized DMG |

---

## 7. Pricing & Trial

### Free Trial
- **50 transcriptions** — usage-based, not time-based
- No credit card, no signup, no time limit
- Trial count stored in macOS Keychain (survives reinstall)
- After trial: soft block — history/settings stay accessible

### Full License
- **~$22 one-time** (exact price TBD, range: $19–25)
- **3 device activations** (work Mac + personal Mac + laptop)
- All minor updates and bugfixes included forever
- 30-day money-back guarantee
- Payment via Polar (handles VAT/tax globally)
- License format: `VERBA_XXXXXXXX`

---

## 8. Tone & Voice

- **Calm confidence** — no hype, no superlatives
- **Specific and honest** — cite real numbers, not marketing fluff
- **Privacy as a value, not a feature** — it's the entire premise
- **Technical but not nerdy** — acknowledge the stack without showing off
- Words to avoid: "revolutionary", "game-changing", "seamless", "powerful", "amazing"
- Reference tone: Linear, Raycast, Clerk — terse, confident, no-nonsense

---

## 9. Sections the Landing Page Must Cover

1. **Hero** — one-line value prop + CTA (download trial)
2. **Demo / How It Works** — the 3-step flow (`Fn` → speak → text appears)
3. **Privacy Architecture** — why local matters; zero cloud dependency
4. **Feature Grid** — full feature list
5. **Smart Cleanup** — before/after example of filler removal
6. **Pricing** — trial vs license, comparison table vs competitors
7. **Download CTA** — final push, repeat trial offer
8. **Footer** — links, legal, contact

---

## 10. Key URLs & Assets

| Resource | Value |
|----------|-------|
| Domain | verbaspeech.app |
| Download | https://verbaspeech.app/download |
| Buy | https://verbaspeech.app/buy |
| Contact | hello@verbaspeech.app |
| App icon | `/public/logo.svg` |
| Privacy policy | /privacy |
| Terms | /terms |
