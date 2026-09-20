# syntax=docker/dockerfile:1
FROM node:26-alpine AS builder

WORKDIR /app

# Installed before the source is copied, so this layer is reused until the lockfile changes.
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

# The image derivatives are the whole build: sharp takes ~26 minutes over the source photos from
# cold and ~8 seconds when imagetools can read its cache. The cache lives on the builder rather
# than in a layer, so it survives the source changes that invalidate everything below `COPY . .`.
RUN --mount=type=cache,target=/app/node_modules/.cache/imagetools npm run build

FROM joseluisq/static-web-server:2-alpine AS runner

COPY --from=builder /app/build /var/public
COPY static-web-server.toml /etc/sws.toml

ENV SERVER_CONFIG_FILE=/etc/sws.toml

EXPOSE 8787
