[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# cosmo-connect
This is a [Moleculer](https://moleculer.services/)-based microservices project designed to demonstrait the benifits of microservice architecture using the Moneculer framework.

## Usage
Ensure you have Node.js, Docker and docker-compose installed, then set up the Moleculer project:
```
cd cosmo-connect
npm install 
```
Start the stack with docker-compose:
```
npm run dc:up
```

## Services
- **api**: API Gateway services.

- **planets**: Manages planets.

- **satellites**: Manages satellites orbiting planets.

## Endpoints
**Planets API**

- List all planets: `GET http://localhost:3000/api/planets`

- Create a planet: `POST http://localhost:3000/api/planets`

    `Body: { "name": "Mars", "type": "Terrestrial" }`

- Get a planet by ID: `GET http://localhost:3000/api/planets/:id`

- Remove a planet: `DELETE http://localhost:3000/api/planets/:id`

**Satellites API**


- List all satellites: `GET http://localhost:3000/api/satellites`

- Create a satellite: `POST http://localhost:3000/api/satellites`

    Body: { "name": "Phobos", "planetId": "mars_id" }

- Get a satellite by ID: `GET http://localhost:3000/api/satellites/:id`

- Get satellites by planet: `GET http://localhost:3000/api/satellites/planet/:planetId`

- Remove a satellite: `DELETE http://localhost:3000/api/satellites/:id`

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
- `npm run dc:up`: Start the stack with docker-compose
- `npm run dc:down`: Stop the stack with docker-compose
