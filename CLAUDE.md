# aleksiojala.studio — portfolio / freelancer site

## About the owner
- I'm a total beginner at coding. Explain every step simply and precisely.
- Before making big changes, tell me in plain words what you will change and why.
- Site is React + Vite, hosted on Netlify.

## Site structure (3 sections in the top nav)
FILMS / ART DIRECTION / ABOUT
Visual reference: jaronalbertin.com style — minimal, thin widely spaced uppercase type, name top-left, nav top-right.
Colours: only FILMS is dark (white text on top of the videos). ART DIRECTION and ABOUT both have a white background with black text, and the top bar is black on those pages.

## Typography (whole site)
- ONLY 3 font sizes, defined once at the top of src/index.css (change them there):
  - `--text-large`: clamp(20px, 2.4vw, 34px) (grows with the window) — film titles on the Films slides, About bio + email.
  - `--text-medium`: 12px — name, nav links, category (MUSIC VIDEO), VIEW, counters (1 / 3), CLOSE, PLAY, film page title, About links, Art Direction subtitle, any other text.
  - `--text-small`: 10px — the city clocks (and grey "missing file" labels).
  - No other sizes allowed, also not on phones. Any new text uses one of these 3 variables.
- Letter spacing goes with the size: LARGE tight (0.01em), MEDIUM wide (0.3em; VIEW/PLAY 0.4em), SMALL wide (0.25em). On phones the top bar/CLOSE/film title use 0.25em so everything fits.
- Font: Hanken Grotesk (Google Fonts, loaded in index.html as the range 100..400, so both Thin and Regular are there).
- Weights (`--weight-thin` 100, `--weight-regular` 400): ALL text is Thin by default. No other weights.
- Hover on every link and button (computers with a mouse only): the text turns from Thin to Regular. No colour, dimming or opacity hover effects on text.
- FILMS front page exception: the name and ALL nav links are 100% white (#fff, no grey, no transparency); hover only changes Thin → Regular. Code: `.header--over-video` in index.css (Header.jsx adds it when `overVideo` is set).
- White pages (ART DIRECTION, ABOUT, film pages): the name, ALL nav links and the Art Direction subtitle are 100% black (#000, no grey, no transparency); hover only changes Thin → Regular. Code: `:root[data-theme='light'] …` rules in index.css.
- So the nav does NOT mark the current page (no colour, weight or underline difference) on any page.
- No jumping on hover: every text link/button has `data-text="<its text>"` in the JSX; CSS ([data-text]::after) adds an invisible Regular copy that reserves the Regular width. Add `data-text` to every new text link/button.

## FILMS
Full-screen slider, one project per slide:
- Background: looping video filling the whole screen. Until there's a video, a still image: each film's own `slide` image in src/content.js (Ready To Die: rtd-slide.jpg). The slide image is separate from the film page's stills, so changing the stills never changes the front page.
- Top of the screen: only the name (left) and the nav (right), both pure white — no clocks up there. The top bar sits 12px closer to the top edge than the side margin (`--edge` in index.css = --pad − 12px, never under 10px). This applies to the top bar on every page, so the name doesn't jump when changing pages.
- Bottom-left corner, above the clocks (40px gap), left-aligned, same on phones. Its left edge lines up exactly with the left edge of the name "ALEKSI OJALA" (both at --pad). Stacked:
  - the category (MEDIUM, e.g. "MUSIC VIDEO"), white at 80% — a bit brighter than the usual grey, so it stands out from the background
  - the title (LARGE, e.g. "READY TO DIE")
  - one line ~12px below the title: the counter (MEDIUM, e.g. 1 / 3, normal text colour). On touch screens only: "VIEW" (MEDIUM, no border/box, pure white) comes first on that line, then a gap (2.5em, like the nav links), then the counter. VIEW's invisible click padding is only above, below and on the right (cancelled with negative margins), so its "V" lines up exactly with the name.
  - Same on every slide. Code: .slide-text and .slide-actions in index.css.
- The centre of the image is completely free of text (only the left/right arrows at the sides).
- Opening a film's page — the whole slide is clickable:
  - An invisible link (.slide-link) covers the whole slide, under the arrows and the top bar (those keep working). Clicking/tapping anywhere on the image — including on the title, the counter and the clocks, which let the mouse through — opens the film page. No STILLS link, no separate project page.
  - Desktop (computers with a mouse, `(hover: hover) and (pointer: fine)`): NO VIEW text at all — no visible VIEW and no label following the mouse (that cursor label was removed on purpose; don't add it back). The title turning Regular on hover is the only signal.
  - Desktop hover on the image: the title brightens (pure white) and turns from Thin to Regular, like other links (width reserved with data-text, so nothing jumps). Same when the slide link gets keyboard focus (Tab).
  - Phones/tablets (touch): the VIEW text stays visible under the title (see above), and the whole slide is tappable too. Swiping still changes slides.
- Each slide shows ONLY the category and the title. NO credit list.
- Left/right arrows at the middle of the left/right edges: big (40px, 32px on phones), with a thicker line (~2px). Only the slider's arrows; the full-screen viewer keeps its thin ones.
- The city clocks scroll along the bottom (see "City clocks" below).
- The background is darkened a little at the top (for the top bar), and very subtly over the bottom third: transparent at the top of that third to about 40% black at the bottom edge — barely noticeable, but it keeps the project text and clocks readable on any image. The middle of the image is left untouched.

Projects:
1. Ready To Die — music video. Background = separate trailer. 5 stills. Vimeo link.
2. Garbadura — commercial. Background = same video as on Vimeo (no separate trailer). Stills. Vimeo link.
3. Gem Vintage — commercial. Background = same video as on Vimeo (no separate trailer). Stills. Vimeo link.
Future: my short film — will have a description paragraph like the reference site.

### Film pages (e.g. /films/ready-to-die) — opened with VIEW
- One page per film, own address /films/<slug>.
- White background, black text. The top bar (name + nav) and CLOSE are black too.
- Heading above the video: "ARTIST — TITLE" (e.g. "SALOMON FAYE — READY TO DIE"), lined up with the video's left edge. Same font, size (MEDIUM) and letter spacing as the nav links, black. No artist → just the title.
- "CLOSE" mirrors the heading: on the same line (same height), right-aligned with the right edge of the video box (its trailing letter spacing hangs outside, so the E ends exactly at the edge). Returns to the Films slider, on that film's slide. Code: .film__top in index.css.
- Desktop: everything fits on ONE screen, no scrolling (heading included):
  - Top: the video box, 3:2 (the same shape as the cover and the stills, so nothing jumps when hovering), centered, 67% of the window wide — automatically smaller when the window is short, so it all fits.
  - Below: ONE row of small thumbnails, side by side, same total width as the video, ~6px gaps. Thumbnails are cropped to the same 3:2 shape.
- Optional cover image (`cover`): if a film has one, it's shown in place of the Vimeo player, filling exactly the same 3:2 box, with a small white "PLAY" text in the centre (same style as VIEW, no box; turns Regular when hovering the cover). Clicking it removes the cover, loads the Vimeo player in the same spot and starts it playing. The Vimeo player is only loaded after the click (faster page). No cover → the Vimeo player is shown straight away.
- The box stays 3:2 when the video plays; a video of another shape fits inside it (Vimeo adds black bands). Vimeo shapes: Ready To Die 3:2 and Garbadura 3:2 (fill the box exactly), Gem Vintage 16:9 (bands above and below).
- NO hover preview: hovering a thumbnail never changes the big box — it always shows the cover (with PLAY) or the video. Clicking/tapping a thumbnail opens it full screen. (A hover preview existed before and was removed on purpose — don't add it back.)
- Mobile: scrolling allowed — video on top, thumbnails below in a grid of 3 per row.
- Clicking a thumbnail opens it full screen (white full-screen viewer, whole image uncropped, arrows + close + counter — see "Full-screen viewer" below).
- A film with no images yet: the page shows just the video.
- Content per film in src/content.js: `slug`, `artist` (optional, '' = none), `vimeoId`, `slide` (front-page slider image), `cover` (optional, '' = none), `images` list. The title image is part of `images` (order = order in the row). Ready To Die: rtd-title.png first, then rtd-still-01.jpg … rtd-still-05.jpg.
- Files go in public/films/<slug>/ — ideally 3:2 (e.g. 2400×1600), JPG for stills, max 2400px long side, ideally under ~500KB each. Cover image: 3:2 (e.g. 2400×1600), JPG, ideally under ~500KB — Ready To Die: rtd-cover.jpg. Slider image: Ready To Die: rtd-slide.jpg.
- Garbadura (public/films/garbadura/): garbadura-slide.jpg (front-page slider), garbadura-cover.jpg (3:2 cover — the logo image, same picture as the slide image but its own file, so each can be changed separately), garbadura-still-01.jpg (3:2) … garbadura-still-04.jpg (02–04 are 16:9). No title image, no artist → heading is just "GARBADURA". The Ready To Die files are web-ready: don't convert or rename them.
- Works on Netlify thanks to the `/* /index.html 200` rule in public/_redirects.
- The full-screen viewer is rendered straight into <body> (React portal) so it always covers the top bar.

## ART DIRECTION
- White background with black text (same as ABOUT). The top bar is black on this page; on FILMS it stays white over the videos.
- Scrolls normally (not a slider). No showreel, no section titles.
- Subtitle: one short line ("AI IMAGERY, CONCEPT ART AND VISUAL DEVELOPMENT.") in the top bar, directly under the name, left-aligned with it. Same font, size (MEDIUM), letter spacing and colour (100% black, Thin) as the name. No other intro text on the page.
  - Phones: the top bar wraps to 3 rows (name / nav / subtitle on 2 lines). The visible gap between the nav and the subtitle is the SAME as between the name and the nav (subtitle margin-top −2px on phones). The subtitle's two lines have line-height 1.7, and it has 8px extra below it (so the grid starts a little lower). Only the subtitle's spacing changes — the name and nav stay exactly where they are on every page.
- Layout: the grid starts right below the top bar, with only a small gap (no big empty space). ONE mixed masonry grid of images and videos (Pinterest style).
  - 2 columns on desktop, 1 on mobile. ~6px gap.
  - Grid width = 67% of the browser window, centred, with empty white space left and right (`.art .masonry` in index.css).
  - On mobile: almost full width, with small side margins (16px) so the images aren't tiny.
  - Every item keeps its original shape (portrait, square, landscape) — never cropped.
  - No titles or text on top of the items.
  - Every image and video keeps its ORIGINAL shape (wide, panoramic, portrait) — never cropped, never stretched, no fixed box shape. Each item's box takes the file's own shape (`ratio` in content.js, checked again when the file loads), and the file is shown with object-fit: contain as a safety net.
  - Videos: autoplay, muted, loop, no controls — like moving images. They play ALL the time, never with sound (also not paused when scrolled off screen; restarted when the visitor comes back to the tab).
- Items are NOT clickable: no full-screen view on this page, no hover effect.
- Images and videos start loading only when scrolled near (keeps bandwidth low); once loaded they stay.
- Content: one single `items` list in src/content.js (each item is an image or a video, in display order), each with `ratio` = the file's pixel size, e.g. '2400/1339'.
- ALL items stay in the 2 columns — no item spans the full width on its own. (The code still supports `wide: true` in content.js for a full-width item, but it's not used: don't add it.)
- Files: public/art-direction/ — already optimized, don't convert or rename them. 6 images (ad-*.jpg) + 7 videos (ad-video-01.mp4 … ad-video-07.mp4). ad-paris-aerial.jpg was removed (not used).
- Order: ad-video-05 (man in sunglasses) first (top left), Nike cowboy (image) next to it (top right), Nike boot (ad-video-07) below; then mixed so each column alternates image / video. Each item goes into whichever column is shortest at that point.

## ABOUT
- White background with black text (same as ART DIRECTION). The top bar is black on this page.
- A strong, bold statement (like the old site): big centred bio text in the LARGE size, Thin weight, tight letter spacing. Normal sentence case — NOT all caps (shown exactly as written in content.js). Two paragraphs (the first with a line break right after "TVC," so its two lines are closer in length — DESKTOP ONLY; on phones (≤700px) that break is switched off and the text wraps naturally, so "TVC," never ends up alone on a line):
  "Film & art director working on global TVC, music video & narrative projects." / "Based in Paris, France."
- Under it, on its own line: the email address itself — same LARGE size as the bio, Thin, black, lowercase, NO underline, clickable mailto link, same hover as other links (Thin → Regular). The gap above it is the same as between the bio paragraphs (0.6em).
- NO background video or image
- Links underneath, small site style: INSTAGRAM and LINKEDIN stacked one above the other, centred, no line between them (no EMAIL link — the address is shown above instead). A link with no address yet is shown grey and isn't clickable.
- Content in src/content.js: `bio` (a list, one entry per paragraph; `\n` inside an entry = a line break at that spot on desktop only — About.jsx turns it into `<br class="bio__break">`, hidden on phones), `email`, `instagram`, `linkedin`.
- Phones: the centred INSTAGRAM / LINKEDIN links are nudged (less than half a pixel, in About.jsx) so their text starts exactly on a screen pixel. Why: Thin 12px letters are a hairline thick; when centring puts a letter between two pixels, its upright stroke is smeared over two pale pixel columns and looks broken (this made the "L" of LINKEDIN look cut off on low-resolution screens). Not done on desktop.
- Phones: the About links also have `transform: translateZ(0)` (index.css, phone section), which draws each on its own layer. Why: iPhone WebKit cut a thin strip off the left of the L in LINKEDIN at its centred position, making the L look pale (a WebKit drawing bug, confirmed by test rows on a real iPhone: only the own-layer version drew it fully). Don't remove it.

## Full-screen viewer (clicking a film page thumbnail)
- src/components/Lightbox.jsx. Used only on the film pages (ART DIRECTION has no full-screen view). If a video is ever shown in it: muted, loop, no controls — never with sound.
- White background. CLOSE (top-right), the left/right arrows and the counter (e.g. 2 / 6) are black; CLOSE turns Regular on hover (like every link); the arrows turn grey on hover.

## City clocks (bottom of the FILMS slider only)
- One row along the bottom edge of the FILMS page (not on the other pages, not in the top bar), 12px closer to the bottom edge than the side margin (`--edge`): LOS ANGELES, NEW YORK, LONDON, PARIS, HELSINKI, SYDNEY, in that order. Idea taken from the old site.
- Format: "PARIS 17:42:08" — 24-hour time with seconds, updates every second. Correct local time for each city incl. daylight saving (the browser's time-zone rules, so no manual changes twice a year).
- Ticker: the row scrolls very slowly and smoothly to the left, endlessly (the list is repeated to fill the screen and loops without a visible jump). Speed: `SPEED` (pixels per second, now 15) at the top of src/components/CityClocks.jsx.
- No jitter: the scrolling is a CSS transform animation (translate3d + will-change, moved by the graphics card) that is never restarted when the time updates each second. Each time sits in a fixed-width box (tabular numbers + `width` for 8 characters), so the row's width never changes; it's only re-measured on window resize / font load, and tiny (<0.5px) differences are ignored. Full city names on phones too (it scrolls, so no short codes needed). People who turned off animations in their system settings see it standing still.
- Same font as the site, SMALL size (10px), widely spaced, uppercase, white over the video. City name in the text colour, time in grey. No borders/boxes.
- Cities are set in src/content.js (`site.cities`: name, zone). `cities: []` hides the clocks. Code: src/components/CityClocks.jsx, styles: .clocks in index.css.

## Scrollbar (whole site)
- The scrollbar is hidden on every page (`html` rules near the top of index.css); scrolling itself works normally (trackpad, wheel, keyboard, touch).
- Why: a scrollbar only appears on long pages (Art Direction) and makes the window narrower, which shifted the nav when switching pages. Hidden everywhere → the name and nav are in exactly the same spot on every page. Don't bring the scrollbar back.

## Focus outline (whole site)
- The thin outline around a link/button is shown ONLY for keyboard (Tab) users, never after a mouse click — on every link and button (arrows, VIEW, PLAY, CLOSE, thumbnails, nav, name…).
- Two parts, both global so new elements are covered automatically:
  1. CSS in src/index.css: `:focus:not(:focus-visible)` → no outline; `:focus-visible` → thin outline.
  2. One click listener in src/main.jsx: after a mouse click, the clicked link/button is un-selected (blur). Without this, a later key press (e.g. arrow keys on the slider or in the viewer) makes the browser draw the outline on the last clicked element. Keyboard Enter/Space clicks are left alone.
- Don't add per-element outline fixes; rely on these two.

## Asset rules
- Background videos: short loops, 1080p, H.264 MP4, no audio, as small as possible (a few MB). Keep bandwidth low because Netlify charges for usage.
- Keep file names consistent and lowercase.
