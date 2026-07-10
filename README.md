# Pinky — Perfume Store (React + Vite)

A React storefront (catalog, cart, favorites, product admin, auth) built to
be dropped in front of a **Spring Boot** REST API.

## Running the frontend

```bash
npm install
npm run dev
```

By default the app expects an API at `http://localhost:8080/api`. Copy
`.env.example` to `.env` to change that:

```bash
cp .env.example .env
```

If no backend is reachable yet, the app automatically falls back to a local,
`localStorage`-backed copy of the catalog so you can keep developing the UI.
Once your Spring Boot service is up, real requests start flowing
automatically — no component code needs to change.

## Project structure

```
src/
  services/        // All HTTP calls live here — the only files that need
    apiClient.js    // to change if your backend's routes/shapes differ
    productService.js
    authService.js
  context/          // React Context providers (state shared across pages)
    AuthContext.jsx
    CartContext.jsx
    FavoritesContext.jsx
  component/
    RequireAuth.jsx // Route guard for pages that require login
    NavBar.jsx, Footer.jsx, Filter.jsx
  Page/             // One file per route
  config/env.js      // Reads VITE_API_BASE_URL
```

## Expected Spring Boot API contract

The frontend was written against the following REST shape. Build your
`@RestController`s to match this (or edit `src/services/*.js` to match
yours — that's the only place the endpoints are named).

### Products — `ProductController`

| Method | Path                                | Body / Query           | Returns                    |
|--------|--------------------------------------|-------------------------|-----------------------------|
| GET    | `/api/products`                     | —                        | `Product[]`                 |
| GET    | `/api/products?gender=male`         | —                        | `Product[]`                 |
| GET    | `/api/products/{id}`                | —                        | `Product`                   |
| POST   | `/api/products`                     | `Product` (no id)        | `Product` (with id)         |
| PUT    | `/api/products/{id}`                | `Product`                | `Product`                   |
| DELETE | `/api/products/{id}`                | —                        | 204                          |
| POST   | `/api/products/{id}/reviews`        | `{ rating }`              | `Product` (updated)          |
| DELETE | `/api/products/{id}/reviews/{reviewId}` | —                    | `Product` (updated)          |

```ts
type Product = {
  id: number;
  name: string;
  brand: string;
  gender: "male" | "female";
  price: number;
  oldPrice?: number | null;
  rating: number;
  reviewsCount: number;
  reviews: { id: number; rating: number; date: string }[];
  badge?: string | null;
  stock: number;
  image: string;
  smell: string;
  description?: string;
  notes: { top: string; heart: string; base: string };
  size: string;
};
```

### Auth — `AuthController`

| Method | Path              | Body                                | Returns                          |
|--------|-------------------|--------------------------------------|-----------------------------------|
| POST   | `/api/auth/register` | `{ name, email, password }`       | `{ token, user }`                 |
| POST   | `/api/auth/login`    | `{ email, password }`             | `{ token, user }`                 |
| GET    | `/api/auth/me`       | — (Bearer token)                  | `{ id, name, email, role }`       |

The frontend stores the returned JWT in `localStorage` and sends it as
`Authorization: Bearer <token>` on every subsequent request (see
`src/services/apiClient.js`). Configure Spring Security to issue/validate a
JWT accordingly, and enable CORS for the Vite dev origin
(`http://localhost:5173`) or use the built-in dev proxy in
`vite.config.js`, which forwards `/api/*` to `http://localhost:8080` so no
CORS config is needed during local development.

### What's still local-only

`CartContext` and `FavoritesContext` currently persist to `localStorage`
only (no backend calls). If you want cart/wishlist to sync across devices,
add `/api/cart` and `/api/favorites` endpoints and wire them into those two
context files the same way `productService.js` is wired up.
