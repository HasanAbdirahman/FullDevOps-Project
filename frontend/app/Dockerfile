# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json & install
COPY package*.json ./
RUN npm install

# Copy all code
COPY . .

# Build argument for backend API URL
# make sure to run when building the image to not forget about the args
# docker build --build-arg REACT_APP_API_URL=http://backend-service:4000/api 
# -t myusername/devops-frontend:v1 ./frontend

ARG REACT_APP_API_URL

# Pass build argument as env variable for React build
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Run build
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
