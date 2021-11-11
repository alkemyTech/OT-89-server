"use strict";
const { Model } = require("sequelize");
const { stringValidation } = require("../helpers/validation/modelValidation");

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Member.init(
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
          is: {
            args: stringValidation(2, 45),
            msg: "Invalid name",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: { isUrl: true },
      },
    },
    {
      sequelize,
      modelName: "Member",
      timestamps: true,
      paranoid: true,
    }
  );
  return Member;
};
