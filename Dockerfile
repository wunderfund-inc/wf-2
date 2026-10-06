# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies for node-gyp
RUN apk add --no-cache python3 make g++

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci && \
    npm cache clean --force

# Copy source code
COPY . .

# Build the Nuxt application
RUN npm run build

# Production stage
FROM node:18.19.0-alpine

WORKDIR /app

# Install dumb-init to handle signals properly
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxtjs -u 1001

# Copy built application and node_modules from builder
COPY --from=builder --chown=nuxtjs:nodejs /app/.nuxt ./.nuxt
COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules ./node_modules
COPY --chown=nuxtjs:nodejs package.json package-lock.json ./

# Copy static and other necessary files
COPY --chown=nuxtjs:nodejs static ./static
COPY --chown=nuxtjs:nodejs nuxt.config.js ./
COPY --chown=nuxtjs:nodejs server-middleware ./server-middleware
COPY --chown=nuxtjs:nodejs app ./app
COPY --chown=nuxtjs:nodejs assets ./assets

# Switch to non-root user
USER nuxtjs

# Expose port
EXPOSE 3000

# Environment variables
ENV HOST=0.0.0.0 \
    NODE_ENV=production \
    PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use dumb-init to properly handle signals
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
