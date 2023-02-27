# Calculator app

Simple calculator with basic operations, in both FE only and FE & BE app.

## Running development preview via Docker

Everything is configured for quick dev run/preview

```
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

Requirements: Node ^18

No config setup with Vite, includes `Calculator` and `RemoteCalculator` components.
Remote one communicates with BE to get all data, basically overkill, communication is simplified.

1. Clone repo and open be dir
2. If needed adjust config by copying `.env` file and tweak API host
3. Start backend `npm run dev`

