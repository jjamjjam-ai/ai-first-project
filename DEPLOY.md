# Deploy to Vercel

## Prereqs
- GitHub repo is public (already)
- A Postgres database (recommended: Vercel Postgres)

## Steps
1) In Vercel: **New Project** → Import `jjamjjam-ai/ai-first-project`
2) Add a database:
   - Vercel → Storage → Postgres → Create
   - Connect it to this Vercel project (it will set env vars)
3) Ensure env var exists:
   - `DATABASE_URL`
4) Deploy

## Build/Migrations
This repo defines a Vercel build script:
- `vercel-build`: `prisma generate && prisma migrate deploy && next build`

So on every deploy, Prisma migrations will be applied automatically.

## Smoke test
After deploy:
- Open `/ko` and `/en`
- Create a post, then edit/delete using the password
