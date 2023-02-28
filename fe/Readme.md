# FE

## Short intro

Setup is done with Vite, which gives almost zero config option to build React app.
App uses RemoteCalculator component which uses custom calculator hook which communicates with BE for all logic.
It fetches list of available calculator actions (buttons) and initial state, then chosen action with current state is sent to get results.

## How to dev run

Requirements: Node ^18

If needed edit .env.local file and change API url for backend

```
cp .env .env.local
```

Then install the app and simply run dev version

```
npm install
npm run dev
```

## Running with docker

App can be also run via Docker with included Dockerfile

```
docker build -t mccalc_fe .
docker run -p 3000:3000 --name mccalc_fe -it mccalc_fe
```

or just use docker-compose

```
docker-compose build
docker-compose up
```

## Tests

```
npm run test
```
