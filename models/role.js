"use strict";
const { Model } = require("sequelize");

//USER ROLE MODEL
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Role.init(
        {
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                validate: { isInt: true },
            },
            name: {
                type: DataTypes.STRING(15),
                allowNull: false,
                validate: {
                    is: {
                        args: /[a-z A-Z]{1,15}/, //FIXME:RegExp, doesn't include special characters. Refine
                        msg: "Invalid role name",
                    },
                },
            },
            description: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    is: {
                        args: /[a-z A-Z]{1,100}/, //FIXME:RegExp, doesn't include special characters. Refine
                        msg: "Invalid role description",
                    },
                },
            },
            deletedAt: { type: DataTypes.DATE, allowNull: true },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        },
        {
            sequelize,
            modelName: "Role",
            //tableName:"", //FIXME: exact table name at the database
            paranoid: true,
            timestamps: true,
        }
    );
    return Role;
};
