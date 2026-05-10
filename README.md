# Benny Shop Mobile

A React + Vite mobile-first storefront/dashboard application with shop pages, user profile, cart/wishlist flows, and file management. Built with a Node.js/Express backend API and MongoDB integration.

## Features

- Shop UI with product browsing, product detail, cart, wishlist, and profile pages
- File management pages with upload, favorites, dashboard, and preview components
- User authentication with JWT tokens
- React Router v6 navigation
- Query data fetching with TanStack React Query
- Animated UI with Framer Motion
- Tailwind CSS and Radix UI component styling
- Mock API adapter for development (`src/api/mockApiClient.js`)
- Real API client for production (`src/api/realApiClient.js`)
- Express.js backend with MongoDB integration
- Stripe payment integration ready

## Project Structure

### Frontend (`src/`)
- `src/main.jsx` - Application entry point
- `src/App.jsx` - Root app component and routing
- `src/pages/` - Page views for shop, files, dashboard, upload, and error handling
- `src/components/` - Reusable UI and layout components
- `src/api/` - API client adapters (mock and real implementations)
- `src/lib/` - App utilities, auth context, query client, and app params
- `src/components/ui/` - Local UI primitives and Radix wrappers

### Backend (`backend/`)
- `backend/server.js` - Express.js server entry point
- `backend/models/` - MongoDB schemas (User, Product, Order, File, Wishlist, Cart)
- `backend/routes/` - API route handlers (auth, products, cart, orders, files, users, wishlist)
- `backend/middleware/` - Express middleware (authentication)
- `backend/seed.js` - Database seeding script

## Getting Started

### Requirements

- Node.js 18+ (tested with Node 24)
- npm
- MongoDB 4.4+ (optional for mock mode)
- Docker (optional for running MongoDB)

### Install dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd backend
npm install
cd ..
```

### Run locally

#### Option 1: Frontend Only (Mock API - Recommended for development)

```bash
npm run dev
```

Then open the app in your browser at:
- `http://localhost:5173`

This mode uses the mock API client with sample data and requires no database setup.

#### Option 2: Frontend + Backend (Real API)

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

**Note:** Backend requires MongoDB running on `mongodb://localhost:27017/benny-shop-mobile`

You can start MongoDB with Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Scripts

### Frontend Scripts
- `npm run dev` - Start Vite dev server on http://localhost:5173
- `npm run build` - Build production files
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix lint issues automatically
- `npm run typecheck` - Run TypeScript/JS config type checks

### Backend Scripts
```bash
cd backend
npm run dev       # Start backend with nodemon on http://localhost:5000
npm run start     # Start backend server
npm run seed      # Seed database with sample data
npm run test      # Run tests
```

## Notes

- Path alias `@` is configured to point to `src/`
- **Development Mode**: App uses mock API client (`src/api/mockApiClient.js`) with sample data
- **Production Mode**: Switch to real API client (`src/api/realApiClient.js`) when backend is available
- Backend API requires MongoDB connection at `mongodb://localhost:27017/benny-shop-mobile`
- JWT authentication tokens are stored in localStorage
- To customize app params, update `src/lib/app-params.js`
- Frontend and backend can run independently - frontend works with mock data even without backend

### Environment Variables

#### Backend (`backend/.env`)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/benny-shop-mobile
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_...
NODE_ENV=development
```

#### Frontend
No environment file needed - Vite config uses `VITE_API_URL` environment variable (defaults to `http://localhost:5000/api`)

## Useful Resources

### Configuration Files
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `jsconfig.json` - JavaScript path alias configuration
- `eslint.config.js` - ESLint configuration
- `backend/.env` - Backend environment variables

### API Documentation

#### Mock API (`src/api/mockApiClient.js`)
Returns sample data for testing without a backend:
- Users, products, files, orders, wishlist items with mock data
- Simulates authentication and file uploads
- Perfect for UI development and testing

#### Real API (`src/api/realApiClient.js`)
Communicates with Express.js backend:
- Full user authentication with JWT
- Product catalog management
- Shopping cart and wishlist
- File upload and management
- Order processing with Stripe integration

### Database Models

The backend includes the following MongoDB models:
- **User**: User accounts with hashed passwords
- **Product**: Product catalog
- **Order**: Customer orders
- **File**: Uploaded files management
- **Wishlist**: User wishlist items
- **Cart**: Shopping cart items

## License

This project is currently private and configured for local development.
