'use strict';
const { Model } = require('sequelize');
const { stringValidation } = require("../helpers/validation/modelValidation");
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Organization.init({
    name: {
      type: DataTypes.STRING(60),
      validate: {
        is: {
          args: stringValidation(2, 60),
          msg: "Invalid name"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {  isUrl: true  }
    },
    content: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      validate: {
        is: {
          args: stringValidation(2,2000),
          msg: "Invalid text"
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {  isUrl: true  }
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {  isUrl: true  }
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {  isUrl: true  }
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
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};