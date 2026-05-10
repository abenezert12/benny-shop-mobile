# Benny Shop Mobile

A React + Vite mobile-first storefront/dashboard application with shop pages, user profile, cart/wishlist flows, and file management. This project is now frontend-only and uses a mock API for local development and Android packaging.

## Features

- Shop UI with product browsing, product detail, cart, wishlist, and profile pages
- File management pages with upload, favorites, dashboard, and preview components
- Mock authentication and file upload flow
- React Router v6 navigation
- Data fetching with TanStack React Query
- Animated UI with Framer Motion
- Tailwind CSS and Radix UI component styling
- Capacitor support for Android APK packaging
- PWA support with service worker and manifest

## Project Structure

### Frontend (`src/`)
- `src/main.jsx` - Application entry point
- `src/App.jsx` - Root app component and routing
- `src/pages/` - Page views for shop, files, dashboard, upload, and error handling
- `src/components/` - Reusable UI and layout components
- `src/api/` - Mock API client implementation
- `src/lib/` - App utilities, auth context, query client, and app params
- `src/components/ui/` - Local UI primitives and Radix wrappers

## Getting Started

### Requirements

- Node.js 18+ (tested with Node 24)
- npm
- Android Studio with Android SDK (required for APK builds)
- Java JDK 17+ (required by Android Studio)

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the app in your browser at:

- `http://localhost:5173`

This app runs with a mock API and does not require a backend server.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Build Android APK (Capacitor)

This project can be packaged as an Android APK using Capacitor. The resulting app is compatible with most modern Android devices.

#### Minimum compatibility
- Android 6.0+ (API level 23+) is the recommended minimum for Capacitor-built APKs
- For PWA use, any Android device with a modern browser should work

#### APK build steps

1. Install dependencies:
```bash
npm install
```

2. Build the web assets:
```bash
npm run build
```

3. Initialize Capacitor once:
```bash
npm run cap:init
```

4. Add Android support:
```bash
npm run cap:add-android
```

5. Sync the build into Android:
```bash
npm run cap:sync
```

6. Open the Android project in Android Studio:
```bash
npm run cap:open-android
```

7. Build an APK from Android Studio using `Build > Build Bundle(s) / APK(s)`.

#### Notes for Android compatibility
- Use Android Studio with SDK 31+ for best support
- If you need broader compatibility, adjust the Android `minSdkVersion` in `android/app/build.gradle`
- Use a stable WebView on older Android versions

## Scripts

- `npm run dev` - Start Vite dev server on http://localhost:5173
- `npm run build` - Build production files
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix lint issues automatically
- `npm run typecheck` - Run TypeScript/JS config type checks
- `npm run cap:init` - Initialize Capacitor configuration
- `npm run cap:add-android` - Add Android platform to Capacitor
- `npm run cap:copy` - Copy web assets into Capacitor native project
- `npm run cap:sync` - Sync the Android project
- `npm run cap:open-android` - Open Android Studio
- `npm run build:android` - Build web assets and sync Android project

## Notes

- Path alias `@` is configured to point to `src/`
- App uses mock API client (`src/api/mockApiClient.js`) for all data and authentication
- The app is frontend-only and does not require a backend server
- To customize app params, update `src/lib/app-params.js`
- Includes PWA support via `manifest.json` and `sw.js`

## Useful Resources

### Configuration Files
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `jsconfig.json` - JavaScript path alias configuration
- `eslint.config.js` - ESLint configuration

### API Documentation

#### Mock API (`src/api/mockApiClient.js`)
Returns sample data for testing without a backend:
- Users, files, and upload flows with mock implementations
- Simulates authentication and file uploads
- Ideal for UI development and mobile packaging

## License

This project is currently private and configured for local development.
