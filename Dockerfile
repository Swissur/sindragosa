# Build client + server; run API + static SPA from one process (see server/src/index.ts)
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY client/package.json client/package.json
COPY server/package.json server/package.json
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
COPY package.json package-lock.json ./
COPY client/package.json client/package.json
COPY server/package.json server/package.json
RUN npm ci --omit=dev
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/knowledge ./knowledge
COPY --from=builder /app/plugin ./plugin
# Les deux marketplaces que GET /plugin recopie dans le zip (server/src/plugin/archive.ts)
COPY --from=builder /app/.claude-plugin ./.claude-plugin
COPY --from=builder /app/.agents ./.agents
CMD ["node", "server/dist/index.js"]
