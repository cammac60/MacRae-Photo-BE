
exports.up = function(knex) {
  return knex.schema
    .createTable('messages', (table) => {
      table.increments('id').primary();
      table.string('email');
      table.string('body');
      table.timestamps(true, true);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('messages');
};
