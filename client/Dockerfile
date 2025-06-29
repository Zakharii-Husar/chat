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
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
