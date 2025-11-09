exports.up = function(knex) {
  return knex.schema.createTable('todos', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.boolean('completed').defaultTo(false);
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos');
};