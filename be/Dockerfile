# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

COPY . .
COPY src .

RUN npm install

RUN npm run build

RUN npm prune --production

CMD [ "node", "dist/server.js" ]
