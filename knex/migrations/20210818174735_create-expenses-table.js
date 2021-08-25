exports.up = function (knex) {
  return knex.schema.createTable("expenses", (table) => {
    table.increments().primary();
    table.string("plus_or_minus").notNullable();
    table.float("euro").notNullable();
    table.float("yen").notNullable();
    table.string("date").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("expenses");
};
