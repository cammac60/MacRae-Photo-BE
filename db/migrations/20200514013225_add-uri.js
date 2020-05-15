
exports.up = function(knex) {
  return knex.schema
    .table('images', table => {
      table.binary('image');
    });
};

exports.down = function(knex) {
  return knex.schema
    .table('images', table => {
      table.dropColumn('image');
    });
};
