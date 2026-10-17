# Chromapetit

Web platform for miniature painters to compare and match paint colours across manufacturers.

**Live:** [chromapetit.vercel.app](https://chromapetit.vercel.app)

## Features

- Paint database from several manufacturers with RGB values for colour matching
- Sign in with Google (Auth.js) and save painting projects with images (Firebase Storage)

## Tech stack

Next.js 15 (App Router), React 19, TypeScript, Prisma, Auth.js v5, Firebase, Tailwind CSS + shadcn/ui, React Hook Form + Zod

## Getting started

```bash
npm install
# configure .env (database URL, Auth.js and Firebase keys)
npx prisma migrate dev
npm run db:seed
npm run dev
```

## Status

Hobby project, work in progress.
