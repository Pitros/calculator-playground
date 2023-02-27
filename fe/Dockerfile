# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

COPY . .
COPY public .
COPY src .

RUN npm install 

CMD [ "npm", "run", "dev" ]
