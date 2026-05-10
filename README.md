# Benny Shop

A React + Vite storefront/dashboard application with shop pages, user profile, cart/wishlist flows, and file management.

## Features

- Shop UI with product browsing, product detail, cart, wishlist, and profile pages
- File management pages with upload, favorites, dashboard, and preview components
- React Router v6 navigation
- Query data fetching with TanStack React Query
- Animated UI with Framer Motion
- Tailwind CSS and Radix UI component styling
- Mock API adapter in `src/api/mockApiClient.js`

## Project Structure

- `src/main.jsx` - Application entry point
- `src/App.jsx` - Root app component and routing
- `src/pages/` - Page views for shop, files, dashboard, upload, and error handling
- `src/components/` - Reusable UI and layout components
- `src/api/` - API client adapter and mock implementation
- `src/lib/` - App utilities, auth context, query client, and app params
- `src/components/ui/` - Local UI primitives and Radix wrappers

## Getting Started

### Requirements

- Node.js 18+ (tested with Node 24)
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev -- --host
```

Then open the app in your browser at:

- `http://127.0.0.1:4173`
- or `http://localhost:4173`

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build production files
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix lint issues automatically
- `npm run typecheck` - Run TypeScript/JS config type checks

## Notes

- Path alias `@` is configured to point to `src/`
- App data currently uses the mock API client in `src/api/mockApiClient.js`
- To customize app params, update `src/lib/app-params.js`

## Useful files

- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `jsconfig.json` - JavaScript path alias configuration

## License

This project is currently private and configured for local development.
