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
RUN pnpm install --frozen-lockfile --filter backend...
RUN pnpm --filter backend... build
RUN pnpm prune --prod --filter backend...

FROM node:18-alpine AS runner
WORKDIR /srv/app
ENV NODE_ENV=production \
    PNPM_HOME="/usr/local/share/pnpm" \
    PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY apps/backend/package.json apps/backend/package.json
COPY --from=builder /srv/app/node_modules ./node_modules
COPY --from=builder /srv/app/packages ./packages
COPY --from=builder /srv/app/apps/backend/dist ./apps/backend/dist
WORKDIR /srv/app/apps/backend
EXPOSE 5000
CMD ["node", "dist/index.js"]

