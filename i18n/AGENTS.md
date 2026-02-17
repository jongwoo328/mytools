# I18N KNOWLEDGE BASE

## OVERVIEW

Single source of truth for locale messages and Nuxt i18n wiring.

## SCOPE

- Applies to `i18n/i18n.config.ts` and `i18n/locales/*.json`.
- Defines local deltas only; inherit root rules from `AGENTS.md`.

## WHERE TO LOOK

| Task                   | Location                        | Notes                                      |
| ---------------------- | ------------------------------- | ------------------------------------------ |
| i18n runtime wiring    | `i18n/i18n.config.ts`           | Imports locale JSON and exposes `messages` |
| English source strings | `i18n/locales/en.json`          | Keep keys authoritative and structured     |
| Korean translations    | `i18n/locales/ko.json`          | Key parity with English is required        |
| Locale strategy config | `nuxt.config.ts` (`i18n` block) | `prefix_and_default`, locale definitions   |

## LOCAL CONVENTIONS

- Preserve key parity between `en.json` and `ko.json`.
- Keep key paths aligned with feature taxonomy (`index`, `converter`, `formatter`, `viewer`, `calculator`).
- Prefer nested key groups over flat, unrelated top-level keys.
- Keep locale labels in sync with language switcher expectations (`common.locales.*`).

## UPDATE WORKFLOW

- Add/update key in `i18n/locales/en.json`.
- Mirror same key path in `i18n/locales/ko.json`.
- Confirm affected pages/components still resolve via `t("...")`.

## ANTI-PATTERNS (I18N)

- Do not add keys to only one locale file.
- Do not rename key paths without updating all call sites.
- Do not bypass locale helpers with hardcoded localized routes.
