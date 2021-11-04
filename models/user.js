("use strict");
const { Model } = require("sequelize");
const { HashSync } = require("../helpers/auth/hash");
const { stringValidation } = require("../helpers/validation/modelValidation");

//USER MODEL
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: "roleId" });
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
          is: {
            args: stringValidation(2, 45), //FIXME:RegExp doesn't include special characters. Refine
            msg: "Invalid first name",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
          is: {
            args: stringValidation(2, 45), //FIXME:RegExp doesn't include special characters. Refine
            msg: "Invalid last name",
          },
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
        allowNull: false,
        validate: { isInt: true },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeBulkCreate: async (bulk) => {
          //CAUTION: This is needed for seeding, hashing user passwords in bulk.
          return await bulk.map(async (user) => {
            if (user.password) {
              //replaces the incoming password for its hashed state before registering it into the database
              user.password = await HashSync(user.password);
              return user;
            }
          });
        },
      },
    }
  );
  return User;
};
