# Dockerfile for Next.js application with multi-stage build
# Build stage
FROM node:20-alpine AS builder

# Add metadata labels
LABEL maintainer="Nalej Team"
LABEL org.opencontainers.image.title="Gitlab Project Store V2"
LABEL org.opencontainers.image.description="Next.js application for Gitlab project analytics"
LABEL org.opencontainers.image.version="latest"
LABEL org.opencontainers.image.source="https://gitlab.com/nalej/gitlab-project-store-v2"

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./
RUN corepack enable && npm install --frozen-lockfile

# Copy all code and build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- 2nd stage: runtime ----------
FROM node:20-alpine

# Add metadata labels to runtime stage
LABEL maintainer="Nalej Team"
LABEL org.opencontainers.image.title="Gitlab Project Analytics"
LABEL org.opencontainers.image.description="Next.js application for Gitlab project analytics"
LABEL org.opencontainers.image.version="latest"
LABEL org.opencontainers.image.source="https://gitlab.ai.nalej.io/nalej/defense-point/gitlab-project-store-v2"

# Create non-privileged user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

WORKDIR /app
ENV NODE_ENV=production

# Copy artifacts from the builder stage with proper ownership
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Switch to non-privileged user
USER nextjs

# Default Next.js port
EXPOSE 3000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Startup command
CMD ["npm", "start"]
