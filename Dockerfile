ARG NODE_VERSION=21.6.0
ARG PNPM_VERSION=8.15.1

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

FROM base as deps
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    --mount=type=bind,source=package.json,target=package.json,ro \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml,ro \
    pnpm install --prod --frozen-lockfile

FROM deps as build
COPY . .
COPY tsconfig.json ./

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    pnpm install --frozen-lockfile

RUN pnpm run build

# Development stage
FROM base AS development
ENV NODE_ENV=development
# USER root
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
# USER node
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]

# Production stage
FROM base AS production
ENV NODE_ENV=production
# USER node
# Copy over only necessary files
COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist/ ./dist/
EXPOSE 3000
CMD ["pnpm", "run", "start"]