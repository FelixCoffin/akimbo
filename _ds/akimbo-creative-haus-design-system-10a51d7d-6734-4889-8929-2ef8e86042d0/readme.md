# Akimbo Creative Haus — Design System

Warm light paper, a single darker mark by default, two type families, and a
signature 3px red rule. This project is the portable rebuild of the Akimbo
design system: tokens, brand assets, reusable React components, foundation
specimen cards, a marketing-site UI kit, and sample deck slides.

**System in one line:** warm light paper + a single darker mark is the default;
two type families only (Regards for statement moments, Futura for everything
else, Futura Condensed ExtraBold for big headlines); a signature 3px red rule;
never any yellow.

## Company context
Akimbo Creative Haus is a creative production agency with offices in **Seattle
and NYC**. They plan the shoot, run the set, and cut the work in-house — one
crew, no hand-offs. Work spans commercials, brand films, and music (Somethings,
Mfused / World Cup, Sound Credit Union, Yonny, TOOSLOW, plus a political
youth-turnout series in production). Sister brand: agencymd (gated behind a
launch flag in nav).

## Sources this was built from
- `felix-handoff-bundle/Akimbo Design System - Portable Spec.md` — **the source of truth.** Every token, type, component and voice rule is from here.
- `felix-handoff-bundle/tokens.css` — CSS mirror of the spec values.
- `felix-handoff-bundle/website-html/Home.html` — exported live site page (the extracted, readable template lives at `_ref/Home.clean.html`); the web patterns and real copy in the UI kit come from it.
- `uploads/Logos-*.zip` — the full logo/Bo/badge artwork library (curated selection copied into `assets/`).
- Fonts: `Regards-Regular.ttf` (real) and `FuturaStd-CondensedExtraBd.otf` (real), both in `assets/fonts/`.

---

## CONTENT FUNDAMENTALS — how Akimbo writes
Confident, warm, funny, and specific. Talks like the crew actually talks.

- **Voice rules (hard):** No em dashes. No semicolons. Contractions always. Receipts over adjectives (say the number, not the superlative).
- **Banned words:** "elevate", "seamless", "authentic storytelling".
- **Location lockup:** brand copy reads **SEATTLE + NYC**. Never "Brooklyn" in headlines, eyebrows, or body (street addresses keep their real city — the office is on Plymouth St, Brooklyn).
- **Person:** first-person plural ("we plan the shoot, run the set, cut the work"), second person to the client ("for the brands who care twice as much"). Warm and direct.
- **Emoji:** none. Unicode only as punctuation / marks: `→ · | ↗ ↓ #`.
- **Casing:** headlines and kickers are UPPERCASE (Futura Condensed / tracked labels). Statement moments are title/sentence case in Regards and end in a period (no ligatures; the punctuation stays the same colour as the rest of the line).
- **Examples (real):** "For the brands who care twice as much." · "You can't outwork someone who's having fun." · "We're real-life friends. Not 'grab a happy hour drink after work' friends. More like 'groomsmen at each others' weddings' friends." · "Multi six figures in year one."
- **Socials / contact:** IG + YouTube `@akimbo.haus` only. `(206) 949-9547 · cj@akimbo.haus · nash@akimbo.haus · 5651 University Wy NE, Seattle · 4 Plymouth St, Brooklyn`.

---

