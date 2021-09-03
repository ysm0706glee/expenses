# Eexpenses
For people living in Europe from Japan, now you can manage your expenses with euro and yen by this app! 

<img width="200" alt="pic1" src="https://i.ibb.co/hMG3Q76/Simulator-Screen-Shot-i-Phone-12-Pro-Max-2021-08-29-at-14-19-13.png">
<img width="200" alt="pic2" src="https://i.ibb.co/n1Bmy4L/Simulator-Screen-Shot-i-Phone-12-Pro-Max-2021-08-29-at-14-19-01.png">
<img width="200" alt="pic3" src="https://i.ibb.co/1MTBC0Q/Simulator-Screen-Shot-i-Phone-12-Pro-Max-2021-08-29-at-14-19-05.png">

#### Video Demo:  [Expenses](https://youtu.be/lwZK5mSmhm0)

## Tech Stack
* front-end
  * React Native
* API
  * exchangerates
* back-end
  * node.js
  * PostgreSQL

## How to install
1. Clone the repo and `yarn`.
1. Create a local postgres database.
1. Create a .env file.
   1. Define your .env variables USER, PASSWORD, DATABASE and KEY. You can get a key from [here](https://exchangeratesapi.io/). 
1. Run `npx knex migrate:latest` to create the database schema. 
1. Run `yarn dev` to start the backend server in nodemon mode. 
1. Run `yarn start` to start the front end server in hot-reload mode.

