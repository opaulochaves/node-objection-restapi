const { categories } = require('../app/transactions/category');
const { accounts } = require('../app/transactions/account');
const txTypes = ['expense', 'income'];

module.exports.up = async (db) => {
  await db.schema.createTable('transactions', (table) => {
    table.uuid('id').notNullable().defaultTo(db.raw('uuid_generate_v1mc()')).primary();
    table.string('description').nullable();
    table.timestamp('tx_date').notNullable().defaultTo(db.fn.now());
    // if expense means `paid`, if income means `received`
    table.boolean('done').notNullable().defaultTo(false);
    table.decimal('value', 10, 2).notNullable();
    table.string('currency').notNullable().defaultTo('brl');
    table.enu('tx_type', txTypes, { useNative: true, enumName: 'tx_type' }).notNullable();
    table.enu('category', categories, { useNative: true, enumName: 'category_type' }).notNullable();
    table.enu('account', accounts, { useNative: true, enumName: 'account_type' }).notNullable();
    table.string('note').nullable();
    table.timestamps(false, true);
  });
};

module.exports.down = async (db) => {
  await db.schema.dropTableIfExists('transactions');
};