## VISUAL FOUNDATIONS
- **Palette:** warm light paper is the ground. Brand core is red `#B74132`, forest green `#094A24`, warm black `#333132`, cream `#FFFDE6`. Supporting tints (`--red-tint`, `--green-tint`), deep/pressed variants (`--red-deep` `#98352A`, `--green-deep` `#05331A`), warm hairlines. Use the full palette together sparingly — usually paper + one darker mark. **There is no yellow, ever.**
- **Type:** two families. **Regards** (script, 400 only, never faux-bold) for statement moments and the wordmark voice — set with no ligatures, punctuation in the same colour as the line, and the horizontal-crossbar **e** (the default `e` glyph in `Regards-Regular.ttf` is remapped to that alternate, so it applies automatically everywhere). **Futura** for everything else — **Futura Condensed ExtraBold** (800, UPPER, tight) for big headlines / H1 / H2 / stat figures; **Jost** stands in for Futura Medium (500, body) and Bold (700, tracked-caps labels) until the real text weights arrive.
- **Backgrounds:** mostly flat warm paper. Full-bleed dark bands for hero (near-black reel loop) and forest-green statement/dark slides. The signature **red statement band** fills the viewport in `#B74132` with a huge Regards line in cream ending in a near-black period, one Bo on the right, and a scroll cue.
- **Imagery:** warm, real, film-grade stills and muted reel loops (native `<video>`, autoplay/muted/loop — never a YouTube iframe). Dark work tiles with a bottom protection gradient and a Futura kicker + condensed-caps title.
- **Corners & cards:** cards use **radius 10** and are **never pill**; radii scale sm 6 / md 10 / lg 16. Buttons are the only pill (`--radius-pill` 999). Card = white surface, 1px warm border `#D8D4CB`, subtle two-layer shadow. Web work tiles use larger 16–18px radius.
- **Shadows:** paper is mostly flat. `--shadow-card` (subtle), `--shadow-pop` (lifted popovers). The web build adds a **hard offset block shadow** (`4px 4px 0`, `6px 6px 0` on hover) on buttons and a red `8px 8px 0` on work-tile hover.
- **Borders / rules:** the signature **3px red rule** (`--rule-weight`) under headers; 3px red left border on callouts; 1px warm hairlines for dividers and footer.
- **Motion:** gentle. Content rises in (`translateY` + fade, ~0.8s ease-out); Bo bobs slowly on statement bands; tiles lift on hover. Respect reduced-motion. No infinite decorative loops on text.
- **Hover / press:** **buttons DARKEN on hover, never lighten** (green → deeper green, red → `--red-deep`), lift `translate(-1px,-1px)` with a bigger block shadow, then press to `translate(2px,2px)` with a tight shadow. Cards lift `translate(-2px,-2px)`. Links darken to `--link-hover` (some web contexts to green).
- **Transparency / blur:** the sticky nav is warm translucent paper (or near-black on the home hero) with a backdrop blur and a 1px dashed hairline bottom border. Protection gradients (not capsules) sit under text on imagery.
- **Layout:** document geometry is 48px margins, 24px gaps, 816px max content width. Web sections use 56–72px horizontal padding. Nav is sticky; footer is a dark band.

## ICONOGRAPHY
- **No dedicated icon font or SVG icon set** ships with this brand. Akimbo leans on **Unicode glyphs as marks/punctuation**: arrows `→ ↗ ↓`, mid-dot `·`, pipe `|`, and `#` for channel-style chips. Keep to these rather than introducing a library.
- **Brand marks do the heavy lifting.** The logo library (in `assets/logos` and `assets/illustrations`) covers wordmarks, box logos, badges (diamond, SEA↔NYC oval, semicircle, wheel), and Bo in many poses. Use these instead of decorative icons.
- **Emoji:** never.
- If a UI genuinely needs functional icons (e.g. a play control), use a minimal Unicode glyph (`▶`) or request a matching set from the brand team — do not hand-draw SVG icons or mix in an off-brand library. This is flagged as a gap below.

## Bo, the mascot
A different Bo per section, **never repeated on a page, never decoration** — every
Bo earns its section. Canonical: leaping Bo = statement band / deck divider.
Poses available: leaping, walking, together, cherries, dual (see `assets/illustrations`).

---

## Components
All are React, exported under `window.AkimboCreativeHausDesignSystem_10a51d`, styled via the CSS
custom properties. Props are documented in each `.d.ts` / `.prompt.md`.

