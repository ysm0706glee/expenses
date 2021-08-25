require("dotenv").config();

module.exports = {
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  migrations: {
    directory: __dirname + "/knex/migrations",
  },
  seeds: {
    directory: __dirname + "/knex/seeds",
  },
};
