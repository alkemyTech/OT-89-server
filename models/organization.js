'use strict';
const {
  Model
} = require('sequelize');
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
    name: DataTypes.STRING,
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
    }
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};