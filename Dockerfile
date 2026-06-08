# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm ci

COPY prisma.config.ts ./
COPY prisma/ ./prisma/
RUN npx prisma generate

COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

# ---- Production Stage ----
FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
COPY prisma.config.ts ./
COPY --from=builder /app/dist ./dist

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
