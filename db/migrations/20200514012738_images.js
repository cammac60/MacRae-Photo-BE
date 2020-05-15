
exports.up = function(knex) {
  return knex.schema
    .createTable('images', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('location');
      table.boolean('landscape');
      table.timestamps(true, true);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('images');
};
