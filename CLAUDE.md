# CLAUDE.md

## Architecture

- All tool logic runs client-side only — no server API or backend processing
- Pages are pre-rendered (SSR) so tool UI must work when hydrated on the client

## Requirements for all features

- Dark mode support is mandatory
- i18n (en/ko) support is mandatory
- Mobile responsive support is mandatory
- New tools must follow the same patterns as existing tool pages
