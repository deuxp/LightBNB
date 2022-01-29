# Lighthouse BnB

Welcome all. This is project with the main focus on bulding a database using `Postgres` and connecting it to a web application.

This project is for educational purposes only.

## usage

1. clone the repo
1. update dependencies in root folder `npm i`
1. update dependencies in boilerplate folder `cd /LightBnB_WebApp-master && npm i`
1. from the CLI run `psql`
1. create the database: `CREATE DATABASE "name"`
  connect to database: `\c "name"`
1. migrate the tables: `\i migrations/01_schema.sql`
1. seed the tables: `\i seeds/01_seeds.sql seeds/02_seeds.sql`
1. super easy config of the `.env file` -- refer to documentation: [dotenv on npm](https://www.npmjs.com/package/dotenv)
1. database port, by default, should be `5432`
1. npm run local and view it at localhost:3000.

## dependencies

- `pg`: version ^8.0.3
- dotenv: version ^8.x.x
- bcrypt: ^3.0.6,
- body-parser: ^1.19.0,
- cookie-session: ^1.3.3,
- express: ^4.17.1,
- nodemon: ^1.19.1,
- pg: ^8.7.1
