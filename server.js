const express = require("express");
const knex = require("./knex/knex.js");
const axios = require("axios");
const moment = require("moment");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const today = moment().format("MMMM YYYY");

  const plusEuro = await knex("expenses")
    .where({ plus_or_minus: "+", date: today })
    .sum("euro");

  const plusYen = await knex("expenses")
    .where({ plus_or_minus: "+", date: today })
    .sum("yen");

  const minusEuro = await knex("expenses")
    .where({ plus_or_minus: "-", date: today })
    .sum("euro");

  const minusYen = await knex("expenses")
    .where({ plus_or_minus: "-", date: today })
    .sum("yen");

  res.json({ plusEuro, plusYen, minusEuro, minusYen });
});

app.get("/yen", async (req, res) => {
  let yen = 0;

  const response = await axios.get(
    `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.KEY}&symbols=JPY`
  );

  yen = Math.round(response.data.rates.JPY);

  res.json({ yen });
});

app.post("/", async (req, res) => {
  const expense = {
    plus_or_minus: req.body.plusOrMinus,
    euro: Number(req.body.euro),
    yen: req.body.yen,
    date: req.body.date,
  };

  await knex("expenses").insert(expense);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
