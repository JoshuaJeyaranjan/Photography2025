# Photography2025

A client-side photography storefront and portfolio built with React and Vite.

This repository contains the front-end for a small photography e-commerce site — gallery, product (photo) pages, cart & checkout flows, and an admin area for managing content and orders. It's a Vite-powered React app using SCSS for styling and a few small context providers to manage auth, cart, and theme state.

## Key features

- Responsive gallery with image modal
- Cart and checkout pages (client-side flows)
- Admin area (pages wired in under `src/pages/Admin*`) for managing content and orders
- Theme toggle (light/dark) and a Back-to-Top helper
- Simple auth, cart, and theme context providers
- AVIF support detection util for optimized images
- Built with Vite for fast dev iteration and optimized builds

## Tech stack

- React (JSX)
- Vite (dev server & build)
- SCSS for styling
- Netlify configuration included (`netlify.toml`) for quick deploys

## Prerequisites

- Node.js 16+ (Node 18+ recommended)
- npm (or yarn/pnpm) — commands below use npm

## Quick start (development)

1. Install dependencies

```bash
npm install
```

2. Start the dev server

```bash
npm run dev
```

3. Open the app

Open the URL printed by Vite (usually http://localhost:5173) in your browser.

## Build and preview (production)

```bash
npm run build
npm run preview
```

The `build` command produces a production-ready `dist/` directory. The `preview` command serves the built app locally so you can test production behavior.

## Deploy

This project includes a `netlify.toml` configuration so it can be deployed directly to Netlify. Typical steps:

1. Push the repo to GitHub (or another remote host)
2. Create a new site in Netlify and connect the repository
3. Netlify will run `npm run build` by default (adjust build command / publish directory to `dist` if needed)

If you deploy elsewhere (Vercel, static host), point the host to the `dist/` folder produced by the build step.

## Environment & secrets

This is a client-side application and currently does not include any server-side secret management in the repo. If you add payment integrations or server endpoints you will likely need environment variables. Add them to a platform-specific config (Netlify environment variables, Vercel, or a `.env` file — do not commit secrets).

## Project structure (high level)

src/
- `main.jsx` - app entry and root rendering
- `App.jsx` - top-level routes and layout wiring
- `index.scss` / `styles/` - global styles and partials
- `components/` - reusable UI components (Nav, Footer, Gallery, Photo, ImageModal, ThemeToggle, CartIcon, BacktoTop, AdminNav...)
- `context/` - React context providers: `AuthContext`, `CartContext`, `ThemeContext`
- `pages/` - route-level pages (About, Contact, Cart, Checkout, Admin pages, Photo pages, etc.)
- `utils/` - small utilities (e.g. `useAvifSupport.js`)

Public and static assets live in the `public/` folder (open to the root). The `netlify.toml` file and top-level config files are in the repository root.

## Important files

- `vite.config.js` — Vite configuration
- `netlify.toml` — Netlify deploy config
- `package.json` — scripts and dependencies
- `src/utils/useAvifSupport.js` — detects AVIF support to serve optimized images

## Styling

This project uses SCSS. Globals and partials are in `src/styles/partials/` and `src/index.scss` wires everything together. Component-level styles are colocated as `<ComponentName>.scss` next to their component.

## Notes for contributors

- Follow the existing component structure (JSX + SCSS colocated)
- Keep styles scoped to components when possible
- Add unit / integration tests if you add business logic (this repo doesn't include a test runner by default)

Suggested steps when adding features:

1. Create/update a page in `src/pages/` or a component in `src/components/`
2. Add styles in the component's `.scss` file and import them in the component
3. If shared state is required, add or extend one of the context providers in `src/context/`

## Troubleshooting

- If the dev server doesn't start: ensure Node.js and npm are installed and compatible. Delete `node_modules` and run `npm install` again.
- If styles don't update: confirm your editor saves files and that Vite's HMR is running (check terminal output).
- Image optimization artifacts: if AVIF images are not served, the `useAvifSupport` util will fall back to standard formats.

## Testing locally (manual smoke tests)

- Open the gallery and check that the image modal opens and shows the selected photo
- Add items to the cart and walk through the checkout pages
- Toggle theme and refresh — theme should persist if the ThemeContext is implemented to persist

## Next steps / suggestions

- Add automated unit and E2E tests (Jest/React Testing Library + Playwright/Cypress)
- Add CI (GitHub Actions) to run linting and tests on PRs

## License

MIT

---

