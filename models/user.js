("use strict");
const { Model } = require("sequelize");

//USER MODEL
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Role, { as: "roleId" });
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
                        args: /[a-z A-Z]{2,45}/, //FIXME:RegExp, doesn't include special characters. Refine
                        msg: "Invalid first name",
                    },
                },
            },
            lastName: {
                type: DataTypes.STRING(45),
                allowNull: false,
                validate: {
                    is: {
                        args: /[a-z A-Z]{2,45}/, //FIXME:RegExp, doesn't include special characters. Refine
                        msg: "Invalid last name",
                    },
                },
            },
            roleId: {
                type: DataTypes.INTEGER, 
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
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        },
        {
            sequelize,
            modelName: "User",
            //tableName:"", //FIXME: exact table name at the database
            timestamps: true,
            paranoid: true,
        }
    );
    return User;
};
