// =====================================================================
//  SITE CONTENT
//  This is the ONE file to edit when you want to change the text,
//  links, images or videos on the site. You don't need to touch
//  any other file for that.
//
//  Rules for editing:
//  - Text always goes inside quotes: 'LIKE THIS'
//  - Keep the commas at the end of lines — they separate the items.
//  - An empty value '' means "I don't have this yet". The site handles
//    that gracefully (for example, an empty link is shown but not clickable).
//  - Files you put in the "public" folder are written starting with "/".
//    Example: the file public/videos/ready-to-die.mp4 is written
//    as '/videos/ready-to-die.mp4'
// =====================================================================

// ---------------------------------------------------------------------
//  GENERAL INFO (name in the top-left corner + the ABOUT page)
// ---------------------------------------------------------------------
export const site = {
  name: 'ALEKSI OJALA',

  // The bio on the ABOUT page: big centred text. Each line in quotes is
  // its own paragraph (with a small gap between them).
  // \n inside the quotes = a line break at that exact spot.
  bio: [
    'Film & art director working on global TVC,\nmusic video & narrative projects.',
    'Based in Paris, France.',
  ],

  // Just the address, without "mailto:".
  email: 'aleksijuhaniojala@gmail.com',

  // Full web addresses. Leave '' if you don't have it yet.
  instagram: 'https://www.instagram.com/aleksi0jala/',
  linkedin: 'https://www.linkedin.com/in/aleksi-ojala-b8b438203',

  // The city clocks scrolling slowly along the bottom of the FILMS page,
  // in this order. Each shows e.g. "PARIS 17:42:08" (summer time included).
  //   name   the city name shown
  //   zone   the city's time zone (a list: en.wikipedia.org/wiki/List_of_tz_database_time_zones)
  // Delete all the lines (leave cities: []) to hide the clocks.
  cities: [
    { name: 'LOS ANGELES', zone: 'America/Los_Angeles' },
    { name: 'NEW YORK', zone: 'America/New_York' },
    { name: 'LONDON', zone: 'Europe/London' },
    { name: 'PARIS', zone: 'Europe/Paris' },
    { name: 'HELSINKI', zone: 'Europe/Helsinki' },
    { name: 'SYDNEY', zone: 'Australia/Sydney' },
  ],
}

// ---------------------------------------------------------------------
//  FILMS — one block { ... } per project, in the order they appear
//  in the slider. To add a project, copy a whole block (from { to },)
//  and change the details.
//
//  What each line means:
//  title            The big title on the slide.
//  type             Small label above the title, e.g. 'MUSIC VIDEO'.
//  artist           Optional. On the film's page the heading above the
//                   video is 'ARTIST — TITLE' (e.g. 'SALOMON FAYE — READY
//                   TO DIE'). Leave '' to show just the title.
//  vimeoId          The number at the end of the Vimeo address.
//                   Example: vimeo.com/879885415  →  '879885415'
//                   The film is shown at the top of the film's page.
//  cover            Optional image shown in place of the Vimeo player,
//                   with PLAY on top. The film only loads when it's
//                   clicked (faster page). Must be 3:2 (e.g. 2400×1600),
//                   JPG under ~500KB, in public/films/<slug>/ .
//                   Leave '' to show the Vimeo player straight away.
//  backgroundVideo  The looping background video (see the asset rules
//                   in CLAUDE.md: short, 1080p, H.264 MP4, no audio,
//                   a few MB). Put the file in public/videos/.
//  slide            The front-page (FILMS slider) background image: shown
//                   while the video loads, or instead of it if there is no
//                   video yet. Its own file, separate from the stills, so
//                   changing the stills never changes the front page.
//                   Leave '' for plain black.
//  description      Optional paragraph under the title (for the future
//                   short film). Leave '' for commercials/music videos.
//
//  FILM PAGE (opens with the VIEW button: the Vimeo film on top,
//  then one row of small thumbnails below it):
//  slug             The film's web address name: 'ready-to-die' makes the
//                   page aleksiojala.studio/films/ready-to-die
//                   (lowercase, dashes instead of spaces).
//  images           The thumbnail images, in the order they're shown —
//                   the title image too, wherever you want it in the row.
//                   Put the files in public/films/<slug>/ .
//                   Best in 3:2 shape (like 2400×1600): thumbnails are cut
//                   to 3:2, but the full-screen view always shows the whole image.
//                   While this list is empty [], the page just shows the film.
// ---------------------------------------------------------------------
export const films = [
  {
    title: 'READY TO DIE',
    artist: 'SALOMON FAYE',
    type: 'MUSIC VIDEO',
    vimeoId: '1123435215', // from the old site — check that it's correct
    cover: '/films/ready-to-die/rtd-cover.jpg',
    backgroundVideo: '', // PLACEHOLDER — e.g. '/videos/ready-to-die-trailer.mp4'
    slide: '/films/ready-to-die/rtd-slide.jpg',
    description: '',
    slug: 'ready-to-die',
    images: [
      '/films/ready-to-die/rtd-title.png',
      '/films/ready-to-die/rtd-still-01.jpg',
      '/films/ready-to-die/rtd-still-02.jpg',
      '/films/ready-to-die/rtd-still-03.jpg',
      '/films/ready-to-die/rtd-still-04.jpg',
      '/films/ready-to-die/rtd-still-05.jpg',
    ],
  },
  {
    title: 'GARBADURA',
    artist: '',
    type: 'COMMERCIAL',
    vimeoId: '879885415', // from the old site — check that it's correct
    cover: '/films/garbadura/garbadura-cover.jpg',
    backgroundVideo: '', // PLACEHOLDER — e.g. '/videos/garbadura.mp4'
    slide: '/films/garbadura/garbadura-slide.jpg',
    description: '',
    slug: 'garbadura',
    images: [
      '/films/garbadura/garbadura-still-01.jpg',
      '/films/garbadura/garbadura-still-02.jpg',
      '/films/garbadura/garbadura-still-03.jpg',
      '/films/garbadura/garbadura-still-04.jpg',
    ],
  },
  {
    title: 'GEM VINTAGE',
    artist: '',
    type: 'COMMERCIAL',
    vimeoId: '879470610', // from the old site — check that it's correct
    cover: '', // optional — e.g. '/films/<slug>/<name>-cover.jpg'
    backgroundVideo: '', // PLACEHOLDER — e.g. '/videos/gem-vintage.mp4'
    slide: '/STILLS/gem_vintage_thumb_fixed.jpg',
    description: '',
    slug: 'gem-vintage',
    images: [], // PLACEHOLDER — e.g. '/films/gem-vintage/gem-vintage-still-01.jpg',
  },
]

