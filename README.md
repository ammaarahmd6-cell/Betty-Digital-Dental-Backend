# Betty Digital Dental Solutions Backend

Express API for Betty Digital Dental Solutions.

## Local Setup

```bash
npm install
npm run dev
```

## Start

```bash
npm start
```

## Render

Render can use `render.yaml` from this repo root.

Required environment variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=https://your-netlify-site.netlify.app
```

The `database/` folder contains the Supabase schema and seed SQL.

## Vercel

Vercel uses `vercel.json` to deploy `server.js` as a Node.js function.

Required environment variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=https://your-vercel-frontend-url.vercel.app
```
