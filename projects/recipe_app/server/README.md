# Recipe App — Server (Backend)

This README documents the backend (server/) — how to run it, configured entrypoint, installed packages, and core modules.

## Quick start
1. Install dependencies:

   npm install

2. Create a `.env` in the server folder (example below).
3. Start development server:

   npm run dev

## Entry point & scripts
- Entry point used in development: src/app.ts
- package.json scripts (already configured):
  - dev: ts-node-dev --respawn --transpile-only src/app.ts
  - build: tsc
  - start: node dist/index.js

## Environment variables (.env example)
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://user:pass@host:27017/dbname
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=http://localhost:3000

## What the code contains
- src/app.ts — app setup, middleware wiring, and server start. It calls src/config/db.ts to connect to MongoDB before listening.
- src/config/db.ts — connects to MongoDB using process.env.MONGODB_URI. If missing, the app exits with an error.
- src/middlewares/errorHandler.ts — centralized error handler that returns JSON errors and hides stack traces unless NODE_ENV=development.
- src/services/authService.ts — registers users: checks existing email, hashes password with bcrypt, creates User.
- src/controllers/recipeController.ts — sample controller: getAllRecipe returns all recipes.
- src/controllers/userController.ts — currently empty; expected to hold user-related endpoints.
- src/models/\* — Mongoose models included:
  - User (users.ts): name, email (unique), password, image, role
  - Recipe (recipe.ts): title, preparation, media, publish flag, userId, categoryId, likes
  - Category (categories.ts): name

## Installed packages and their aims
### Runtime dependencies (from package.json)
- express — web framework for routes and middleware
- mongoose — MongoDB ODM used for models and DB access
- dotenv — loads .env into process.env for local development
- cors — CORS middleware
- bcrypt — password hashing for auth

### Dev dependencies
- typescript, ts-node-dev, @types/* — TypeScript and type definitions for development and hot reload

## Recommended config notes
- Ensure MONGODB_URI is set before starting. src/app.ts currently calls connectDB() and exits on failure.
- Keep db connection logic in src/config/db.ts simple: it connects once on startup. If you prefer per-request checks, add a small middleware to ensure connection without reconnecting on each request.
- Implement routes and register them in src/app.ts (currently routes are not wired).

## How to run in production
1. npm run build
2. Ensure environment variables are provided (MONGODB_URI, JWT_SECRET,...)
3. npm run start

## Next steps
- Implement userController and register routes in app.ts
- Add request validation and authentication middleware
- Add database seed/migration scripts if needed

---

Updated README to reflect current project files and dependencies.