// ---------------------------------------------------------------------
//  ART DIRECTION page (scrolls down from top to bottom)
// ---------------------------------------------------------------------
export const artDirection = {
  // Subtitle shown under your name (top-left) on this page. Keep it short.
  subtitle: 'AI IMAGERY, CONCEPT ART AND VISUAL DEVELOPMENT.',

  // THE GRID — images and videos mixed, shown in this order.
  // Each line is one item. To add one, copy a line and change it.
  // To remove one, delete its line. To reorder, move lines up or down.
  //
  //   type    'image' or 'video'
  //   src     the file, e.g. '/art-direction/ad-horse.jpg'
  //           (put the files in the folder public/art-direction/)
  //   alt     images only: a few words describing the image
  //           (read aloud to blind visitors, and helps Google)
  //   poster  videos only, optional: a still image shown while the video loads
  //   ratio   the file's size in pixels, width/height (e.g. '2400/1339').
  //           Optional, but it lets the grid use the right shape before the
  //           file has loaded, so nothing jumps and the columns stay even.
  //           Files always keep their own shape anyway — never cropped.
  //   wide    optional: true = the item spans the FULL width of the grid
  //           (both columns). Not used at the moment: all items stay in
  //           the 2 columns.
  //
  // Videos play silently on a loop, with no controls — in the grid AND when
  // clicked open full screen. They never play with sound.
  items: [
    { type: 'video', src: '/art-direction/ad-video-05.mp4', ratio: '1920/824' }, // man in sunglasses
    { type: 'image', src: '/art-direction/ad-nike-cowboy.jpg', alt: 'Nike cowboy', ratio: '2400/1345' },
    { type: 'video', src: '/art-direction/ad-video-07.mp4', ratio: '1920/1080' }, // Nike boot
    { type: 'video', src: '/art-direction/ad-video-03.mp4', ratio: '1920/1076' }, // football robot
    { type: 'image', src: '/art-direction/ad-eye.jpg', alt: 'Eye', ratio: '2400/1339' },
    { type: 'video', src: '/art-direction/ad-video-06.mp4', ratio: '1920/824' }, // Eiffel Tower
    { type: 'image', src: '/art-direction/ad-immersive-bible.jpg', alt: 'Immersive Bible', ratio: '2400/1387' },
    { type: 'image', src: '/art-direction/ad-jerry-west.jpg', alt: 'Jerry West', ratio: '1604/2400' },
    { type: 'video', src: '/art-direction/ad-video-01.mp4', ratio: '1920/1076' }, // car in the city
    { type: 'image', src: '/art-direction/ad-net.jpg', alt: 'Net', ratio: '1280/854' },
    { type: 'video', src: '/art-direction/ad-video-02.mp4', ratio: '1920/1076' }, // ski resort
    { type: 'video', src: '/art-direction/ad-video-04.mp4', ratio: '1920/1076' }, // car on a mountain road
  ],
}
