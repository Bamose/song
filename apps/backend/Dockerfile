# syntax=docker/dockerfile:1

FROM node:18-alpine AS base
WORKDIR /srv/app
ENV PNPM_HOME="/usr/local/share/pnpm" \
    PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/backend ./apps/backend
COPY packages ./packages
RUN pnpm install --frozen-lockfile
# Build workspace packages first
RUN pnpm --filter "@song-app/types" build
RUN pnpm --filter "@song-app/utils" build
# Then build backend
RUN pnpm --filter backend build

FROM node:18-alpine AS runner
WORKDIR /srv/app
ENV NODE_ENV=production \
    PNPM_HOME="/usr/local/share/pnpm" \
    PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy workspace configuration
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

# Copy packages (workspace dependencies) - both package.json and built dist
COPY packages/types/package.json ./packages/types/package.json
COPY packages/utils/package.json ./packages/utils/package.json
COPY --from=builder /srv/app/packages/types/dist ./packages/types/dist
COPY --from=builder /srv/app/packages/utils/dist ./packages/utils/dist

# Copy backend package.json and built files
COPY apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /srv/app/apps/backend/dist ./apps/backend/dist

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

WORKDIR /srv/app/apps/backend
EXPOSE 5000
CMD ["node", "dist/index.js"]

