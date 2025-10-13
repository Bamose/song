# 🎵 Song Manager - MERN Monorepo

A modern song management application built with the MERN stack (MongoDB, Express, React, Node.js) using a monorepo structure powered by Turborepo.

## 📁 Project Structure

```
song-app/
├── apps/
│   ├── backend/       # Express + MongoDB + Mongoose
│   └── frontend/      # React + Redux Toolkit + Redux Saga + TypeScript
├── packages/
│   └── types/         # Shared TypeScript interfaces
├── package.json
├── turbo.json
└── docker-compose.yml
```

## ✨ Features

### Backend
- RESTful API with Express.js
- MongoDB integration with Mongoose
- CRUD operations for songs
- Advanced statistics aggregation
- TypeScript support

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- Redux Saga for side effects
- Emotion for styled components
- Beautiful, responsive UI
- Real-time filtering
- Statistics dashboard

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- MongoDB (local or Docker)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd song-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Setup environment variables**
   
   Backend (apps/backend/.env):
   ```env
   MONGO_URI=mongodb://localhost:27017/songdb
   PORT=5000
   NODE_ENV=development
   ```
   
   Frontend (apps/frontend/.env):
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:6
   
   # Or use Docker Compose (includes MongoDB, backend, and frontend)
   docker-compose up
   ```

5. **Run the application**
   ```bash
   # Development mode (runs both backend and frontend)
   pnpm dev
   # or
   npm run dev
   ```

   The app will be available at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🐳 Docker Deployment

Run the entire stack with Docker Compose:

```bash
docker-compose up
```

This will start:
- MongoDB on port 27017
- Backend on port 5000
- Frontend on port 3000

## 📦 Available Scripts

### Root
- `pnpm dev` - Run all apps in development mode
- `pnpm build` - Build all apps
- `pnpm clean` - Clean all build artifacts

### Backend (apps/backend)
- `pnpm dev` - Start backend in development mode
- `pnpm build` - Build TypeScript to JavaScript
- `pnpm start` - Run production build

### Frontend (apps/frontend)
- `pnpm dev` - Start React development server
- `pnpm build` - Create production build
- `pnpm test` - Run tests

## 🛠 API Endpoints

### Interactive Docs
- Visit `http://localhost:5000/docs` for the Scalar-powered API explorer (OpenAPI document available at `/openapi.json`).

### Songs
- `GET /api/songs` - Get all songs (supports filtering)
- `GET /api/songs/:id` - Get song by ID
- `POST /api/songs` - Create new song
- `PUT /api/songs/:id` - Update song
- `DELETE /api/songs/:id` - Delete song
- `GET /api/songs/stats` - Get statistics

### Query Parameters
- `artist` - Filter by artist name
- `genre` - Filter by genre
- `album` - Filter by album

## 📊 Statistics

The app provides comprehensive statistics:
- Total songs, artists, albums, and genres
- Songs count by genre
- Songs count by artist
- Songs count by album

## 🎨 Tech Stack

### Backend
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- TypeScript - Type safety
- Nodemon - Hot reload

### Frontend
- React - UI library
- TypeScript - Type safety
- Redux Toolkit - State management
- Redux Saga - Side effects
- Emotion - CSS-in-JS
- Axios - HTTP client

### DevOps
- Turborepo - Monorepo management
- Docker - Containerization
- pnpm - Package manager

## 🔧 Development Tips

1. **Add new shared types**: Edit `packages/types/index.ts`
2. **Backend models**: Add to `apps/backend/src/models/`
3. **Redux slices**: Add to `apps/frontend/src/store/slices/`
4. **Sagas**: Add to `apps/frontend/src/store/sagas/`

## 📝 License

ISC

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
