FROM node:16.13.1-alpine3.13

WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force && rm -rf node_modules && npm install
COPY . .