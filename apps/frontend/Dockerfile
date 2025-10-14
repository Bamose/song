# syntax=docker/dockerfile:1

FROM node:18-alpine AS base
WORKDIR /srv/app
ENV PNPM_HOME="/usr/local/share/pnpm" \
    PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
# Copy workspace manifests
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
# Copy frontend and packages
COPY apps/frontend ./apps/frontend
COPY packages ./packages
# Install deps for the workspace
RUN pnpm install --frozen-lockfile
# Build shared packages used by frontend
RUN pnpm --filter "@song-app/types" build
# Optionally build the app (CRA dev server does not need this)
# RUN pnpm --filter frontend build

FROM base AS runner
WORKDIR /srv/app
# Keep workspace awareness for dev server
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
# Copy package.jsons and built artifacts for local packages
COPY packages/types/package.json ./packages/types/package.json
COPY --from=builder /srv/app/packages/types/dist ./packages/types/dist
# Copy frontend sources
COPY apps/frontend ./apps/frontend
# Install dependencies (dev needed for CRA start)
RUN pnpm install

WORKDIR /srv/app/apps/frontend
EXPOSE 3000
CMD ["pnpm", "dev"]

