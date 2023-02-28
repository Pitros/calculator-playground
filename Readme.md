# Calculator app

Simple calculator with basic operations with use of BE & FE communication.

## Running development preview via Docker

Everything is configured for quick dev run/preview, each directory (be/fe) contains own dockerfile. 

```
docker-compose build
docker-compose up
```

FE will be available at: http://localhost:3040

BE will ba available at: http://localhost:3050

## BE

Requirements: Node ^18

Simple setup with express, zod for request body validation, some middlewares for async errors and error handler.

Code architecture should be split into domains, but as for now it's just single domain and some basic file splitting.
Server entry file is bare minimum to run app, I saw no point of complicating it even more.

How to run:

1. Clone repo and open be dir
2. Build backend `npm run build`
3. Start backend `npm run dev`

App will start automatically on port 3010

Tests:

Run with `npm run test`

## FE

Setup is done with Vite, which gives almost zero config option to build React app.
App uses RemoteCalculator component which uses custom calculator hook which communicates with BE for all logic.
It fetches list of available calculator actions (buttons) and initial state, then chosen action with current state is sent to get results.

Requirements: Node ^18

1. Clone repo and open be dir
2. If needed adjust config by copying `.env` file and tweak API host
3. Start backend `npm run dev`
