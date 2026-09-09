# HOTSPY — Pure Spices, Real Flavor

A single-brand e-commerce site for HOTSPY spices: Chilli, Cumin & Turmeric powders. Pure frontend — HTML, Tailwind (CDN) and vanilla JS. No build step, no dependencies to install.

## Features

- **Product catalog** — 4 spices (Chilli, Cumin, Turmeric, Coriander) with real product photos
- **Cart drawer** — localStorage persistence, quantity controls, live subtotal
- **Free-delivery progress bar** — progress toward free delivery on orders over 999 tk
- **Build-a-Box** — mix quantities of all three spices with an automatic 15% bundle discount
- **Heat Scale slider** — 0–10 heat meter that recommends a spice for your tolerance
- **Quick View modal**, **search overlay**, **mobile nav drawer**, **review carousel**, **FAQ accordion**, **newsletter form**
- **Promo code** — copy `HOTSPY20` from the announcement bar (20% off)

## Project structure

```
hotspy/
├── index.html    # markup + inline Tailwind config
├── styles.css    # custom styles (Tailwind handles the rest via CDN)
├── script.js     # all app logic (cart, bundle, slider, checkout...)
└── images/       # product photos (chilli, cumin, turmeric, coriander)
```

## Before going live — edit these placeholders

1. **WhatsApp number** — in `script.js` find `SHOP_WHATSAPP` and in `index.html` find `8801XXXXXXXXX` (2 places) and replace with your real number
2. **Phone / email** — footer CONTACT section in `index.html`
3. **Prices** — the `PRODUCTS` list at the top of `script.js`
4. **Reviews** — replace the sample reviews in `script.js` with real customer reviews as they come in

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
