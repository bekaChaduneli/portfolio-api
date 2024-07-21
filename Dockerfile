# Build stage
FROM node:20.8.0 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY .env ./
COPY . .
RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npx ts-node prisma/seed.ts
RUN npm run build

# Production stage
FROM node:slim
RUN apt-get update -y && apt-get install -y openssl
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app

# Copy built source code and node_modules from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3002
CMD ["node", "dist/index.js"]
