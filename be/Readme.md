# Calculator BE

## Short intro

Simple setup with express, zod for request body validation, some middlewares for async errors and error handler.

Code architecture should be split into domains, but as for now it's just single domain and some basic file splitting.
Server entry file is bare minimum to run app, I saw no point of complicating it even more.

## Running the app locally

Requirements: Node ^18

As app uses TS you need to build files first or use ts-node. 

Suggested running schema

```
npm install
npm run build
npm start
```

App will listen on default PORT=3010, but you can specify custom port via env variable.

## Docker image

App can be also run via Docker with included Dockerfile

```
docker build -t mccalc_be .
docker run -p 3010:3010 --name mccalc_be -it mccalc_be 
```

or just use docker-compose

```
docker-compose build
docker-compose up
```

## Tests

You can run tests with

```
npm test
```


