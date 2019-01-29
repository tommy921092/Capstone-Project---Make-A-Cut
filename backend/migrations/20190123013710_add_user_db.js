exports.up = function(knex, Promise) {
    return knex.schema.createTable('users',(table)=>{
        table.increments();
        table.string("username").notNullable().unique();
        table.string("fullname").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.string("address");
        table.string("tel");
        table.integer("age");
        table.string("profilepic");
        table.string("facebookid");
        table.string("googleid");
        table.boolean('valid').defaultTo(true);
        table.timestamps(false,true);
      });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
