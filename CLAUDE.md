# aleksiojala.studio — portfolio / freelancer site

## About the owner
- I'm a total beginner at coding. Explain every step simply and precisely.
- Before making big changes, tell me in plain words what you will change and why.
- Site is React + Vite, hosted on Netlify.

## Site structure (3 sections in the top nav)
FILMS / ART DIRECTION / ABOUT
Visual reference: jaronalbertin.com style — minimal, thin widely spaced uppercase type, name top-left, nav top-right.
Colours: only FILMS is dark (white text on top of the videos). ART DIRECTION and ABOUT both have a white background with black text, and the top bar is black on those pages.

## FILMS
Full-screen slider, one project per slide:
- Background: looping video filling the whole screen. Until there's a video, a still image: each film's own `slide` image in src/content.js (Ready To Die: rtd-slide.jpg). The slide image is separate from the film page's stills, so changing the stills never changes the front page.
- "VIEW" text (no border/box) at the bottom centre, just above the counter, with a small gap (~12px) between them. Same on every slide. On phones the counter is bottom-right, so VIEW sits just above it, lined up on the right. VIEW is the ONLY way into a film's page (no STILLS link, the title is not clickable, no separate project page).
- Left/right arrows, and a counter at the bottom (e.g. 1/3)
- Each slide shows ONLY the category and the title (e.g. "MUSIC VIDEO" / "READY TO DIE"). NO credit list.

Projects:
1. Ready To Die — music video. Background = separate trailer. 5 stills. Vimeo link.
2. Garbadura — commercial. Background = same video as on Vimeo (no separate trailer). Stills. Vimeo link.
3. Gem Vintage — commercial. Background = same video as on Vimeo (no separate trailer). Stills. Vimeo link.
Future: my short film — will have a description paragraph like the reference site.

### Film pages (e.g. /films/ready-to-die) — opened with VIEW
- One page per film, own address /films/<slug>.
- White background, black text. The top bar (name + nav) and CLOSE are black too.
- "CLOSE" on its own row just below the top bar, on the right (never overlapping the nav). Returns to the Films slider, on that film's slide.
- Heading above the video: "ARTIST — TITLE" (e.g. "SALOMON FAYE — READY TO DIE"), lined up with the video's left edge. Same font, size and letter spacing as the nav links, black. No artist → just the title.
- Desktop: everything fits on ONE screen, no scrolling (heading included):
  - Top: the video box, 3:2 (the same shape as the cover and the stills, so nothing jumps when hovering), centered, same width as the ART DIRECTION grid (67% of the window) — automatically smaller when the window is short, so it all fits.
  - Below: ONE row of small thumbnails, side by side, same total width as the video, ~6px gaps. Thumbnails are cropped to the same 3:2 shape.
- Optional cover image (`cover`): if a film has one, it's shown in place of the Vimeo player, filling exactly the same 3:2 box, with a small white "PLAY" text in the centre (same style as VIEW, no box). Clicking it removes the cover, loads the Vimeo player in the same spot and starts it playing. The Vimeo player is only loaded after the click (faster page). No cover → the Vimeo player is shown straight away.
- The box stays 3:2 when the video plays; a video of another shape fits inside it (Vimeo adds black bands). Vimeo shapes: Ready To Die 3:2 and Garbadura 3:2 (fill the box exactly), Gem Vintage 16:9 (bands above and below).
- Hover preview (desktop/mouse only): hovering a thumbnail shows that image in the big video box in place of the cover, with a quick fade. The still keeps its own shape and is NEVER cropped: the whole image fits inside the 3:2 box area, centred (a 3:2 still fills the box exactly; a portrait still fills the full height; a still wider than 3:2 fills the width). While a still is shown, the cover and the box's black background are hidden, so the empty space around the still is the page's white. Works for any image shape. "PLAY" fades out too while a still is shown, and comes back with the cover. Leaving the thumbnail row brings the cover back. Once the video is playing, hovering does nothing. Clicking a thumbnail still opens it full screen. On mobile: no preview, tap opens full screen.
- Mobile: scrolling allowed — video on top, thumbnails below in a grid of 3 per row.
- Clicking a thumbnail opens it full screen (white full-screen viewer, whole image uncropped, arrows + close + counter — see "Full-screen viewer" below).
- A film with no images yet: the page shows just the video.
- Content per film in src/content.js: `slug`, `artist` (optional, '' = none), `vimeoId`, `slide` (front-page slider image), `cover` (optional, '' = none), `images` list. The title image is part of `images` (order = order in the row). Ready To Die: rtd-title.png first, then rtd-still-01.jpg … rtd-still-05.jpg.
- Files go in public/films/<slug>/ — ideally 3:2 (e.g. 2400×1600), JPG for stills, max 2400px long side, ideally under ~500KB each. Cover image: 3:2 (e.g. 2400×1600), JPG, ideally under ~500KB — Ready To Die: rtd-cover.jpg. Slider image: Ready To Die: rtd-slide.jpg.
- Garbadura (public/films/garbadura/): garbadura-slide.jpg (front-page slider), garbadura-cover.jpg (3:2 cover — the logo image, same picture as the slide image but its own file, so each can be changed separately), garbadura-still-01.jpg (3:2) … garbadura-still-04.jpg (02–04 are 16:9, so in the hover preview they fill the box width with thin white bands above and below). No title image, no artist → heading is just "GARBADURA". The Ready To Die files are web-ready: don't convert or rename them.
- Works on Netlify thanks to the `/* /index.html 200` rule in public/_redirects.
- The full-screen viewer is rendered straight into <body> (React portal) so it always covers the top bar.

