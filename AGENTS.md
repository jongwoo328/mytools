# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-17T19:07:50+09:00
**Commit:** cce2f7f
**Branch:** develop

## OVERVIEW

Nuxt 3 app for browser-only developer utilities (formatter, converter, viewer, calculator). Most feature logic is client-side in Vue pages/components; no server API layer in this repo.

## PRECEDENCE

- Scope order: root `AGENTS.md` -> nearest child `AGENTS.md`.
- Child files define local deltas only; do not duplicate parent rules.

## STRUCTURE

```text
mytools/
├── pages/         # Route-level feature orchestration + SEO metadata
├── components/    # Feature UI + shared UI building blocks
├── i18n/          # Locale config and translation source of truth
├── plugins/       # Third-party runtime registrations
├── composables/   # Reusable reactive/browser logic
├── models/        # Domain objects (notably color conversion)
├── utils/         # Small pure helpers
└── nuxt.config.ts # Runtime modules, SSR/prerender, app-wide settings
```

## WHERE TO LOOK

| Task                   | Location                                       | Notes                                                                        |
| ---------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------- |
| Add a new tool route   | `pages/`                                       | Follow existing family: `converter/`, `formatter/`, `viewer/`, `calculator/` |
| Wire shared UI         | `components/common/`                           | `ToolPageLayout.vue`, header, locale/theme selectors                         |
| Feature component work | `components/<family>/`                         | Usually page composes one or more family components                          |
| Route metadata/SEO     | feature page `.vue`                            | `useJsonld` and localized title/description pattern is consistent            |
| Locale text updates    | `i18n/locales/en.json`, `i18n/locales/ko.json` | Keep keys in sync                                                            |
| Runtime integration    | `plugins/*.ts`, `nuxt.config.ts`               | Some third-party wrappers require client/runtime caveats                     |

## CODE MAP

| Symbol             | Type                | Location                           | Role                                       |
| ------------------ | ------------------- | ---------------------------------- | ------------------------------------------ |
| `defineNuxtConfig` | config root         | `nuxt.config.ts`                   | Modules, i18n, route prerender, dev server |
| `availableTools`   | route registry      | `pages/index.vue`                  | Home tool listing/filter source            |
| `menus`            | navigation registry | `components/common/PageHeader.vue` | Desktop/mobile menu model                  |
| `defineI18nConfig` | i18n config         | `i18n/i18n.config.ts`              | Locale message wiring                      |
| `offsetList`       | domain constant     | `constants/time.ts`                | Epoch converter timezone choices           |

## CONVENTIONS

- Feature pages consistently use `useI18n`, `useLocalePath`, and `useJsonld`.
- Route/page files are thin orchestrators; reusable UI logic sits in `components/`.
- Global style stack: Tailwind + PrimeVue + local SCSS per component/page.
- Formatting baseline: Prettier (`printWidth: 120`, semicolons, trailing commas).
- Lint scripts auto-fix (`--fix`) and are not safe as read-only checks.

## ANTI-PATTERNS (THIS PROJECT)

- Do not add server-side processing for user-sensitive tool data by default.
- Do not update only one locale file; `en.json` and `ko.json` must stay aligned.
- Do not bypass localized routing helpers (`useLocalePath` / `useSwitchLocalePath`).
- Do not silently introduce new route families outside existing feature taxonomy.

## UNIQUE STYLES

- Feature taxonomy is mirrored across `pages/` and `components/`.
- Result-heavy tools use list/item component patterns (`*ResultList*`, `*ResultListItem*`).
- Plugins register third-party Vue wrappers globally (`vue-codemirror`, `vue-cropper`, `vue-json-pretty`).

## COMMANDS

```bash
pnpm dev
pnpm build
pnpm generate
pnpm preview
pnpm lint
pnpm lint-eslint
pnpm lint-prettier
```

## NOTES

- Local dev expects cert files referenced in `nuxt.config.ts` (`cert/local.key`, `cert/local.crt`).
- `routeRules` prerenders all routes; route additions should assume static generation path.
- `plugins/vueCropper.ts` and `plugins/vueJsonPretty.ts` currently use `@ts-ignore` for imports.
