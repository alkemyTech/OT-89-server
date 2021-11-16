"use strict";
const { Model } = require("sequelize");
const { stringValidation } = require("../helpers/validation/modelValidation");

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {}
  }
  Categories.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: stringValidation(2, 45), //Agregue la validacion de string para el name
            msg: "Invalid name",
          },
        },
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );
  return Categories;
};
