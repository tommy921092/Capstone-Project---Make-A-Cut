exports.up = function(knex, Promise) {
  return knex.schema.createTable("shop", table => {
    table.increments();
    table.integer("_merchantid").unsigned();
    table.foreign("_merchantid").references("merchant.id");
    table.boolean("valid").defaultTo(true);
    table.string("shopname");
    table.string("address");
    table.string("address_2");
    table.specificType("tag", "text[]");
    table.string("pricerange");
    table.string("tel");
    table.string("website");
    table.string("openhour");
    table.string("closehour");
    table.string("restday");
    table.text("description");
    table.specificType("photo", "text[]");
    table.specificType("notAvailble", "text[]");
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("shop");
};