## ART DIRECTION
- White background with black text (same as ABOUT). The top bar is black on this page; on FILMS it stays white over the videos.
- Scrolls normally (not a slider). No showreel, no section titles.
- Subtitle: one short grey line ("AI IMAGERY, CONCEPT ART AND VISUAL DEVELOPMENT.") in the top bar, directly under the name, left-aligned with it. Same font, size and letter spacing as the name, grey like the inactive nav links. No other intro text on the page.
- Layout: the grid starts right below the top bar, with only a small gap (no big empty space). ONE mixed masonry grid of images and videos (Pinterest style).
  - 2 columns on desktop, 1 on mobile. ~6px gap.
  - Grid width = 67% of the browser window (a percentage, not fixed pixels), centered, with empty white space left and right.
  - On mobile: almost full width, with small side margins (16px) so the images aren't tiny.
  - Every item keeps its original shape (portrait, square, landscape) — never cropped.
  - No titles or text on top of the items.
  - Every image and video keeps its ORIGINAL shape (wide, panoramic, portrait) — never cropped, never stretched, no fixed box shape. Each item's box takes the file's own shape (`ratio` in content.js, checked again when the file loads), and the file is shown with object-fit: contain as a safety net.
  - Videos: autoplay, muted, loop, no controls — like moving images. They play ALL the time, never with sound (also not paused when scrolled off screen; restarted when the visitor comes back to the tab).
- Items are NOT clickable: no full-screen view on this page, no hover effect.
- Images and videos start loading only when scrolled near (keeps bandwidth low); once loaded they stay.
- Content: one single `items` list in src/content.js (each item is an image or a video, in display order), each with `ratio` = the file's pixel size, e.g. '2400/1339'.
- Full-width items: an item with `wide: true` spans the whole grid width (both columns); the items after it continue in two columns below. Used for the most impressive piece: ad-video-05.mp4 (man in sunglasses) at the very top.
- Files: public/art-direction/ — already optimized, don't convert or rename them. 6 images (ad-*.jpg) + 7 videos (ad-video-01.mp4 … ad-video-07.mp4). ad-paris-aerial.jpg was removed (not used).
- Order: ad-video-05 (full width) first; right under it Nike cowboy (image) and Nike boot (ad-video-07) side by side; then mixed so each column alternates image / video.

## ABOUT
- White background with black text (same as ART DIRECTION). The top bar is black on this page.
- A strong, bold statement (like the old site): big centred bio text, regular weight, tight letter spacing, grows with the window (20px on phones up to 34px). Two paragraphs:
  "FILM & ART DIRECTOR WORKING ON GLOBAL TVC, MUSIC VIDEO & NARRATIVE PROJECTS." / "BASED IN PARIS, FRANCE."
- Under it: the email address itself (lowercase, underlined, clickable mailto link).
- NO background video or image
- Links underneath, small site style: INSTAGRAM — LINKEDIN (no EMAIL link — the address is shown above instead). A link with no address yet is shown grey and isn't clickable.
- Content in src/content.js: `bio` (a list, one entry per paragraph), `email`, `instagram`, `linkedin`.

## Full-screen viewer (clicking a film page thumbnail)
- src/components/Lightbox.jsx. Used only on the film pages (ART DIRECTION has no full-screen view). If a video is ever shown in it: muted, loop, no controls — never with sound.
- White background. CLOSE (top-right), the left/right arrows and the counter (e.g. 2 / 6) are black; CLOSE and the arrows turn grey on hover.

## City clocks (top edge of every page)
- A thin row along the very top edge, above the name and nav: LOS ANGELES, NEW YORK, PARIS, HELSINKI, TOKYO, each with its local time (24h, hours:minutes, updates every minute). Idea taken from the old site.
- Same font as the site, small (10px), widely spaced, uppercase. City name in the text colour, time in grey. No borders/boxes. First city lines up with the name, last with the nav.
- White over the videos on FILMS, black on the white pages (it's part of the top bar, so it follows the top bar's colours).
- Phones: short codes (LA, NY, PAR, HEL, TYO) so it fits on one line.
- Cities are set in src/content.js (`site.cities`: name, short, zone). `cities: []` hides the row. Code: src/components/CityClocks.jsx.
- The row is part of the top bar, so --header-height (and the film page's fit-on-one-screen sizing) includes it automatically.

## Focus outline (whole site)
- The thin outline around a link/button is shown ONLY for keyboard (Tab) users, never after a mouse click — on every link and button (arrows, VIEW, PLAY, CLOSE, thumbnails, nav, name…).
- Two parts, both global so new elements are covered automatically:
  1. CSS in src/index.css: `:focus:not(:focus-visible)` → no outline; `:focus-visible` → thin outline.
  2. One click listener in src/main.jsx: after a mouse click, the clicked link/button is un-selected (blur). Without this, a later key press (e.g. arrow keys on the slider or in the viewer) makes the browser draw the outline on the last clicked element. Keyboard Enter/Space clicks are left alone.
- Don't add per-element outline fixes; rely on these two.

## Asset rules
- Background videos: short loops, 1080p, H.264 MP4, no audio, as small as possible (a few MB). Keep bandwidth low because Netlify charges for usage.
- Keep file names consistent and lowercase.
