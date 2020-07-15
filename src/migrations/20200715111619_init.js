const { categories } = require('../app/transactions/category');
const { accounts } = require('../app/transactions/account');
const txTypes = ['expense', 'income'];

exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v1mc()')).primary();
      table.string('email').unique().notNullable();
      table.string('name').notNullable();
      table.string('avatar').defaultTo('');
      table.string('password').notNullable();
      table.timestamps(false, true);
    })
    .createTable('transactions', (table) => {
      table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v1mc()')).primary();
      table.string('description').nullable();
      table.timestamp('tx_date').notNullable().defaultTo(knex.fn.now());
      // if expense means `paid`, if income means `received`
      table.boolean('done').notNullable().defaultTo(false);
      table.decimal('value', 10, 2).notNullable();
      table.string('currency').notNullable().defaultTo('brl');
      table.enu('tx_type', txTypes, { useNative: true, enumName: 'tx_type' }).notNullable();
      table
        .enu('category', categories, { useNative: true, enumName: 'category_type' })
        .notNullable();
      table.enu('account', accounts, { useNative: true, enumName: 'account_type' }).notNullable();
      table.string('note').nullable();
      table.uuid('user_id').notNullable();
      table.foreign('user_id').references('users.id');
      table.timestamps(false, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('transactions').dropTable('users');
};
