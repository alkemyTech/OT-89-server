"use strict";
const { stringValidation } = require("../helpers/validation/modelValidation");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Contact.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          is: {
            args: stringValidation(2, 100),
            msg: "Invalid name",
          },
        },
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          args: stringValidation(10, 15),
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      message: {
        type: DataTypes.STRING(2000),
        allowNull: false,
        validate: {
          is: {
            args: stringValidation(2, 2000),
            msg: "Invalid text",
          },
        },
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Contact",
    }
  );
  return Contact;
};
