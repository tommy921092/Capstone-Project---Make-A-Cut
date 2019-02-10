exports.up = function(knex, Promise) {
  return knex.schema.createTable("comment", table => {
    table.increments();
    table.integer("_shopid").unsigned();
    table.foreign("_shopid").references("shop.id");
    table.integer("_userid").unsigned();
    table.foreign("_userid").references("users.id");
    table.decimal("rating");
    table.text("content");
    table.boolean("valid").defaultTo(true);
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("booking");
};
