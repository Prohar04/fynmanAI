# Feynman AI — Complete UI Design Prompt (v2)
### Full-Stack Visual Design with Doctor Strange Portal, Animated Pages & Unique Identity

> Hand this entire document to Claude or any design AI to generate high-fidelity PNG mockups for every page of Feynman AI. Each mockup should be 1440×900 at 2× retina resolution. Annotate all animation behaviors inline.

---

## 0. The Brief

**Feynman AI** is an elite AI-powered learning platform. The user learns by *teaching* — they speak, the AI probes, gaps are found, mastery is measured. It is not an EdTech toy. It is a **cognitive operating system**.

The design language must be **extraordinary, unprecedented, and alive**. Every page animates. Every interaction has weight. Nothing looks like any existing product. Think: if Christopher Nolan and a NASA interaction designer co-directed a web app.

---

## 1. Brand Identity — Logo

### The ψ Mark (Psi — pronounced "sigh")

The logo is not a wordmark. It is a **living sigil**.

**Construction:**
- Base: The Greek letter `ψ` (psi — symbol of quantum wave function and psychology simultaneously)
- The three vertical strokes of ψ are rendered as **light trails** — as if drawn by a particle moving at speed
- The curves are not static lines but gradient strokes: `violet → indigo → transparent` with a faint glow bloom at the tip
- The whole mark sits inside an invisible circle boundary (no visible container)
- At rest: the tip of the ψ has a single pixel-bright dot that **slowly pulses** (opacity 60% → 100% → 60%, 3s ease-in-out loop)
- On hover/load: the three strokes **draw themselves** in sequence (stroke-dashoffset animation, 0.6s each, staggered 0.15s)

**Wordmark:**
- Text: `feynman` (all lowercase)
- Font: geometric mono, weight 300, letter-spacing `0.18em`
- Color: `#e7e0ed` at 90% opacity
- Placed to the right of the ψ mark, vertically centered
- `AI` suffix: weight 700, `#c0c1ff`, same size — creating `feynman**AI**`

**Logo variants:**
- Full (ψ + feynmanAI): Navigation, loading screens
- Mark only (ψ): Favicon, avatar, loading spinner
- Inverted (white on dark): Footer

---

## 2. Global Design System

### 2.1 Color Tokens

| Token | Hex | Purpose |
|---|---|---|
| `--void` | `#060410` | Absolute background — deepest black with violet undertone |
| `--surface` | `#0b0917` | Primary page surface |
| `--raised` | `#110f1e` | Cards, panels |
| `--elevated` | `#1a1730` | Modals, sidebars, overlays |
| `--rim` | `#ffffff08` | Ultra-subtle border |
| `--rim-active` | `#c0c1ff30` | Focused / active border |
| `--violet` | `#c0c1ff` | Primary accent |
| `--violet-mid` | `#8083ff` | Hover, gradient midpoint |
| `--violet-deep` | `#4f52e8` | Active fill, portal core |
| `--violet-ultra` | `#2d30c8` | Portal center singularity |
| `--spark` | `#ffd700` | Portal spark particles (golden-white) |
| `--cold` | `#a0d4ff` | Secondary cool accent |
| `--text-on` | `#ede8f5` | Primary text |
| `--text-dim` | `#8880a0` | Secondary text |
| `--text-ghost` | `#4a4560` | Hint / tertiary text |
| `--success` | `#4dffa8` | Green success |
| `--danger` | `#ff4d6d` | Red danger |
| `--warn` | `#ffb84d` | Amber warning |

### 2.2 Typography Scale

| Role | Size | Weight | Style |
|---|---|---|---|
| Hero XL | 88–96px | 800 | tight tracking, gradient text |
| Hero contrast | 88–96px | 200 | same line as above, `--text-dim` |
| Section title | 48–56px | 700 | `--text-on` |
| Card title | 22–26px | 600 | `--text-on` |
| Body | 16px | 400 | `--text-dim`, 1.7 line-height |
| Label mono | 11–12px | 400 | ALL CAPS, `0.2em` tracking, `--text-ghost` |
| Caption | 13px | 400 | `--text-dim` |

Font stack: `"Inter Variable", "SF Pro Display", system-ui` for body. `"JetBrains Mono", "Fira Code"` for mono labels.

### 2.3 Spatial System

- Grid: 12-col, 1280px max-width, 24px gutters
- Base unit: 8px
- Radii: `6px` (buttons/inputs), `12px` (cards), `24px` (large cards), `999px` (pills)
- Z-layers: Background → Content → Overlay → Portal → Modal

### 2.4 Global Animation Principles

Every page obeys these rules:

- **Entrance:** Elements enter via `translateY(24px) opacity(0) → translateY(0) opacity(1)`, staggered 80ms between children. Duration: 500ms, `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Hover lift:** Cards: `translateY(-4px) + box-shadow grow`. Duration: 200ms ease.
- **Border glow:** On focus/hover: `box-shadow: 0 0 0 1px --rim-active, 0 0 24px 0 #8083ff18`. Duration: 150ms.
- **Page transitions:** `opacity: 0 → 1` over 400ms with a subtle `blur(4px) → blur(0)` (page-level fade-in).
- **Ambient motion:** Floating orbs on dark pages drift slowly (`translateY ±20px`, 8–12s ease-in-out infinite alternate). Never jarring.
- **Cursor trail:** On the landing page only: a faint violet comet-tail follows the cursor (10–15 particles, fading opacity, 60fps).

---

## 3. Landing Page — Complete Redesign

### Overview

The landing page has **four acts**:
1. **The Portal** — Hero section with Doctor Strange dimensional rift
2. **The Subjects** — Scrolling section: topics + how Feynman AI helps each
3. **The Voice** — Voice assistant animation showcase
4. **The Footer**

The TopNav floats over all sections.

---

