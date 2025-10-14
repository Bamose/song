# 🎵 Song Manager (MERN Monorepo)

A compact overview of the project structure, stacks, deployments, and how to run with Docker from the root.

## 📁 Monorepo Structure

```
apps/
  backend/   # Express + TypeScript + MongoDB (Mongoose)
  frontend/  # React + TypeScript + Redux Toolkit + Redux Saga
packages/
  types/     # Shared TypeScript types
  utils/     # Shared utilities
docker-compose.yml
turbo.json
package.json
```

## 🗄️ Backend
- Express.js (TypeScript), MongoDB via Mongoose
- OpenAPI docs served with Scalar at `/docs` (spec at `/openapi.json`)
- Deployed on Render as a Docker service

Why: Express + TS keeps the API simple and type-safe; Mongoose provides schema and aggregation for stats.

## 🖥️ Frontend
- React (TypeScript), Redux Toolkit, Redux Saga, Emotion, Axios
- Deployed on Render (Docker)

Why: Redux Toolkit simplifies state; Saga handles async flows; Emotion enables co-located, themeable styles.

## 🐳 Run with Docker (from repo root)
Prereq: Docker Desktop installed and running.

```bash
# build images
pnpm run docker:build

# start stack in background
pnpm run docker:up

# (optional) show announced service URLs
pnpm run docker:up:announce
pnpm run docker:urls

# stop and remove containers
pnpm run docker:down
```

What starts:
- MongoDB on `27017`
- Backend on `5000`
- Frontend on `3000`

## 🔗 Environments
- Local: `http://localhost:3000` (frontend), `http://localhost:5000` (backend, docs at `/docs`)
- Production: Deployed on Render (Docker). Use your Render service URLs.

---
License: ISC
