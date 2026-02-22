# PAGES KNOWLEDGE BASE

## OVERVIEW

Route-level orchestration for tool features, metadata, and localized routing.

## SCOPE

- Applies to `pages/**/*.vue`.
- Defines local deltas only; inherit global rules from root `AGENTS.md`.

## WHERE TO LOOK

| Task                         | Location                 | Notes                                      |
| ---------------------------- | ------------------------ | ------------------------------------------ |
| Register home listing/filter | `pages/index.vue`        | `availableTools` is source for home cards  |
| Add converter route          | `pages/converter/*.vue`  | Keep family pattern + use `ToolPageLayout` |
| Add formatter route          | `pages/formatter/*.vue`  | Existing pair: `json.vue`, `sql.vue`       |
| Add viewer route             | `pages/viewer/*.vue`     | Existing pairings wrap domain components   |
| Add calculator route         | `pages/calculator/*.vue` | Keep route taxonomy consistent             |

## LOCAL CONVENTIONS

- Use `useI18n()` and `useLocalePath()` in page scripts.
- Add JSON-LD breadcrumbs with `useJsonld()` on feature pages.
- Keep pages thin: compose feature components; avoid heavy reusable logic in page files.
- Use `ToolPageLayout` for title/description scaffolding.

## PAGE CHECKLIST

- Route path stays inside existing families (`converter`, `formatter`, `viewer`, `calculator`).
- `<Head>` metadata uses localized title/description keys.
- Breadcrumb JSON-LD includes root item and current page item.
- Added user-facing strings exist in both locale files (`en.json`, `ko.json`).

## ANTI-PATTERNS (PAGES)

- Do not introduce ad-hoc route families without explicit taxonomy update.
- Do not hardcode non-localized user-facing strings in templates for translatable UI.
- Do not move shared behavior into multiple pages; extract into `components/`, `composables/`, or `utils/`.
