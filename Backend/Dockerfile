# Use the Node.js image for building
FROM node:18.16.0-alpine3.17 AS builder
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY src/ ./src/
RUN npm run build

# Use the Node.js image for the final app
FROM node:18.16.0-alpine3.17 as app
WORKDIR /app
COPY --from=builder /app/package.json ./
RUN npm install
COPY --from=builder /app/dist ./dist

# Install additional language runtimes and setup the server
RUN apk add --no-cache \
  python3 \
  openjdk11 \
  gcc \
  g++ \
  ruby \
  lua5.3 \
  perl \
  go \
  rust \
  cargo

# Expose the port for the server
EXPOSE 4000

# Command to start the server
CMD ["npm","start"]