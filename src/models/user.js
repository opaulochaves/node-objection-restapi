const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],

      properties: {
        id: { type: 'string' },
        name: { type: 'string', minLength: 2, maxLength: 255 },
        email: { type: 'string', format: 'email', maxLength: 254 },
        password: { type: 'string', minLength: 8, maxLength: 50 },
        avatar: { type: 'string', format: 'url', maxLength: 255 },
      },
    };
  }
}

// TODO validation custom error message
// https://github.com/Vincit/objection.js/issues/1739

module.exports = User;
