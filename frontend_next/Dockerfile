# ---- Base image ----
FROM node:20-alpine AS base
WORKDIR /app

# Copy package files
COPY package*.json ./

# ---- Development stage ----
FROM base AS dev
RUN npm install
COPY . .
# Enable hot reload for Next.js in dev
CMD ["npm", "run", "dev"]

# ---- Production build stage ----
FROM base AS build
RUN npm install
COPY . .
RUN npm run build

# ---- Production runtime ----
FROM node:20-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only what’s needed to run
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
