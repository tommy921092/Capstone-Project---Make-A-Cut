exports.up = function(knex, Promise) {
  return knex.schema.createTable("merchant", table => {
    table.increments();
    table
      .string("email")
      .notNullable()
      .unique();
    table.string("password").notNullable();
    table.boolean("valid").defaultTo(true);
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("merchant");
};