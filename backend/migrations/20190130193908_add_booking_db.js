exports.up = function(knex, Promise) {
  return knex.schema.createTable("booking", table => {
    table.increments();
    table.integer("_shopid").unsigned();
    table.foreign("_shopid").references("shop.id");
    table.integer("_menuid").unsigned();
    table.foreign("_menuid").references("menu.id");
    table.integer("_userid").unsigned();
    table.foreign("_userid").references("users.id");
    table.string("uid").unique();
    table.string("status").defaultTo("confirmed");
    table.string("bookingdate");
    table.string("paymentid");
    table.boolean("valid").defaultTo(true);
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("booking");
};
