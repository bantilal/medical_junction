# Medical Junction - marketing website

Next.js 16 (App Router, TypeScript) + Tailwind CSS 4. Statically generated pages for SEO and speed, with small server routes for inquiries, reviews/ratings, likes and a password-protected admin.

## Run

```bash
npm install
cp .env.example .env.local   # then edit ADMIN_PASSWORD / ADMIN_SESSION_SECRET
npm run dev                  # http://localhost:3000
npm test                     # unit tests
npm run build && npm start   # production
```

## Fill in before launch (all in `config/site.ts`)
- Full street address, postal code, **map coordinates** (Google Maps: right-click the shop > copy coordinates) and the Google Maps share link
- Confirm phone / WhatsApp numbers (read from the banner photo), e-mail, opening hours (`hoursConfirmed: true`)
- Drug licence number, GSTIN, pharmacist name (shown on /quality only when filled)
- `status: "open"` after opening; social links; Google review link
- Set `NEXT_PUBLIC_SITE_URL` to the real domain (sitemap, canonical, schema)

## Content
- Products: `data/catalog.ts` (real prices stay `null` until verified; add photos to `public/images/products/` and set `image`)
- Offers: `data/content.ts` (none published until you add real ones; they expire on `validUntil`)
- Photos: `public/images/` (shop-front.jpg, shop-banner.jpg)

## Reviews, likes, inquiries
Stored as JSON in `DATA_DIR`. Reviews are **hidden until approved** at `/admin`; rating and AggregateRating schema appear only when real approved reviews exist. Use a host with a persistent disk (VPS, Render disk) or swap `lib/store.ts` for a database.

## Compliance notes
No prescription medicines are listed or promoted; no certification claims without documents; forms warn against sharing health details. Legal pages are starter templates - get them reviewed.
