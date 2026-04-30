# Recipe App — Server (Backend)

This README explains how to configure and run the backend located in the `server/` folder, and documents installed packages with their aims.

## Prerequisites
- Node.js (recommended v18+)
- npm (comes with Node.js)

## Install
1. From the server folder:

   npm install

2. Install runtime dependencies (if needed):

   npm install express mongoose dotenv cors

3. Install dev dependencies (if needed):

   npm install -D typescript ts-node-dev @types/express @types/cors @types/node

## Project layout (important files/folders)
- src/
  - index.ts — application entrypoint
  - config/
  - controllers/ — request handlers (routes implementation)
  - routes/ — API route definitions
  - models/ — data models
- tsconfig.json — TypeScript configuration
- package.json — dependency list
- .env — environment variables (not committed)

> If some folders are empty in this repo, the app expects them to exist for typical Express-style projects.

## Installed packages and their aims
### Dependencies
- express (^5.2.1)
  - Purpose: Minimal and flexible Node.js web framework used to define routes, middleware, and handle HTTP requests/responses.
- cors (^2.8.6)
  - Purpose: Middleware to enable Cross-Origin Resource Sharing (CORS), allowing the frontend to call this API from another origin.
- dotenv (^17.4.2)
  - Purpose: Loads environment variables from a `.env` file into process.env for local development.
- mongoose (^9.6.1)
  - Purpose: MongoDB Object Data Modeling (ODM) library — defines schemas, models, and provides convenient DB access and validation.

### Dev dependencies
- typescript (^6.0.3)
  - Purpose: Adds static typing and compiles TS to JS.
- ts-node-dev (^2.0.0)
  - Purpose: Development server that runs TypeScript directly with automatic restarts on changes (hot-reload-like behavior).
- @types/express (^5.0.6)
  - Purpose: TypeScript type definitions for Express (compile-time only).
- @types/cors (^2.8.19)
  - Purpose: Type definitions for cors.
- @types/node (^25.6.0)
  - Purpose: Node.js type definitions for TypeScript (fs, path, process, etc.).

## Configuration (Environment variables)
Create a `.env` file in the server folder (do NOT commit it). Example variables the backend may need:

PORT=3000
NODE_ENV=development
# Example DB (for Mongoose/MongoDB):
MONGODB_URI=mongodb://user:pass@host:27017/dbname
JWT_SECRET=your_jwt_secret_here

Adjust names to match your implementation.

## Development
1. Add a dev script to package.json (recommended):

```
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc -p .",
  "start": "node dist/index.js"
}
```

2. Start dev server:

   npm run dev

## Build & Production
1. Build TypeScript to JS:

   npm run build

2. Start built app:

   npm run start

(Ensure your `index.ts` compiles to `dist/index.js` or adjust the start script accordingly.)

## CORS
Configure allowed origins in the code (e.g., in `src/index.ts`) or via an environment variable. Example:

```ts
import cors from 'cors';
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
```

## Notes & Next steps
- If using MongoDB, ensure `MONGODB_URI` is set and the DB is reachable. Add migration/seed scripts if required.
- Replace example env names with the exact ones your code expects.
- Never commit `.env` or secrets to git; use env variables in CI or a secrets manager for production.

---


