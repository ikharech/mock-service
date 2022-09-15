FROM node:16.13.1-alpine3.13
WORKDIR /app
COPY /package*.json /app/
RUN npm config set unsafe-perm true
RUN npm install
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
RUN chown -R node /app/node_modules
USER node
COPY . /app