### TOPNAV (floating, always visible)

- Height: 60px
- Background: `rgba(6, 4, 16, 0.7)` + `backdrop-filter: blur(24px) saturate(180%)`
- Left: feynmanAI logo (full variant)
- Center (desktop only): Ghost nav links — `[Method]` `[Subjects]` `[Pricing]` `[Research]`
- Right: `[Sign In]` (ghost, 14px) + `[Start Free →]` (violet pill button, 14px bold)
- Bottom border: `1px solid rgba(255,255,255,0.05)`
- **Scroll behavior:** On scroll past 80px — background darkens to `rgba(6,4,16,0.95)`, shadow intensifies. Smooth 300ms transition.
- **Entrance animation:** Slides down from `translateY(-20px) opacity(0)` on page load, 600ms delay.

---

### ACT 1 — THE PORTAL (Hero Section)
**Full viewport height (100vh). The most important section.**

#### 3.1 Overall Composition

The page is `#060410` — near-total blackness. The entire hero lives in this void. At the center is the Portal. Everything orbits it. Text exists in the margins.

#### 3.2 The Doctor Strange Portal — Detailed Spec

**THIS IS THE CENTERPIECE. Design it with maximum creativity.**

The portal is a **dimensional rift** — not a simple circle. It is a tear in reality through which knowledge pours. Build it from these layers (bottom to top):

**Layer 0 — Event Horizon Shadow:**
- A pure black circle, `520px` diameter
- `box-shadow: 0 0 120px 60px #2d30c880` (outward violet haze)
- Slight radial gradient from `#2d30c8` center → `#060410` edge

**Layer 1 — Rotating Particle Ring:**
- The iconic Doctor Strange ring: a band of **golden-white sparks** rotating rapidly
- Implementation: SVG circle path with `stroke-dasharray` creating hundreds of tiny dash segments
- Dash segments: `1px` wide, `2–6px` long, distributed unevenly for organic feel
- Colors: mix of `#ffd700` (gold), `#ffe8a0` (warm white), `#c0c1ff` (cold violet) — 60/30/10 ratio
- The ring rotates at **2.5 RPM** (one full rotation per 24 seconds) — fast enough to feel alive, slow enough to be read
- Ring diameter: outer `520px`, inner `490px` (30px thick band)
- Additional: a **counter-rotating inner ring** at 420px diameter, rotating at 1 RPM opposite direction, spark density 50% lower
- At random intervals (3–8 seconds), brief `arc flares` — a segment of 3–5 sparks brightens to `opacity: 1, scale: 2` and fades over 0.4s

**Layer 2 — Portal Interior / The Rift:**
- Inside the spark ring: the `interdimensional void`
- NOT a flat color. It is a **layered animated depth illusion**:
  - Base: deep purple-black radial gradient `#0a0718 → #1a0a3a → #2d30c820`
  - Midground: Three `conic-gradient` layers rotating at different speeds and opacities, colors cycling through `#4f52e8`, `#8083ff`, `#2d30c8`, `#060410`. Opacity 15–30%.
  - Foreground: A **distortion vortex** — spiraling lines (drawn as SVG paths or CSS transforms) that rotate inward creating infinite-zoom perspective illusion
  - Turbulence effect: subtle CSS `filter: url(#turbulence)` SVG filter creating organic, non-mechanical distortion
  - Color: predominantly deep violet-indigo with flashes of cold blue when the conic gradients align
- The portal `breathes` — it gently pulses `scale(0.97) → scale(1.01)` every 4s

**Layer 3 — Rim Glow:**
- The inside edge of the spark ring has a `box-shadow: inset 0 0 40px 10px #8083ff40`
- The outside edge has `box-shadow: 0 0 60px 20px #4f52e830`
- An additional outer halo: `0 0 200px 40px #2d30c815` — fills surrounding space with diffuse violet

**Layer 4 — Knowledge Orbs (Topic Particles emerging from the portal):**
- 8 topic orbs orbit and drift outward from the portal, as if expelled from the rift
- Each orb: `80px` diameter pill/circle, glass morphism style
- Background: `rgba(255,255,255,0.04)`, `border: 1px solid rgba(192,193,255,0.2)`, `backdrop-filter: blur(12px)`
- Interior: a small subject icon (SVG, 28px, violet) + subject name (12px mono, `--text-on`)
- Orbs **float** in loose orbital paths — not rigid circles, more like chaotic asteroid field
- Each orb has a unique drift animation: `translateX(±30px) translateY(±40px) rotate(±5deg)`, durations 6–14s staggered
- They appear to be **pulled from the portal center** — slight motion blur trail at origin vector
- **HOVER STATE** (critical): When cursor enters an orb:
  - Orb expands: `scale(1.15)`, border glows `#c0c1ff60`, `transition: 200ms cubic-bezier(0.34, 1.56, 0.64, 1)` (spring overshoot)
  - A description tooltip appears BELOW/AROUND the orb (not covering it): glass card `200px` wide, 3–4 line description
  - Description examples:
    - Physics: *"Explain quantum mechanics, thermodynamics, and wave theory. The AI probes your grasp of causality."*
    - Math: *"Prove your understanding of calculus, linear algebra, and topology through verbal derivation."*
    - Biology: *"Describe molecular mechanisms, evolutionary theory, and systems biology out loud."*
    - CS: *"Articulate algorithms, data structures, and system design as if teaching a junior engineer."*
    - Chemistry: *"Walk through organic reactions, bonding theory, and chemical equilibria under examination."*
    - History: *"Reconstruct causation chains across civilizations. The AI checks your reasoning, not your dates."*
    - Philosophy: *"Argue a position, defend it, then have it challenged by Socratic questioning."*
    - Economics: *"Explain markets, incentives, and macro forces — then be asked where your model breaks down."*
  - Orb's particle trail momentarily brightens
  - Tooltip fades out on mouse leave with `opacity: 0 scale(0.95)`, 150ms

