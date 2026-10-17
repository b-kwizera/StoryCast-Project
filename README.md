# StoryCast

An accessible media feature microsite: short audio and video stories, each with captions and a full transcript. Built with semantic HTML5, Sass and a little vanilla JavaScript. No frameworks.

- **Pages:** Home (`index.html`), Story detail (`story/*.html`), About / Access (`about.html`)
- **Design files (Figma):** https://www.figma.com/design/7BqGiKftWJIWfy6c5X2Y9V/StoryCast---Wireframes-and-Mockups (pages: *Wireframes*, *High-fidelity mockups*)
- **Sitemap (FigJam):** https://www.figma.com/board/AyzQPvLUD0G3KRdNnRmUJL/StoryCast-Sitemap
- **Research document:** [docs/research.pdf](docs/research.pdf)
- **Technical documentation:** [docs/documentation.pdf](docs/documentation.pdf)

## Project structure

```
storycast/
├── index.html              Home
├── about.html              About / Access
├── story/                  Story detail pages
│   ├── before-the-market-wakes.html   (video)
│   ├── the-bridge-choir.html          (audio)
│   └── night-shift-bakery.html        (audio)
├── sass/
│   ├── main.scss           Entry point
│   ├── abstracts/          _colors, _typography, _spacing, _breakpoints
│   ├── base/               _layers (cascade layer order), _reset, _base
│   ├── layout/             _layout (container, page shell, header, footer)
│   ├── components/         skip-link, site-nav, button, hero, media-card,
│   │                       media-player, transcript, feature, utilities
│   └── pages/              _story, _about
├── css/main.css            Compiled styles (committed)
├── js/main.js              Transcript seek + active-line highlight
├── assets/                 audio/, video/, captions/ (.vtt), transcripts/, images/
├── docs/                   research.pdf, documentation.pdf, img/ (figures used in the documents)
└── package.json            Sass build scripts
```

## How the requirements are met

- **Semantic HTML5:** `header`, `nav`, `main`, `article`, `section`, `aside`, `figure`/`figcaption`, `footer`; one `h1` per page and no skipped heading levels.
- **Sass:** partials and tokens, BEM class names, and cascade layers (`reset, base, layout, components, pages, utilities`).
- **Responsive:** Grid (page shell, auto-fit card grids, story layout) and Flexbox (header, nav, badges), plus fluid type.
- **Container query:** the story card (`.media-card`) lives in a `container-type: inline-size` slot and switches from stacked to side-by-side with `@container story-card (min-width: 30rem)`. See the wide featured card on Home versus the narrow cards and sidebar.
- **No frameworks:** HTML, Sass and ~30 lines of vanilla JS.

## Accessibility checklist (WCAG 2.1 AA)

- [x] Captions (WebVTT `<track kind="captions" default>`) on every audio and video
- [x] Full on-page transcript for every story, plus downloadable `.txt`
- [x] Transcript timestamps are real buttons (keyboard operable); the active line is marked with `aria-current` and a bar, not colour alone
- [x] Text and UI contrast meets AA (all token pairs 4.5:1+ for text, 3:1+ for UI; table in `docs/documentation.pdf`)
- [x] Skip link as the first focusable element
- [x] Visible focus ring on all links, buttons and media controls (light variant on dark surfaces)
- [x] Landmarks and labelled regions (`aria-label`, `aria-labelledby`), `aria-current="page"` in the nav
- [x] `lang="en"` and a unique `<title>` on every page
- [x] Meaningful images have alt text; decorative images use `alt=""` or `aria-hidden`
- [x] rem-based sizing; reflows down to 320px; works at 200% zoom
- [x] `prefers-reduced-motion` respected
- [x] Works without JavaScript (transcripts stay readable)

Known limitations: the demo narration is synthetic speech over abstract visuals. Real video footage would need audio description.

## Running locally

Requires Node.js (only to compile Sass) and any static file server.

```bash
npm install                    # installs Sass
npm run build                  # sass/main.scss -> css/main.css
npm run watch                  # rebuild on change
python3 -m http.server 8000    # open http://localhost:8000
```

`css/main.css` is committed, so you can also just open the site through a static server without building.

### Replacing the demo media

Put real recordings in `assets/audio` or `assets/video` using the same file names, then re-time the matching `assets/captions/*.vtt` and update `assets/transcripts/*.txt` and the transcript on each story page.

## Keyboard test

Tab from the top of any page: the first stop is "Skip to main content", then the nav, then page content. On a story page, Tab into the player, then the transcript timestamps; Enter on a timestamp plays from that line.
