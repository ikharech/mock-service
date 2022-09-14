FROM node:16.13.1-alpine3.13
WORKDIR /app
COPY /package*.json /app/
RUN npm config set unsafe-perm true
RUN npm install
RUN chown -R node /app/node_modules
USER node
COPY . /app