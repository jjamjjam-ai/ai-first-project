# ai-first-project

Anonymous board with password-protected edit/delete (no login).

## Features
- Anonymous posts
- Password set at creation; required for edit/delete
- i18n: ko/en
- Dark mode
- Bootstrap + Bootswatch theme

## Dev
```bash
cp .env.example .env
# set DATABASE_URL
npm install
npx prisma generate
# create migrations + apply (requires a Postgres DATABASE_URL)
npx prisma migrate dev
npm run dev
```

## Deploy (Vercel)
- Set `DATABASE_URL` in Vercel (Vercel Postgres / Neon / Supabase)
- Vercel will run `vercel-build` script:
  - `prisma generate && prisma migrate deploy && next build`
