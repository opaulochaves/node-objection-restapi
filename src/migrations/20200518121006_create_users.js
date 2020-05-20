module.exports.up = async (db) => {
  await db.schema.createTable('users', (table) => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('email').unique().notNullable();
    table.string('name').notNullable();
    table.string('avatar').defaultTo('');
    table.string('password').notNullable();
    table.timestamps(false, true);
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('users');
};
