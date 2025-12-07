# Repository Guidelines

## Project Structure & Module Organization
- React 17 + TypeScript via Create React App.
- `src/index.tsx` bootstraps the app and router; `src/App.tsx` defines routes for `pages/` views (Home, FastList, About, Privacy).
- Page-level UI lives in `src/pages/`; shared components in `src/components/` (NavBar, Alert, AdComponent); list logic and types sit in `src/List.tsx` and `src/types.ts`.
- Global styles are in `src/index.css`; static assets live in `public/`; production bundles emit to `build/` after a release build.

## Build, Test, and Development Commands
- `npm start` — run the dev server on :3000 with live reload and lint feedback in the console.
- `npm test` — run Jest + React Testing Library in watch mode.
- `npm run build` — produce an optimized production bundle in `build/`.
- `npm run eject` — expose CRA internals; avoid unless absolutely necessary.

## Coding Style & Naming Conventions
- Use TypeScript and functional components (`React.FC`); favor hooks over class components.
- PascalCase components and files (`NavBar.tsx`), camelCase variables/functions, SCREAMING_SNAKE_CASE constants when needed.
- Centralize shared types in `src/types.ts`; export and reuse instead of redefining.
- JSX: 2-space indentation; wrap long prop lists across lines; keep components small and focused.
- Styling currently uses `index.css` and inline style objects—follow existing patterns; keep layout styles near the components they affect.
- CRA ESLint config is active; clear warnings before opening a PR.

## Testing Guidelines
- Jest + React Testing Library; place specs as `*.test.tsx` next to components.
- Cover rendering, routing, and list behaviors (add/remove/toggle, empty states, persistence expectations).
- `npm test -- --coverage` to inspect coverage locally; ensure new logic and edge cases are exercised.
- Prefer user-facing assertions (`screen.getByText`, `getByRole`) and avoid testing implementation details.

## Commit & Pull Request Guidelines
- Commits: short, imperative subjects (e.g., `Add fast list empty state`) grouped by logical change.
- PRs: include a brief summary, testing notes/commands run, screenshots or GIFs for UI changes, and links to related issues/tasks.
- Keep diffs scoped; call out breaking changes or required env vars (`REACT_APP_*`) in the PR body.

## Security & Configuration Tips
- Do not commit secrets; only expose client-safe config via `REACT_APP_*` in `.env`.
- Validate third-party assets/links before adding to `public/` and note any privacy implications.
