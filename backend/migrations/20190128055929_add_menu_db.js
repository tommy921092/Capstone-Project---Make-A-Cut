exports.up = function(knex, Promise) {
  return knex.schema.createTable("menu", table => {
    table.increments();
    table.integer("_shopid").unsigned();
    table.foreign("_shopid").references("shop.id");
    table.string("name");
    table.integer("price");
    table.text("description");
    table.boolean("valid").defaultTo(true);
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("menu");
};