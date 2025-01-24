FROM node:20-alpine AS build
WORKDIR /app

# Set npm to use a specific registry and add retry logic
RUN npm config set registry https://registry.npmjs.org/
RUN npm config set fetch-retry-maxtimeout 600000
RUN npm config set fetch-retry-mintimeout 10000

COPY package*.json ./
RUN npm install --legacy-peer-deps --verbose

COPY . .

ARG REACT_APP_API_URL
ARG REACT_APP_WS_URL

ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_WS_URL=${REACT_APP_WS_URL}

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