**8 Topic Orbs placement (approximate positions around 520px portal):**
```
              [Physics]
    [History]           [Mathematics]
  [Philosophy]   PORTAL   [Biology]
    [Economics]         [Chemistry]
              [Computer Science]
```
With organic drift, these positions constantly shift ±30–50px.

**Layer 5 — Atmospheric Particles:**
- Background field: ~200 tiny particles (1–2px dots), mostly `#c0c1ff` at 20–40% opacity
- Slowly drift upward and sideways (like embers from a fire, but cold)
- Some particles near the portal have slight attraction — they slowly orbit before disappearing at the spark ring

#### 3.3 Hero Text (flanking the portal)

Portal is centered at `55% from left` on desktop, allowing text to breathe on the left.

**Left text block** (position: `top: 35vh, left: 8%`):
- System label (mono, 11px, `--text-ghost`): `↳ COGNITIVE INFRASTRUCTURE · BUILD 2.0`
- Headline (2 lines):
  - Line 1: `You don't just` (88px, weight 200, `--text-dim`)
  - Line 2: `learn.` (88px, weight 900, violet gradient: `#c0c1ff → #8083ff → #4f52e8`)
- Sub-headline below: `You architect` (56px, weight 200) `understanding.` (56px, weight 700)
- Body text (16px, `--text-dim`, max-width 340px, line-height 1.8):
  `"Speak. Be challenged. Be mapped. The AI never teaches — it only asks, until you truly know."`

**Below text block** (same column, gap 48px):
- Two CTA buttons:
  - `[Enter the Portal →]` — primary, violet fill pill, 52px height, 20px px, weight 700. On hover: `box-shadow: 0 0 40px 16px #8083ff40`, subtle `scale(1.02)`.
  - `[Watch a session]` — ghost pill with `▷` play icon, same height
- Micro copy below (mono, 11px, `--text-ghost`): `NO CREDIT CARD · OPEN BETA · 500 FREE SESSIONS`

**Scroll indicator** (bottom center, position fixed during hero):
- Animated downward chevron pulse: `↓` fades in/out + slight translateY drift
- Label: `SCROLL TO EXPLORE` (mono, 10px)

#### 3.4 Portal Entry Animation (on page load)

The portal should NOT appear instantly. It forms:

