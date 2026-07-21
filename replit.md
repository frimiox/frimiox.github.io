# FrimioXTech – Apps Worth Exploring

A curated app-showcase platform — a browseable directory of projects ("apps worth exploring") with search, category filtering, and featured sorting.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite 7, Tailwind CSS v4, shadcn/ui, Wouter, TanStack Query |
| Backend | Express 5 (TypeScript, ESM, esbuild) |
| Database | PostgreSQL via Drizzle ORM |
| Monorepo | pnpm workspaces |

## Workspace layout

```
artifacts/
  app-showcase/   React + Vite frontend  (preview path: /)
  api-server/     Express API server     (preview path: /api)
  mockup-sandbox/ Canvas component sandbox (preview path: /__mockup)
lib/
  db/             Drizzle ORM schema + migrations
  api-zod/        Shared Zod validation schemas
  api-client-react/ TanStack Query hooks (generated from OpenAPI)
  api-spec/       OpenAPI spec + Orval codegen config
```

## Running the project

Dependencies are managed at the workspace root:

```bash
pnpm install          # install all workspace deps
```

Workflows (started automatically by Replit):
- **App Showcase** (`artifacts/app-showcase: web`) – `pnpm --filter @workspace/app-showcase run dev`
- **API Server** (`artifacts/api-server: API Server`) – `pnpm --filter @workspace/api-server run dev`

## Database

The project uses Drizzle ORM with PostgreSQL. The `DATABASE_URL` secret must be set before running the API server in production. Add tables to `lib/db/src/schema/`, then push with:

```bash
pnpm --filter @workspace/db run push
```

## API codegen

OpenAPI spec lives in `lib/api-spec/openapi.yaml`. To regenerate the React query hooks after editing the spec:

```bash
pnpm --filter @workspace/api-spec run codegen
```

## User preferences

_None recorded yet._
