FROM node:20-alpine AS build
WORKDIR /app

# Set npm to use a specific registry and add retry logic
RUN npm config set registry https://registry.npmjs.org/
RUN npm config set fetch-retry-maxtimeout 600000
RUN npm config set fetch-retry-mintimeout 10000

# Increase Node.js memory limit to 1.5GB since we have the available memory
ENV NODE_OPTIONS="--max-old-space-size=1536"

# Clear npm cache and tmp directories after installations
RUN npm cache clean --force

COPY package*.json ./
RUN npm install --legacy-peer-deps --verbose \
    && npm cache clean --force \
    && rm -rf /tmp/*

COPY . .

ARG REACT_APP_API_URL
ARG REACT_APP_WS_URL
ARG REACT_APP_BASE_PATH

ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_WS_URL=${REACT_APP_WS_URL}
ENV REACT_APP_BASE_PATH=${REACT_APP_BASE_PATH}

RUN npm run build \
    && npm cache clean --force \
    && rm -rf /tmp/* \
    && rm -rf node_modules

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create nginx user and set up directories
RUN addgroup -g 1000 nginxuser && \
    adduser -D -s /bin/sh -u 1000 -G nginxuser nginxuser && \
    mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chown -R nginxuser:nginxuser /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d && \
    chown -R nginxuser:nginxuser /usr/share/nginx/html && \
    touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxuser /var/run/nginx.pid

EXPOSE 80

USER nginxuser

CMD ["nginx", "-g", "daemon off;"]