- **Logo** — recolourable wordmark (wordmark / horizontal / centered lockups; red/green/black/cream).
- **BoMark** — Bo the mascot (leaping / walking / together / cherries / dual). Cream tone on dark/red grounds.
- **OvalKicker** — Regards-script phrase ringed by a hand-drawn oval (the deck kicker).
- **Button** — the locked pill; darkens on hover; primary / onDark / link variants.
- **Card** — plain paper tile (radius 10, never pill), optional hover lift.
- **Tag** — small caps / channel-style chip.
- **SectionLabel** — the tracked-caps red kicker.
- **Box** — bordered card with optional red header; `callout` for the red-tint emphasis box.
- **DocTitle** — document title block (kicker, H1, Regards subtitle, lead).
- **DocHeader** — letterhead over the 3px red rule.
- **DocFooter** — hairline footer, brand line + context.
- **BulletList** — copy list with round brand markers.
- **StatBlock** — headline figure + tracked label (receipts).
- **LabelValue** — label/value rows over hairlines (closest thing to a table).
- **DeckSlide** — the 1280×720 slide frame (light cream / dark charcoal / red statement).
- **DeckCover** — centred deck cover (light / dark / red).
- **DeckDivider** — section-break slide: oval kicker, big Regards title, cream Bo, corner tab.
- **DeckContent** — content-slide master (kicker/label, condensed or Regards headline, corner page tab, optional Bo).
- **PageTab** — folded-corner page-number tab (inverse of the slide ground).
- **StatCard** — results figure on a rounded red card.
- **ContentCard** — rounded red card with heading, body, and a drag-and-drop image slot.

### Intentional additions (beyond the spec's named React set)
- **Card** and **Tag** — the spec describes cards/tags as web patterns without a formal token component; these wrap those patterns as reusable primitives.
- **SiteNav** / **SiteFooter** (in the website UI kit, not global components) — the spec describes nav/footer as web patterns; they live in the kit rather than the shared library.

## Index / manifest
- `styles.css` — global entry point (consumers link this only). `@import`s the token files + interaction patterns.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`.
- `patterns/interactions.css` — locked :hover / :active / link states (ships with the token closure).
- `assets/fonts/` — Regards (real; ships with a one-glyph `Regards-alt-a.ttf` override — see below), Futura Condensed ExtraBold (real).
- `assets/logos/` — wordmarks (PNG, per tone), box logos, badges (diamond, SEA↔NYC, semicircle, wheel).
- `assets/illustrations/` — Bo poses (leaping, walking, together, cherries, dual + head/wordmark lockups).
- `components/` — `brand/` (Logo, BoMark), `buttons/` (Button), `cards/` (Card, Tag), `layout/` (SectionLabel, Box), `doc/` (DocTitle, DocHeader, DocFooter, BulletList, StatBlock, LabelValue), `deck/` (DeckSlide, DeckCover, DeckDivider, DeckContent). Each has a `.d.ts`, a `.prompt.md`, and a `@dsCard` HTML.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `ui_kits/website/` — interactive marketing-site recreation (Home, Our Work, case-study detail).
- `slides/` — sample deck slides (cover, dark cover, divider, content with stats / list).
- `SKILL.md` — Agent Skills entry point.
- `_ref/` — extracted reference copies of the source site pages (not shipped).

## CAVEATS / substitutions
- **Regards uses the brand "a" everywhere.** Regards' default lowercase "a" is a fancy two-story glyph; the brand "a" is the single-story form that mirrors the akimbo wordmark. `tokens/fonts.css` layers a one-glyph `Regards-alt-a.ttf` over the base face via `unicode-range: U+0061`, so every "a" set in Regards is automatically the correct one — no per-use markup, no exceptions, and no other glyph/ligature/kern touched. Do not remove that second `@font-face`.
- **Futura body is now the real face.** Futura BT Light (≤400) and Futura Medium (≥500, the body default) are both loaded; **Jost** remains only as a last-resort fallback. Futura Condensed ExtraBold and Regards are the real display faces. A dedicated bold cut can be added later via another `@font-face` in `tokens/fonts.css`.
- **Retired faces are excluded:** Apnea Inline Fill and Poppins are not loaded (they were in the older web build but retired by the current spec).
- **No functional icon set** exists in the brand — Unicode glyphs are used. Flagged above.
- **Hero reel + case-study stills** are labelled placeholders; drop in real muted `.mp4` loops and stills for production.
- **Bo "leaping"/"walking" art includes the wordmark** in the supplied files; a Bo-only silhouette wasn't in the library. The brick-wall "culture" Bo noted in the spec was not in the assets.
