# ADVANCE IA - ENTERPRISE DOCKER ARCHITECTURE
# Optimized for Google Cloud Run (Serverless)

FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies (only required for build-time operations)
COPY package*.json ./
RUN npm install --production

# Static Server Strategy (for frontend distribution)
FROM nginx:alpine

# Copy application files (The real Advance IA)
COPY . /usr/share/nginx/html/

# Custom Nginx Config for SPA Routing
RUN printf 'server {\n\
    listen 8080;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

# Port 8080 is the default for Google Cloud Run
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
