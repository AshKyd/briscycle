FROM node:26-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM joseluisq/static-web-server:2-alpine AS runner

COPY --from=builder /app/build /var/public
COPY static-web-server.toml /etc/sws.toml

ENV SERVER_CONFIG_FILE=/etc/sws.toml

EXPOSE 8787
