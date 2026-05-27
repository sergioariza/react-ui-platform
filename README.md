# react-ui-platform

A portfolio-grade React component library and design system built with modern tooling. Demonstrates monorepo architecture, accessible UI primitives, variant-driven styling, and automated versioning — all production-ready patterns without being tied to any specific application.

## Stack

| Layer | Technology |
|---|---|
| Language | TypeScript 5.8 (strict + `exactOptionalPropertyTypes`) |
| Framework | React 19 |
| Styling | Tailwind CSS v4 + `tailwind-merge` + `clsx` |
| Variants | class-variance-authority (CVA) |
| Accessibility | Radix UI primitives |
| Monorepo | pnpm workspaces + TurboRepo |
| Build | tsup (ESM + CJS + `.d.ts`) |
| Docs | Storybook 10 (`@storybook/react-vite`) |
| Versioning | Changesets |
| CI | GitHub Actions |

---

## Repository Structure

```
react-ui-platform/
├── apps/
│   └── storybook/                 # Storybook 10 documentation app
│       └── .storybook/
│           ├── master.ts            # Framework config, Tailwind v4 Vite plugin
│           └── preview.tsx        # Global CSS import, layout defaults
├── packages/
│   ├── ui/                        # Component library (@react-ui-platform/ui)
│   │   ├── src/
│   │   │   ├── components/        # One folder per component
│   │   │   │   ├── Button/
│   │   │   │   ├── CommandPalette/
│   │   │   │   ├── DataTable/
│   │   │   │   ├── DatePicker/
│   │   │   │   ├── Dialog/
│   │   │   │   ├── Dropdown/
│   │   │   │   ├── Input/
│   │   │   │   ├── Select/
│   │   │   │   ├── Sidebar/
│   │   │   │   ├── Tabs/
│   │   │   │   └── Toast/
│   │   │   ├── lib/
│   │   │   │   └── utils.ts       # cn() helper (clsx + twMerge)
│   │   │   └── index.ts           # Barrel — all public exports
│   │   ├── tailwind.css           # @import "tailwindcss" entry point
│   │   └── tsup.config.ts         # ESM + CJS + .d.ts build config
│   └── tsconfig/                  # Shared TypeScript configs
│       ├── base.json              # Strict ES2022, bundler resolution
│       └── react.json             # Extends base, adds DOM + JSX
├── .changeset/
│   └── config.json                # Changesets config (access: restricted)
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Lint + build on every push/PR
│       └── release.yml            # Changesets version bump on master
├── turbo.json                     # Task pipeline (build → lint → storybook)
├── pnpm-workspace.yaml
└── package.json                   # Root (private, delegates to turbo)
```

Each component folder follows a consistent pattern:

```
Button/
├── Button.tsx          # Component implementation (Radix + CVA)
├── Button.stories.tsx  # Colocated Storybook stories
└── index.ts            # Re-export
```

---

## Components

| Component | Primitives / Libraries | Key Features |
|---|---|---|
| **Button** | Radix Slot | CVA variants (default/destructive/outline/secondary/ghost/link), sizes (sm/md/lg/icon), `asChild` |
| **Input** | — | CVA variants (default/error), sizes, label/hint/error slots, prefix/suffix icons, `React.forwardRef` |
| **Select** | `@radix-ui/react-select` | Animated chevron, option groups, disabled states, scroll buttons |
| **Dialog** | `@radix-ui/react-dialog` | Portal, backdrop blur, animated content, X close button, focus trap |
| **Dropdown** | `@radix-ui/react-dropdown-menu` | Sub-menus, separators, icon slots, keyboard shortcuts |
| **DataTable** | `@tanstack/react-table` v8 | Sortable columns, row selection, pagination, empty state |
| **CommandPalette** | `cmdk` | Fuzzy search, ⌘K keyboard trigger, grouped results, inline + dialog modes |
| **DatePicker** | `@radix-ui/react-popover` + `react-day-picker` | Single date, date range, disabled dates, accessible calendar |
| **Toast** | `sonner` | success/error/warning/info variants, action button, queue management |
| **Tabs** | `@radix-ui/react-tabs` | Controlled + uncontrolled, disabled tabs |
| **Sidebar** | — | Collapsible (icon-only mode), mobile drawer + overlay, `SidebarBrand` slot, nav items with badges |

---

## Getting Started

### Prerequisites

- **Node.js** `>=22` — use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm)
- **pnpm** `>=9` — install with `npm install -g pnpm@9`

### 1. Clone the repository

```bash
git clone https://github.com/sergioariza/react-ui-platform.git
cd react-ui-platform
```

### 2. Use the correct Node version

The repo ships a `.node-version` file pinned to `22.12.0`. If you use `fnm`:

```bash
fnm use
```

Or with `nvm`:

