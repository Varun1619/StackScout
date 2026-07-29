# StackScout

A daily "Tool of the Day" portal for data professionals. Every day, Claude
researches the web and picks one tool, framework, or platform that's heavily
used or in-demand right now for Data Engineers, AI Engineers, or Data
Scientists, then writes up a full deep dive: what it is, why it matters, its
architecture, a worked example project, recent papers, real projects, and
companies using it. Every tool ever shown is saved permanently to a browsable
Library.

Content is generated live by Claude with web search — nothing is hardcoded.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Postgres (Supabase) via Prisma ORM
- `@anthropic-ai/sdk` (server-side only) with the web search tool
- Zod for validating the model's JSON output
- Vercel + Vercel Cron for the daily job

## How it works

`POST` or `GET /api/scout` is the only place that talks to Claude. It:

1. Computes today's date (`YYYY-MM-DD`). If a row for that date already
   exists, it returns it immediately — safe to call more than once a day.
2. Reads every existing tool name from the database to exclude from today's
   pick.
3. Calls Claude (`claude-sonnet-5`) with the web search tool enabled and a
   prompt that requires a `<json>...</json>` response.
4. Validates the response with Zod; retries once on failure. If it still
   fails, returns a 502 and writes nothing.
5. Upserts the validated tool keyed on today's date and returns it.

The home page (`/`) reads today's row; if it's missing (e.g. the first visit
of the day before the cron fires), it generates it inline, streaming a radar
"scouting" animation while it works. `/library` lists every tool ever
generated, filterable by category, and `/tool/[name]` shows the full deep
dive for any one of them.

The browser never calls Anthropic directly and never sees the API key — all
generation happens in the server route.

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up a free Postgres database (Supabase)

1. Create a free account at [supabase.com](https://supabase.com) and click
   **New project**. Pick any name/region and set a database password (save
   it — you'll need it in the connection strings).
2. Once the project is up, go to **Project Settings → Database →
   Connection string**.
3. Copy two URLs into your `.env`:
   - **`DATABASE_URL`** — the **Transaction pooler** (port `6543`) connection
     string. This is what the app uses at runtime.
   - **`DIRECT_URL`** — the **Session/Direct** connection string (port
     `5432`). Prisma uses this only for running migrations.
   - Supabase's connection strings put your DB password in the URL as
     `[YOUR-PASSWORD]` — swap in the real password you set in step 1.

Supabase's free tier (500MB database, unlimited API requests) is more than
enough for this app — it stores one row per day.

### 3. Get an Anthropic API key

Create a key at [console.anthropic.com](https://console.anthropic.com) and
set it as `ANTHROPIC_API_KEY`.

### 4. Set a cron secret

`CRON_SECRET` can be any random string — it's what protects `/api/scout` from
being called by anyone but you and Vercel Cron. Generate one with:

```bash
openssl rand -hex 32
```

### 5. Fill in `.env`

Copy `.env.example` to `.env` and fill in the four values from steps 2–4:

```bash
cp .env.example .env
```

### 6. Run the first migration

```bash
npx prisma migrate dev --name init
```

This creates the `Tool` table in your Supabase database.

### 7. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). On first visit, since no
tool exists for today yet, it will generate one live (takes ~20-40s while
Claude researches) and show the radar loading state in the meantime.

## Deploying

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add all four environment variables from your `.env` to the Vercel
   project's **Settings → Environment Variables**.
4. Deploy. Vercel reads `vercel.json` and registers the daily cron
   (`0 9 * * *`, i.e. 9:00 UTC) automatically — check **Settings → Cron
   Jobs** on the project to confirm it's there. Vercel signs cron requests
   with `Authorization: Bearer $CRON_SECRET` automatically, matching what
   `/api/scout` expects.
5. Trigger it once manually to seed the first Tool of the Day instead of
   waiting for the schedule:

   ```bash
   curl -X POST https://<your-deployment>.vercel.app/api/scout \
     -H "Authorization: Bearer <your CRON_SECRET>"
   ```

## Project structure

```
app/
  page.tsx              Home — today's tool (generates inline if missing)
  library/page.tsx       Library — every tool, filterable by category
  tool/[name]/page.tsx    Full deep dive for one tool
  api/scout/route.ts      The only place that calls Claude
components/
  ToolDetail.tsx          All deep-dive sections, in spec order
  Radar.tsx               The signature radar sweep (loading + empty states)
  LoadingState.tsx        Radar + cycling "scouting" status lines
  LibraryGrid.tsx         Client-side category filter + card grid
lib/
  scout.ts                scoutTool(): the Claude call, JSON extraction, retry
  schema.ts               Zod schema — the single source of truth for shape
  getTodaysTool.ts         Idempotent "get or generate today's row" logic
prisma/schema.prisma      The Tool model
```
