# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Downloading

```
git clone {repository URL}
```

## Installation

```
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

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

## Performance report

# Express

|                   |                              |                                        |
| ----------------- | ---------------------------- | -------------------------------------- |
| Requests          | [Completed]                  | 600                                    |
| Mean              | [respsonse/sec]              | 5.96                                   |
| Response latency  | [min, max, median, p95, p99] | 2, 234, 11, 31, 56.5 (msec)            |
| Scenario duration | [min, max, median, p95, p99] | 59.9, 638.4, 91.5, 182.2, 519.6 (msec) |
| Scenario counts   | [counts]                     | 100 (100%)                             |
| Status Codes      | [code:count]                 | "200": 300, "201": 200, "204": 100     |

# Fastify

|                   |                              |                                      |
| ----------------- | ---------------------------- | ------------------------------------ |
| Requests          | [Completed]                  | 600                                  |
| Mean              | [respsonse/sec]              | 6.02                                 |
| Response latency  | [min, max, median, p95, p99] | 2, 88, 11, 32, 57.5 (msec)           |
| Scenario duration | [min, max, median, p95, p99] | 61, 327.8, 97.3, 154.2, 264.2 (msec) |
| Scenario counts   | [counts]                     | 100 (100%)                           |
| Status Codes      | [code:count]                 | "200": 300, "201": 200, "204": 100   |
