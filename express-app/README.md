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

## Build application

```
npm run build
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

## Migration, create tables in the database

---

All migrations for creating tables and the administrator user are performed automatically when the application is launched

## Testing in the container

---

Go inside the container that is running in the background, run the following command

```
docker exec -it <name or id container> sh
```

Example with (**node_course_2021_node_1**)

```
docker exec -it node_course_2021_node_1 sh
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Testing

---

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```
