# Robbins Technologies Master Control

React + Tailwind dashboard for the Robbins Technologies Cloudflare control panel.

## Local Development

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.local.example` and set:

```text
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_API_TOKEN=...
```

The token is only read by the local Vite bridge and Cloudflare Pages Function. It is never bundled into the browser app.

## Cloudflare Pages

The production API route is implemented in `functions/api/cloudflare/overview.js`.

Expected Pages secrets:

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
```

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```
