# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock*.json* ./
RUN npm install
COPY . .
RUN npm run build

# Production stage - serve with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Optional: replace default nginx.conf if you want custom routing/headers
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
