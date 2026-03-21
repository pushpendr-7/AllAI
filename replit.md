# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── ai-directory/       # World AI Directory web app (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## World AI Directory (`artifacts/ai-directory`)

A React + Vite frontend app that is a directory of AI tools, shopping sites, and movie streaming platforms.

### Features
- **AI Directory**: 45 AI tools with search, category filter, sort, and detail modal
- **Shopping Directory**: India's top online shopping websites with pros/cons/trust score
- **Movies & OTT**: Streaming platforms with language and type filters

### Key Files
- `src/App.tsx` — Root component, tab state
- `src/pages/home.tsx` — AI tools directory page
- `src/pages/shopping.tsx` — Shopping sites page
- `src/pages/movies.tsx` — Movie/OTT streaming page
- `src/components/Navbar.tsx` — Top navigation
- `src/data/ai-tools.ts` — 45 AI tools data
- `src/data/shopping-sites.ts` — Shopping website data
- `src/data/movie-sites.ts` — Movie/OTT platform data
- `vercel.json` — Vercel deployment config (SPA rewrites)
- `vite.config.ts` — Vite config with Tailwind CSS v4 plugin

### Vercel Deployment
The app can be deployed to Vercel directly. Set the root directory to `artifacts/ai-directory/` in Vercel settings.

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/`.

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI 3.1 spec and Orval codegen config.
Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec.

### `scripts` (`@workspace/scripts`)

Utility scripts package.
