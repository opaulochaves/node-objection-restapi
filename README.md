# api-so11os

##Requirements

- node >= 14
- yarn
- docker & docker-compose

## Getting Started

**Clone the repo and install the deps**

Make sure you have node >= 14 in your system. In case not, you can install it with [nvm](https://github.com/nvm-sh/nvm)

```sh
$ cd /into/your/workdir
$ git clone git@github.com:wandersonchaves/api-so11os.git
$ cd api-so11os
$ yarn install
```

**Create the .env file**

```sh
$ cd api-so11os
$ cp .env.example .env
# then update the env vars to the right values. ask a colleague for those.
```

**Run with docker**

```sh
# Open a new terminal window
$ docker-compose up --build
# You only need --build the first time you run or whenver you change
# `Dockerfile`, `docker-compose.yml` or change something in package.json like adding/removing a dependencie
```

The above command will start the server and the database

- Server (api) is available on port 3000 at [localhost:3000](http://localhost:3000)
- Database (postgres) is available on its standart port 5432

`docker-compose up` runs the server in `develop` using `nodemon` which means any change you make in the code
will reload the server for you.

**Log into the database using CLI**

```sh
cd api-so11os

# run the command `su postgres` within the postgres service named `db` running on docker
docker-compose exec db su postgres

# open the database and then you can run any query
psql so11os_dev
```

**Log into the dabase using GUI**

You can use [DBeaver](https://dbeaver.io/) for that. It is a free multi-platform database tool for developers.

Use `localhost` with port `5432` to connect. Don't forget the username and password.

**Stopping api and db running on docker**

```sh
docker-compose kill
```

## Migrations

Migrations are handled by [knex](http://knexjs.org/). Install knex globally by running `npm i -g knex`. With that you have
the command `knex` available in your terminal.

**Crating a new table**

Whenever you want to create a table for the system go the root of the project and run:

```sh
knex migrate:make create_tablename
# replace `tablename` with the table name like `users`, `products`
```

migrations files live under [./src/migrations](src/migrations). After running `migrate:make`, open the
migration file and add the fields of the table

**Running migrations**

After done editing the migration file, run:

```sh
knex migrate:latest
```

Remember whenever you need to change the database structure like adding a field to a table,
changing its type or creating an index for example, you need to create a migration then
do the change you want in that new migration file and then run `migrate:latest` which will
apply those changes in the databse

## Testing

**Create .env.test file**

```sh
cp .env.example .env.test
```

open `.env.test` and set `DATABASE_URL` to your test database, `so11os_test`

**Run migrations for test environment**

```sh
yarn migrate:test
```

> Whenever you create a new migration run the migrate command for test environment too

**Run seeds for test environment [optional]**

```sh
yarn seed:run:test
```

**Run tests**

```sh
yarn test
yarn test:watch # run in watch mode
```
