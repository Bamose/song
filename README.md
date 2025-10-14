# 🎵 Song Manager (MERN Monorepo)

A compact overview of the project structure, stacks, deployments, and how to run with Docker from the root.

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

## 🖥️ Frontend
- React (TypeScript), Redux Toolkit, Redux Saga, styled css, Emotion, Axios
- Form validation: Zod + React Hook Form (`zodResolver`) in `apps/frontend/src/SongForm.tsx`
- Search & filters (URL state): [nuqs](https://nuqs.dev/) via `useQueryStates` in `apps/frontend/src/hooks/useSongFilters.ts`


## 🐳 Run with Docker (from repo root)
Prereq: Docker Desktop installed and running.

```bash
# build images
pnpm run docker:build

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

### Local Development
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- API Docs: `http://localhost:5000/docs`

### Production (Free Tier Cloud Services)
- Frontend: [https://songaddis.bekenaanella.workers.dev/](https://songaddis.bekenaanella.workers.dev/) (Cloudflare Workers)
- Backend: [https://song-api-sk0f.onrender.com](https://song-api-sk0f.onrender.com) (Render)
- API Docs: [https://song-api-sk0f.onrender.com/docs](https://song-api-sk0f.onrender.com/docs)
- Database: MongoDB Atlas (Free M0 Cluster)

 This project leveraging **three free cloud platforms** (Cloudflare Workers, Render, MongoDB Atlas) to deploy a full-stack application with **zero infrastructure costs**.

---