```bash
nvm use
```

### 3. Install dependencies

```bash
pnpm install
```

pnpm workspaces installs all packages — `packages/ui`, `packages/tsconfig`, and `apps/storybook` — in a single pass.

### 4. Run Storybook

```bash
pnpm storybook
```

Opens **http://localhost:6006** — hot-reloads on every file save. This is the master development environment for browsing and interacting with all 11 components.

---

## Available Scripts

All scripts run from the **root folder** and are orchestrated by TurboRepo.

| Command | What it does |
|---|---|
| `pnpm storybook` | Start Storybook dev server on port 6006 |
| `pnpm build` | Compile `packages/ui` to `dist/` (ESM + CJS + `.d.ts`) |
| `pnpm lint` | Run `tsc --noEmit` across all packages |
| `pnpm build-storybook` | Build static Storybook for deployment |

---

## Package Details

### `@react-ui-platform/ui` — `packages/ui`

The component library. Built with **tsup** into three output formats:

| Output | File | Used by |
|---|---|---|
| ESM | `dist/index.js` | Bundlers (Vite, webpack) |
| CJS | `dist/index.cjs` | Node.js / Jest |
| Types | `dist/index.d.ts` | TypeScript consumers |

All components are exported from the single barrel `src/index.ts`. Import example:

```ts
import { Button, Input, Dialog, DataTable } from '@react-ui-platform/ui'
```

Peer dependencies (`react`, `react-dom`) are externalized — the consumer app provides them.

### `@react-ui-platform/storybook` — `apps/storybook`

Documentation app. Stories are colocated inside `packages/ui/src/components/*/` and picked up by the glob `../../../packages/ui/src/**/*.stories.@(ts|tsx)`.

Tailwind CSS v4 is applied via the `@tailwindcss/vite` plugin in `viteFinal`, with a `@source` directive in `packages/ui/tailwind.css` to ensure all component class names are scanned.

### `@react-ui-platform/tsconfig` — `packages/tsconfig`

Shared TypeScript configuration. Two presets:

- **`base.json`** — strict, `ES2022`, `moduleResolution: bundler`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`
- **`react.json`** — extends base, adds `DOM` + `DOM.Iterable` libs, sets `jsx: react-jsx`

---

## Architecture Decisions

**Why Radix UI?** Radix primitives provide WAI-ARIA compliant keyboard navigation, focus management, and screen reader support out of the box. Components handle accessibility behaviour; this library handles styling.

**Why CVA (class-variance-authority)?** CVA provides a type-safe, declarative API for component variants without runtime overhead. It generates Tailwind classes statically, which means Tailwind's scanner can detect them.

**Why Tailwind v4?** Tailwind v4 removes the config file in favour of CSS-first configuration (`@import "tailwindcss"`), ships a faster Vite-native plugin, and reduces setup overhead significantly.

**Why tsup?** tsup produces ESM + CJS + `.d.ts` with source maps in a single command, with no boilerplate config. Tree-shaking is enabled so consumers only bundle what they use.

**Why Changesets?** Changesets provides structured versioning with human-written changelogs. Access is set to `restricted` since this repo is a GitHub showcase, not an npm package.

---

## CI / CD

Two GitHub Actions workflows:

**`ci.yml`** — runs on every push and pull request to `master`:
1. Install pnpm
2. Set up Node 22
3. `pnpm install --frozen-lockfile`
4. `pnpm turbo lint build`

**`release.yml`** — runs on push to `master`, uses `changesets/action` to:
1. Consume pending changesets
2. Bump package versions
3. Update `CHANGELOG.md`
4. Create a version commit + tag

> No npm publishing is configured — this is a portfolio showcase.

---

## Versioning a Change

When contributing a change that warrants a version bump:

```bash
# 1. Create a changeset (interactive prompt)
pnpm changeset

# 2. Commit the generated .changeset/*.md file with your PR

# 3. On merge to master, the release workflow applies the version bump automatically
```

The `@react-ui-platform/storybook` package is excluded from versioning (it's an internal docs app).

---

## TypeScript Configuration

The root `packages/tsconfig/base.json` enforces a strict set of compiler options:

```
strict                      true   — enables all strict type checks
exactOptionalPropertyTypes  true   — optional props cannot be explicitly undefined unless typed so
noUncheckedIndexedAccess    true   — array/object index access returns T | undefined
noImplicitReturns           true   — all code paths must return
noUnusedLocals              true   — unused variables are errors
isolatedModules             true   — compatible with esbuild / tsup transforms
verbatimModuleSyntax        true   — enforces import type for type-only imports
```

Story files (`*.stories.tsx`) are excluded from `packages/ui/tsconfig.json` — they are type-checked exclusively by `apps/storybook/tsconfig.json` which has access to `@storybook/react`.
