const { Model } = require('objection');

class Transaction extends Model {
  static get tableName() {
    return 'transactions';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['value', 'tx_type', 'category', 'account'],

      properties: {
        id: { type: 'string' },
        description: { type: 'string', maxLength: 255 },
        done: { type: 'boolean' },
        value: { type: 'number', minimum: 0 },
        currency: { type: 'string', minLength: 3, maxLength: 3 },
        txType: { type: 'string', pattern: '^(income|expense)$' },
        category: { type: 'string' },
        account: { type: 'string' },
        note: { type: 'string' },
        user_id: { type: 'string' },
      },
    };
  }
}

module.exports = Transaction;
