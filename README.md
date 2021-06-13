# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Docker

---

Create and start containers (Detached mode: Run containers in the background)

```
docker-compose up -d
```

Stop and remove containers, networks (Remove named volumes declared in the volumes section of the Compose file and anonymous volumes attached to containers.)

```
docker-compose down -v
```

## Testing

---

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

## Typescript check

---

Compile typescript

```
npm run build
```

Running application

```
npm start
```