1. `0ms` — Black void. Cursor trail activates silently.
2. `400ms` — A single bright point appears at center (`1px`, white, opacity 100%`)
3. `600ms → 900ms` — The point expands outward: thin ring grows from 0 → 520px diameter, `scale(0) → scale(1)`, `cubic-bezier(0.16, 1, 0.3, 1)`
4. `900ms → 1200ms` — Spark particles materialize on the ring (fade in with stagger)
5. `1200ms → 1600ms` — Portal interior fills with light, vortex activates
6. `1600ms → 2000ms` — Topic orbs are expelled outward from portal center (spring animation, origin: portal center → final position)
7. `2000ms → 2400ms` — Hero text slides in from left (`translateX(-30px) opacity 0 → 0 opacity 1`)
8. `2400ms` — Idle state. Full portal running.

Total intro: ~2.4 seconds. Non-blocking — user can interact at any point after 1.6s.

---

### ACT 2 — THE SUBJECTS SECTION
**Entered on scroll. Positioned below hero (scroll-snapped or natural scroll).**

#### 3.5 Section Layout

**Scroll entry animation:** As the user scrolls, the portal hero section smoothly scales down and fades (`scale(0.95) → opacity(0)`, parallax), revealing the dark surface beneath.

**Section header:**
- Background: `--surface` (`#0b0917`), with a faint neural grid texture (1px lines, `opacity: 3%`)
- Label (mono, center): `↳ WHAT YOU CAN MASTER`
- Title (center, 56px, weight 700): `Eight domains.` + `Infinite depth.`
  - "Eight domains." = weight 200, `--text-dim`
  - "Infinite depth." = weight 800, violet gradient text
- Subtitle (center, 16px, `--text-dim`, max-width 560px): "Upload any learning resource. Speak your understanding. The AI identifies exactly where your mental model breaks."

#### 3.6 The Subject Cards Grid

**8 cards** in a `4×2` grid (desktop). Each card is a rich subject panel — NOT just a badge.

**Card design:**
- Size: `280×320px`
- Background: `rgba(255,255,255,0.02)`, `border: 1px solid rgba(255,255,255,0.06)`
- Top section (160px): subject illustration area — abstract generative art unique to each subject (described below)
- Bottom section: subject name (22px, weight 600) + 2-line description + `[Explore →]` ghost link

**Hover state:**
- Border glows to `rgba(192,193,255,0.3)`
- Top illustration animates (described per card)
- `translateY(-6px)` lift
- Background brightens to `rgba(255,255,255,0.04)`
- A faint subject-colored glow appears beneath the card

**Per-subject illustration concepts (top section of each card):**

| Subject | Illustration | Hover Animation | Accent Color |
|---|---|---|---|
| **Physics** | Overlapping sine waves + orbital electron path | Waves animate, electron orbits | `#c0c1ff` violet |
| **Mathematics** | Infinite Mandelbrot zoom (static frame) | Gentle zoom in on fractal | `#a0d4ff` cold blue |
| **Biology** | DNA double helix, slowly rotating | Helix rotation accelerates | `#4dffa8` emerald |
| **Chemistry** | Molecule bonds as glowing nodes + edges | Bonds pulse with energy flow | `#ffb84d` amber |
| **Computer Science** | Binary rain + circuit trace lines | Rain speed increases | `#8083ff` indigo |
| **History** | Timeline axis with era markers, fading into past | Markers pulse chronologically | `#ffd700` gold |
| **Philosophy** | Infinite loop möbius strip outline | Strip rotates | `#ff8fd4` rose |
| **Economics** | Supply/demand curve lines with market shock | Curves shift on hover | `#4dffd4` teal |

**Below each card:** a thin line reads (mono, 11px, `--text-ghost`):
`↳ [number] sessions completed in this domain` (random realistic numbers: 2,840 / 1,290 / etc.)

#### 3.7 The "How It Helps" Panel (below the grid)

After the 8 cards: a full-width `1440px` panel.

**Left (40%):** A sticky explanatory text column:
- Label (mono): `THE METHOD`
- Title (40px, weight 700): `The AI never teaches.`  
  Sub: `It only asks.` (40px, weight 200)
- 4 bullet rows (icon + title + 1-line description), no actual bullet points — just icon, title, body:
  1. `◎ Listens` — "Real-time transcription of everything you say"
  2. `⊞ Maps` — "Your explanation is embedded and compared to your uploaded resources"
  3. `⚠ Probes` — "Gaps are identified and challenged with surgical questions"
  4. `✓ Evaluates` — "A mastery score is generated at session end"

**Right (60%):** An animated **session preview mockup**:
- A dark glass card `500×340px` showing a mini active session interface
- Transcript bubbles animating in one by one:
  - User bubble (right): *"So the wave function describes all possible states..."*
  - AI bubble (left, violet tint): *"You said 'possible states' — but what physically collapses them?"*
  - User bubble (right): *"The act of measurement causes—"*
  - AI bubble (left): *"Measurement by what? Define your observer."*
- Bubbles appear with typewriter effect, looping every 8 seconds
- Below bubbles: a thin "Probing Depth" bar fills from 0 → 70% as the conversation develops
- The whole card has a subtle `rotate(-2deg)` tilt, floating gently

---

### ACT 3 — THE VOICE SECTION
**Full viewport height. Dark, dramatic, intimate.**

#### 3.8 Voice Assistant Animation Showcase

**Background:** Pure `#060410`. No grid. No particles. Just the Voice.

**Center composition:**

**The Orb:**
- Diameter: `320px`
- The orb is the AI's "voice body" — a fluid, living sphere
- Surface: animated 3D-looking blob using CSS `border-radius` morphing (between organic shapes) + gradient surface
- Surface colors: swirls of `#4f52e8 → #8083ff → #c0c1ff → #2d30c8`, constantly shifting like an oil slick or aurora
- The orb is not perfectly round — it breathes and distorts organically using SVG feTurbulence filter or CSS border-radius animation between 12 different blob shapes
- Inner glow: `radial-gradient(circle, #c0c1ff30 0%, transparent 60%)` 
- Outer glow: `box-shadow: 0 0 80px 20px #4f52e820, 0 0 160px 40px #2d30c810`

**Four states shown side by side as a strip below the main orb (labeled):**

| State | Orb Behavior | Label |
|---|---|---|
| **Idle** | Slow drift, surface barely moving, dim | `WAITING` |
| **Listening** | 3 concentric pulse rings expand outward from orb, color: `#c0c1ff → transparent`. Ring speed: 1.2s interval. | `LISTENING` |
| **Processing** | Orb surface fragments: 12–16 geometric shards orbit the center, then reassemble. Duration: 0.8s loop. | `PROCESSING` |
| **Speaking** | Horizontal waveform bars extend LEFT and RIGHT from orb center, like an equalizer — bars vary in height (15–80px), violet, animated. | `SPEAKING` |

**Waveform detail (Speaking state):**
- 24 bars each side (48 total)
- Heights driven by a sine wave function with noise: `sin(x * 0.8 + t) * noise(x)`
- Colors: gradient left-to-right `#4f52e8 → #8083ff → #c0c1ff → #8083ff → #4f52e8`
- Update rate: 60fps

**Section text (above the orb):**
- Label (mono): `THE VOICE LAYER`
- Title (56px): `It listens.` (weight 200) `It asks.` (weight 800, violet gradient) `It never stops.` (weight 200)
- Body (16px, max-width 480px, center): "The AI doesn't speak to inform. It speaks to interrogate. Real-time speech analysis, continuous transcript embedding, surgical follow-up — all happening as you talk."

**Below the orb:**
- 3 stat counters in a row (animated count-up on scroll-enter):
  - `2,847` sessions completed
  - `94%` average concept coverage
  - `< 800ms` AI response latency
- Each number: 48px bold, `--text-on`. Label below: 12px mono, `--text-ghost`.

**Transition to footer:** The void deepens. The orb gently descends and fades as user scrolls to footer.

---

### ACT 4 — FOOTER

**Background:** `#04030d` (slightly darker than void)

**Layout:** 1440px wide, 4-column grid.

**Column 1 (wider, 35%):**
- Full logo (ψ feynmanAI)
- Tagline: *"You don't just learn. You architect understanding."* (14px, `--text-dim`, italic)
- Social links: Twitter/X · GitHub · LinkedIn (icon buttons, 36px, ghost style)
- Copyright (mono, 11px, `--text-ghost`): `© 2026 FEYNMAN AI — ALL RIGHTS RESERVED`

**Columns 2–4:**
- Col 2: `PRODUCT` — Method · Pricing · Changelog · Open Beta
- Col 3: `RESOURCES` — Documentation · Research · Case Studies · Blog
- Col 4: `LEGAL` — Privacy Policy · Terms · Cookie Policy · Contact

**Newsletter strip (full width, above copyright):**
- Background: `rgba(255,255,255,0.02)`, `border-top: 1px solid --rim`
- Left: `STAY UPDATED ON THE RESEARCH` (mono)
- Right: Email input (glass) + `[Subscribe →]` violet pill button

**Top border of footer:** A 1px line that glows faint violet `#8083ff20` — like the residual energy from the portal above.

---

## 4. Auth Pages

### PAGE 2: Sign In (`/auth/signin`)

**Layout:** Full-screen. 55/45 split — Left: Visual, Right: Form.

**Left Panel:**
- Background: `--void` with ambient violet glow orb (400px, center-left)
- A **minimal portal fragment** — just the spark ring arc (not full circle), top 30% of the ring visible, rotating slowly. Creates depth and continuity from landing page.
- Large italic serif quote:
  > *"The first principle is that you must not fool yourself — and you are the easiest person to fool."*
  > — Richard Feynman
  (32px, weight 200, `--text-dim`, max-width 400px)
- Bottom-left: mono system label `FEYNMAN AI · COGNITIVE WORKSPACE`

**Right Panel:**
- Background: `--raised` (`#110f1e`)
- `border-left: 1px solid rgba(255,255,255,0.06)`
- Centered card (max-width 400px):
  - Logo mark (ψ, 40px, animated draw-on entrance)
  - `Welcome back` (32px, weight 300)
  - `Your cognitive workspace awaits.` (14px, `--text-dim`)
  - 40px gap
  - **Email field:** glass input, left icon `✉`, `placeholder="your@email.com"`
  - 16px gap
  - **Password field:** glass input, left icon `🔒`, right icon `👁` toggle
  - `Forgot passphrase?` (12px, right-aligned, `--violet`, hover underline)
  - 32px gap
  - `[Sign In →]` — full-width, 52px, violet fill, rounded-lg
  - 24px gap
  - Divider: `────── or ──────` (faint lines, 11px mono label, `--text-ghost`)
  - 24px gap
  - `[G  Continue with Google]` — ghost button, white border, Google color icon
  - 24px gap
  - `New here? [Create an account →]` (14px, `--text-dim`, link violet)

**Form field animation:** On focus: border transitions from `--rim` → `--rim-active` + faint violet glow under the field. Label above field shrinks and floats up (floating label pattern).

---

### PAGE 3: Sign Up (`/auth/signup`)

**Same split layout. Mirror the decorative panel.**

**Right panel differences:**
- `Create your workspace` (32px, weight 300)
- `Start architecting your understanding.` (14px, `--text-dim`)
- Fields: Full Name · Email · Password · Confirm Password
- **Password strength meter:** 5-segment bar below password field. Segments fill left-to-right: red → amber → amber → violet → green as complexity grows. Label: `WEAK` → `FAIR` → `GOOD` → `STRONG` → `PERFECT` (mono, 11px, color-matched)
- Checkbox (styled): `[ ] I agree to the Terms of Use and Privacy Policy` (12px, `--text-dim`)
- `[Create Workspace →]` button
- `Already have a workspace? [Sign In →]`

---

### PAGE 4: Forgot Password (`/auth/forgot-pass`)

**Layout:** Centered card on void background. Portal background (very dim, 15% opacity, blurred `filter:blur(40px)`) visible behind card.

**Card (glass, 460px, `border: 1px solid --rim-active`):**
- Back link: `← Return` (14px, `--text-dim`, top-left of card)
- Icon: SVG of lock with broken chain, 56px, animated: chain link slowly fades in/out
- `Forgot your passphrase?` (28px, weight 600)
- `We'll send a reset link to your registered email.` (14px, `--text-dim`)
- Email input field
- `[Send Reset Link →]` full-width
- Mono note: `↳ CHECK SPAM IF IT DOESN'T ARRIVE WITHIN 2 MINUTES`

---

### PAGE 5: Verify Email (`/auth/verify-email`)

**Layout:** Centered on void. Same ambient portal glow.

**Card:**
- Animated envelope icon: flap opens, a tiny glowing letter flies out (CSS keyframe, loops once then settles)
- `Check your inbox` (28px)
- `We sent a 6-digit code to **prohar@example.com**` (14px, email bolded)
- **OTP Row:** 6 square inputs, `60×70px`, glass style. Active: `border-color: --violet`, outer glow. Filled: solid violet background, white text.
- Autofocus first cell. Typing auto-advances.
- Countdown: `Resend code in 00:58` (mono, 12px, `--text-ghost`). Counts down live.
- `[Verify →]` full-width button (disabled until all 6 cells filled, then pulses once to attract attention)

---

### PAGE 6: Reset Password (`/auth/reset-pass`)

**Layout:** Centered card.

**Card (560px wide, two-column internal layout):**
- Left column (form):
  - `Set your new passphrase` (24px)
  - New password + confirm password fields
  - Requirements list (4 items, icons change `○ → ✓` in real time as typed):
    - `○ 8+ characters`
    - `○ Uppercase letter`
    - `○ Number`
    - `○ Special character`
  - `[Update Passphrase →]` full-width
- Right column (visual):
  - Animated shield SVG: gradient fill that rises from 0 → 100% based on password strength (like a liquid filling a vessel)
  - Caption: `End-to-end encrypted` (12px mono)

---

## 5. Dashboard

### PAGE 7: Main Dashboard (`/dashboard`)

**App Shell:**
- **Top nav (56px):** ψ logo left · `Dashboard` breadcrumb center (with `/ Sessions / New Session` trail support) · right: `🔔` bell (dot badge if notification) + avatar circle (32px, initials or photo) + chevron dropdown
- **Left sidebar (260px, fixed):**
  - Brand header: ψ mark + `feynmanAI` (12px mono, `--text-ghost`)
  - Nav items (icon + label, 44px height each):
    - `◎ Dashboard` (active: left violet bar `3px`, background `rgba(192,193,255,0.06)`)
    - `⬡ Sessions`
    - `⊞ Resources`
    - `◷ Analytics`
  - Separator
  - Bottom group: `⚙ Settings` · `← Sign Out`
  - Very bottom: user card — avatar + name + plan badge `BETA`

**Main content (scrollable, left: 260px, right: 320px offsets):**

1. **Welcome Hero Block:**
   - `Good morning, Prohar.` (48px, weight 300, staggered word animation on load)
   - Cognitive status line (mono, 12px, `--text-ghost`): `↳ SYSTEM NOMINAL · 12 SESSIONS · 3 ACTIVE THREADS`
   - **System Vitals Strip** — horizontal row of 3 live stats (glass cards, `border: 1px solid --rim`):
     - `Concepts Mastered` — `82%` (large number, gauge bar below)
     - `Gaps Detected` — `14` (large number, red tint)
     - `Sessions This Week` — `6` (large number, trend arrow `↑3%`)

2. **Recent Sessions** (section header: `Recent Sessions` + `View All →`):
   - 2 cards, 1:1 grid:
     - Each card: subject pill (mono, small, `background: rgba(192,193,255,0.08)`) + topic title (22px) + last active timestamp + status badge + progress bar (`Session depth: 67%`) + `[Resume →]` button
   - Hover: `translateY(-4px)`, left violet accent bar appears, border glows

3. **Quick Actions** (3 cards, 1/3 grid):
   - `↑ Upload Resources` (icon + title + subtitle "4 in library")
   - `🔖 Bookmarks` (icon + title + subtitle "3 ready")
   - `◷ Logs` (icon + title + subtitle "847 chunks recorded")

**Right sidebar (320px, fixed):**
- `COGNITIVE SNAPSHOT` (mono label)
- **Radial chart** (180px): Top 3 topics shown as colored arcs around center
- **Today's Intention** — glass input field (editable, placeholder: `What will you master today?`)
- **Streak Counter:** Fire emoji + `7-day streak` + 7-cell heatmap row
- **Knowledge Graph Miniature:** 180×180px force-directed graph, violet nodes, animated edges

---

### PAGE 8: Settings (`/dashboard/settings`)

**App shell: same sidebar. Content area: centered 720px column.**

**Page title block:**
- `System Configuration` (40px, weight 300) + `⚙` icon (violet, 36px, slowly rotates on hover of title)
- `Calibrate your cognitive workspace` (16px, `--text-dim`)

**Four accordion-style sections** (click to expand, smooth 300ms height transition):

**§1 — Profile**
- Avatar (72px circle) with camera overlay on hover → file picker
- Name (editable), Email (read-only + `VERIFIED` mono badge in green)
- `[Save Changes →]` ghost button

**§2 — Cognitive Preferences**
- Toggle rows (label + description + animated toggle switch right):
  - `Deep Probing Mode` — multi-layer follow-ups
  - `Strict Domain Lock` — stay within resources
  - `Real-Time Gap Alerts` — mid-session notifications
  - `Auto-End Session` — 30min inactivity
- Slider: `Probing Intensity` — custom range input with violet thumb + track fill. Labels: `Gentle ←→ Rigorous`

**§3 — System**
- Theme selector: 3 visual swatches (80×48px cards):
  - `Void` (dark, current — violet ring outline border)
  - `Nebula` (midnight blue tint)
  - `Eclipse` (deep charcoal)
- Language select
- `Export Data` + `Delete Account` (danger, red ghost button in red-tinted sub-section)

**§4 — Security**
- Current password · New password · Confirm
- `[Update Passphrase →]`

---

## 6. Session Flow Pages

### PAGE 9: New Session — Upload (`/session/new-session`, step 1)

**Full app shell. Left sidebar shows step progress.**

**Left sidebar — Session Stepper:**
- `NEW SESSION` header (mono)
- Vertical stepper:
  ```
  ● ─── Upload Resources        (active, violet dot)
  ○ ─── Processing              (future, ghost)
  ○ ─── Configure Brief         (future, ghost)
  ```
- Progress: `Step 1 of 3` (mono, bottom)
- Instructional text: "Drop your study material. PDFs, notes, images. The system will extract and vectorize every concept."
- Formats: `PDF · TXT · PNG · JPG · DOCX` (mono pills)

**Main content (centered, 720px):**
- Title: `Upload your knowledge source` (40px, weight 600)
- Sub: `What do you want to master today?` (16px, `--text-dim`)
- **Drop Zone:**
  - Size: `100% × 280px`
  - Border: `2px dashed rgba(192,193,255,0.15)`, `border-radius: 16px`
  - Background: `rgba(255,255,255,0.01)`
  - Center: animated upload cloud icon (bounces gently), `[Browse files]` link
  - **Drag-over state:** border becomes solid `--violet`, background `rgba(192,193,255,0.04)`, scale `1.01`, subtle violet glow
  - File list below zone: filename + size + type icon + `✕` remove (each row animates in via `slideDown`)
- CTA row (bottom, fixed to section):
  - `[Process Resources →]` (violet, full-width, disabled until files present)
  - `[Continue without resources]` (ghost link, `--text-dim`)

**Right sidebar — Resource Library:**
- `YOUR LIBRARY` (mono label)
- List of past resources with recency sort
- Each row: file icon + truncated name + date uploaded + `[Use →]`
- Empty state: `"No previous resources. Start by uploading above."` (italic, `--text-ghost`, center)

---

### PAGE 10: New Session — Processing (`/session/new-session`, step 2)

**NO sidebars. Full-bleed immersive processing screen.**

**Full dark screen. Center composition:**

- **Animated Loader:** A miniature portal (120px) — the same spark ring, spinning fast (~6 RPM). Inside: swirling vortex. The ψ mark rotates inside it.
- **Stage label** (20px, weight 400, `--text-on`, center):
  - Cycles every 1.2s with fade-out/fade-in transition:
    1. `Analyzing vectors...`
    2. `Structuring concepts...`
    3. `Extracting semantics...`
    4. `Building knowledge graph...`
    5. `Finalizing brief...`
- **Progress bar** (400px wide, centered below label): thin `4px` bar, violet fill with shimmer animation, 0 → 100% over ~6s
- **Detail line** (mono, 11px, `--text-ghost`): `EMBEDDING PIPELINE ACTIVE · 3 CHUNKS PROCESSED`
- **Background:** the full portal glow ambiance at low opacity (15%) — feels like the system is processing through the same dimensional rift

**Cancel:** `[Cancel]` ghost link, top-right, `--text-ghost`.

---

### PAGE 11: New Session — Brief (`/session/new-session`, step 3)

**Sidebars return. Stepper updates to step 3 active.**

**Main content (640px centered):**

- Success state at top: `[✓ 3 resources processed · 12 concepts extracted]` (green pill, entrance animation: scale from 0.8, `cubic-bezier(0.34, 1.56, 0.64, 1)`)
- Title: `Configure your session brief` (40px)
- Sub: `The AI will operate within the boundaries you set here.` (16px, `--text-dim`)

**Form (glass card container, `border: 1px solid --rim-active`, `padding: 40px`):**

- **Subject** (glass select dropdown with custom chevron icon):
  - Options: Physics / Mathematics / Biology / Chemistry / CS / History / Philosophy / Economics / Custom
- **Topic** (text input): `What specific concept are you studying?`
  - Placeholder: `e.g. "Wave-particle duality in double-slit experiments"`
- **Learning Goal** (textarea, 4 rows): `What should you be able to explain by session end?`
  - Placeholder: `e.g. "Explain the collapse of the wave function without referencing a textbook."`
- **Session Mode** (radio group, horizontal on desktop):
  - `◉ Standard` — *20-minute focused session*
  - `○ Deep Dive` — *45-minute multi-concept*
  - `○ Sprint` — *10-minute rapid recall*
  - Radio button style: custom circle with violet fill on select + scale animation

- **`[Begin Session →]`** (full-width, 56px height, violet, large, weight 700). On hover: subtle pulsing glow animation. Click: button shrinks slightly + spinner appears (loading state before navigation).

---

### PAGE 12: Active Session (`/session/active-session`)

**THE MOST IMPORTANT PAGE. Make it the most extraordinary design.**

**Layout: Three-panel shell.**

**Left Panel (260px) — Concept Map:**

- `ACTIVE CONCEPTS` (mono label)
- **Live force-directed concept graph** (210×210px):
  - Nodes: concept names (circles, 8–16px, violet)
  - Active concept: largest node, bright violet, outer pulse ring
  - Gap concept: amber/red node, pulse faster
  - Mastered concept: green node, static
  - Edges: thin lines, opacity proportional to relationship strength
  - Entire graph gently oscillates (force simulation, never static)
- Below graph: concept status list:
  - `● Wave-Particle Duality` — `ACTIVE` (violet dot, blinking)
  - `◎ Superposition` — `PROBING` (amber dot)
  - `✓ Uncertainty Principle` — `MASTERED` (green dot)
  - `⚠ Decoherence` — `GAP` (red dot, pulse)
- Footer: `4 concepts mapped · 1 critical gap`

- **Current Resource** card (below concept list):
  - Glass card with document thumbnail/icon + filename
  - `[View Resource →]` link (14px, `--violet`)

**Center Panel — The AI Presence:**

- **Status badge** (top, centered): pill with colored dot:
  - `● LISTENING` (green, pulse) / `● ACTIVE` (violet) / `● CONNECTING` (amber)

- **The AI Orb (THE CENTERPIECE):**
  - Same orb as Act 3 Voice Section — fluid blob, 280px
  - Positioned at vertical center-upper half
  - Idle: slow drift, dim surface movement
  - Listening: three concentric pulse rings (`#c0c1ff`) expand outward, fade. Ring interval: 1.2s. Waveform bars from mic input modulate orb surface intensity.
  - Processing: surface shatters into 12–16 geometric shards, orbits briefly, reassembles. 1.2s cycle.
  - Speaking: horizontal waveform bars (24 each side) extend and animate. Orb surface ripples.

- **AI Question display** (below orb):
  - Glass card, `max-width: 520px`, centered, `border: 1px solid rgba(192,193,255,0.12)`
  - AI label: `[AI PROBE]` (mono, 10px, violet pill)
  - Question text (18px, italic, `--text-on`): appears with typewriter animation, cursor blinks at end
  - Example: *"You described quantum tunneling as particles 'passing through' barriers — but what does 'through' mean mathematically? What probability distribution are you referencing?"*
  - On new question: old question fades out (`opacity 0, translateY -10px`), new one fades in from below

- **Voice Waveform** (above session controls):
  - When recording: live amplitude bars (32 bars, violet gradient, real-time height from mic input)
  - When idle: flat line that gently pulses

- **Session Controls** (fixed bottom of center panel):
  - Row of 3 controls (glass pills):
    - `[🎤]` Mic — recording: violet fill + pulse ring + `RECORDING` mono label. Idle: ghost style.
    - `[⏹]` Stop — visible only while recording
    - `[⌨]` Text input toggle
  - End session button (top-right corner): `[⏻]` rose-tinted glass pill, `border: 1px solid rgba(255,77,109,0.4)`

- **Text Input Overlay** (when keyboard toggled):
  - Glass panel slides up from bottom (`translateY(100%) → translateY(0)`, 250ms spring)
  - Textarea + `[Send →]` button + `[✕]` close

**Right Panel (320px) — Live Transcript:**

- `LIVE TRANSCRIPT` (mono label)
- Scrollable feed (auto-scrolls to bottom):
  - User chunks: right-aligned bubble, `background: rgba(255,255,255,0.04)`, subtle right border `#c0c1ff40`
  - AI chunks: left-aligned, `background: rgba(79,82,232,0.08)`, left border `#8083ff60`, `[AI]` mono prefix
  - Timestamp: mono, 10px, `--text-ghost`, shown between chunks that are >60s apart
  - New chunks animate in: `translateX(20px) → 0` for user, `translateX(-20px) → 0` for AI
- Footer: session timer `00:12:34` (mono, center) + `[End & Evaluate →]` rose ghost button

---

### PAGE 13: Session Evaluation Report

**Full page — not a modal. Dramatic reveal.**

**Background:** `--void` with subtle glow behind the score orb.

**Header (centered):**
- `Session Complete` (mono, 11px, `--text-ghost`)
- `Your Mastery Report` (64px, weight 700)
- `Wave-Particle Duality · Physics · 23:14 session` (14px, `--text-dim`, mono)

**Three-column content:**

**Col 1 — Mastery Score:**
- Large circular gauge (`240px`):
  - Outer ring: segmented arc, fills violet from 0 → score angle (animated on page enter, 1.5s ease-out)
  - Inner: score number `82` (64px, weight 800, violet gradient) + `/100` (24px, `--text-dim`)
  - Below ring: `STRONG CONCEPTUAL GRASP` (mono, 12px, green)
- Sub-stats below gauge:
  - `Explanation Depth: HIGH`
  - `Concept Coverage: 82%`
  - `Probing Rounds: 7`

**Col 2 — Concept Breakdown:**
- `CONCEPT ANALYSIS` (mono label)
- List (each row: status icon + concept name + badge):
  - `✓ Wave-Particle Duality` — `MASTERED` (green badge)
  - `✓ Double-Slit Experiment` — `MASTERED`
  - `~ Superposition` — `UNDERSTOOD` (blue badge)
  - `⚠ Measurement Problem` — `GAP DETECTED` (amber badge, pulsing)
  - `✗ Decoherence Theory` — `NOT COVERED` (muted, strikethrough-adjacent style)
- Each row entrance: staggered `translateX(-20px) → 0`

**Col 3 — Next Steps:**
- `RECOMMENDED TARGETS` (mono label)
- 3 ordered cards (numbered, glass):
  1. `Revisit the measurement problem without notes`
  2. `Connect decoherence to wave function collapse`
  3. `Attempt to derive Heisenberg uncertainty without references`
- CTA: `[Start Follow-Up Session →]` (violet, full-width)
- `[Export PDF Report]` (ghost link below)

**Full-width section below:**
- `AI EVALUATION SUMMARY` (mono label, `border-top: 1px solid --rim`)
- 3-paragraph evaluative text block (glass card, scrollable if long)
- Example: *"Your explanation demonstrated solid intuitive understanding of the wave-particle duality framework. The double-slit experiment was described accurately. However, your treatment of the measurement problem revealed a critical gap: you described measurement as physical interaction without specifying the quantum-mechanical mechanism of state collapse. Decoherence theory was not addressed..."*

**Bottom action row:**
- `[Export PDF]` · `[Save to Knowledge Library]` · `[Share Report]` · `[Return to Dashboard]`

---

## 7. Component Reference Sheet (optional bonus mockup)

Document these as a grid sheet:

**Buttons:** Primary (violet fill) · Ghost · Danger · Icon-only · Disabled state
**Inputs:** Text · Password (show/hide) · OTP (6-cell) · Textarea · Select/Dropdown
**Cards:** Glass card · Session card · Resource card · Quick action · Evaluation card
**Badges:** Status (Active/Ended/Processing/Connecting) · Domain label · Mastery tier · Concept status
**Toggles:** On/Off switch (violet, animated sliding thumb)
**Progress:** Linear bar (shimmer) · Circular gauge (arc fill) · Segmented (5-cell)
**Navigation:** Topnav · Left sidebar · Session stepper · Breadcrumb
**AI Orb:** All 4 states with label
**Portal:** Full portal · Fragment (auth pages) · Mini (processing screen)
**Transcript bubbles:** User · AI · Timestamp divider

---

## 8. Rendering Instructions

1. Render each page at `1440×900` desktop, `2×` pixel density.
2. Mobile variants (`390×844`) for: Landing (all acts) · Sign In · Sign Up · Active Session.
3. Use exact hex colors from Section 2.1 — do not approximate or substitute.
4. Fill all placeholder content with realistic physics/learning domain text — no Lorem Ipsum.
5. Show the portal at its full animated state (as if frame-captured mid-animation) — not blank circles.
6. All glassmorphism elements must have visible texture — not flat fills.
7. Include annotation callouts for novel interactions (hover states, orb states, etc.).
8. Export filenames:
   - `00_component_library.png`
   - `01_landing_hero_portal.png`
   - `01_landing_hero_portal_mobile.png`
   - `02_landing_subjects.png`
   - `03_landing_voice.png`
   - `04_landing_footer.png`
   - `05_signin.png`
   - `06_signup.png`
   - `07_forgot_password.png`
   - `08_verify_email.png`
   - `09_reset_password.png`
   - `10_dashboard.png`
   - `11_settings.png`
   - `12_session_upload.png`
   - `13_session_processing.png`
   - `14_session_brief.png`
   - `15_session_active.png`
   - `16_session_active_mobile.png`
   - `17_session_evaluation.png`

---

## 9. The Design Mandate

This product should make the user feel like they are operating **cognitive infrastructure** — not using an app. 

The portal is not a gimmick. It is a metaphor made literal: through this rift, knowledge flows out and demands to be explained back in. Every subject orbiting the portal is a universe waiting to be entered. The AI inside is not a chatbot — it is a sentinel at the gate of understanding.

The person who sits down to use Feynman AI should feel slightly intimidated, deeply curious, and certain that this tool will make them smarter.

If the design looks like Duolingo, it has failed.
If it looks like something from a parallel universe where learning never became lazy — it has succeeded.

---

*Feynman AI · proharsaha@raktch.com · June 2026 · Build 2.0*
