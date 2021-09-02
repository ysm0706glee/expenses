# Eexpenses
For people living in Europe from Japan, now you can manage your expenses with euro and yen by this app! 

#### Video Demo:  [Expenses](https://youtu.be/lwZK5mSmhm0)

## How to install
1. Clone the repo and `yarn`.
1. Create a local postgres database.
1. Create a .env file.
   1. Define your .env variables USER, PASSWORD, DATABASE and KEY. You can get a key from [here](https://exchangeratesapi.io/). 
1. Run `npx knex migrate:latest` to create the database schema. 
1. Run `yarn dev` to start the backend server in nodemon mode. 
1. Run `yarn start` to start the front end server in hot-reload mode.
