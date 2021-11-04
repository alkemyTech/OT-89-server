'use strict';
const {  Model } = require('sequelize');
const { stringValidation } = require("../helpers/validation/modelValidation");
const Categories = require('./categories');

module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    static associate(models) {
      Entry.belongsTo(models.Categories, {
        foreignKey: "categoryId",
      });
    }
  };
  Entry.init({
    name: {
      type: DataTypes.STRING(45),
      validate: {
        is: {
          args: stringValidation(2, 45),
          msg: "Invalid name"
        }
      }
    },
    content: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      validate: {
        is: {
          args: stringValidation(2, 2000),
          msg: "Invalid text",
        }
      },
    },
    image: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {  isUrl: true  }
    },  
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: Categories, key: "categoryId"},
      validate: { isInt: true },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    type: DataTypes.STRING,
    deleteAt: DataTypes.DATE,  
  }, {
    sequelize,
    modelName: 'Entry',
  });
  return Entry;
};