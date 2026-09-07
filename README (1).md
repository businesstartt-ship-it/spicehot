# HOTSPY — Pure Spices, Real Flavor

A single-brand e-commerce site for HOTSPY spices: Chilli, Cumin & Turmeric powders. Pure frontend — HTML, Tailwind (CDN) and vanilla JS. No build step, no dependencies to install.

## Features

- **Product catalog** — 3 spices rendered from a data array, with CSS-only jar illustrations
- **Cart drawer** — localStorage persistence, quantity controls, live subtotal
- **Free-shipping progress bar** — shows progress toward the $40 free-shipping threshold
- **Build-a-Box** — mix quantities of all three spices with an automatic 15% bundle discount
- **Heat Scale slider** — 0–10 heat meter that recommends a spice for your tolerance
- **Quick View modal**, **search overlay**, **mobile nav drawer**, **review carousel**, **FAQ accordion**, **newsletter form**
- **Promo code** — copy `HOTSPY20` from the announcement bar (20% off)

## Project structure

```
hotspy/
├── index.html    # markup + inline Tailwind config
├── styles.css    # custom styles (Tailwind handles the rest via CDN)
└── script.js     # all app logic (cart, bundle, slider, etc.)
```

## Run locally

Just open `index.html` in a browser — that's it. No server or build needed.

## Deploy

The site is fully static. Easiest options:

- **GitHub Pages** — push to a repo, then Settings → Pages → Deploy from branch → `main` / root
- **Netlify / Vercel** — drag-and-drop the folder, zero config

## Notes

- Cart state persists in `localStorage` under the key `hotspy_cart`
- Checkout is a frontend demo (shows a success modal, no payment processing)
- Hindi product labels use Noto Sans Devanagari via Google Fonts

---

© 2026 HOTSPY. Made with heat.
