const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "email", "password"],

      properties: {
        id: { type: "integer" },
        username: { type: "string", maxLength: 255 },
        email: { type: "string", maxLength: 255, format: "email" },
        password: { type: "string", maxLength: 255 },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    };
  }
}

module.exports = User;
