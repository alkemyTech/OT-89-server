'use strict';
const { Model } = require('sequelize');
const { stringValidation } = require('../helpers/validation/modelValidation');

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Activity.init({
    name: {
      type: DataTypes.STRING(45),
      validate: {
        is: {
          args: stringValidation(2,45),
          msg: "Invalid name"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: true }
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
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};