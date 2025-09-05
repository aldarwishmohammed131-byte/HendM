# HendM — Luxury Fashion (AR/EN, Black × Gold)

## Local dev
```bash
npm install
# create .env with: DATABASE_URL=postgres://... ; SEED_TOKEN=HENDM-2025-SEED
npx prisma migrate deploy
npm run dev
# open http://localhost:3000 -> redirects to /ar
```

## Deploy on Vercel
- Create Vercel Postgres and copy `DATABASE_URL`
- Add env vars in Vercel project: `DATABASE_URL`, `SEED_TOKEN`
- Build Command:
  ```
  npx prisma migrate deploy && next build
  ```
- After deploy, seed once:
  `https://YOUR-APP.vercel.app/api/seed?token=HENDM-2025-SEED`

## Structure
- App Router pages under `src/app/[locale]`
- Prisma models Product/ProductImage
- RTL support when locale=ar, default redirect `/` -> `/ar` via middleware
