("use strict");
const { Model } = require("sequelize");

//SLIDE FILTER MODEL
module.exports = (sequelize, DataTypes) => {
    class SlideFilter extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    SlideFilter.init(
        {
            filterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                validate: { isInt: true },
            },
            name: {
                type: DataTypes.STRING(25),
                allowNull: false,
                validate: {
                    is: {
                        args: /[a-z A-Z]{1,25}/, //FIXME:RegExp, doesn't include special characters. Refine
                        msg: "Invalid slide filter name",
                    },
                },
            },
            description: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    is: {
                        args: /[a-z A-Z]{1,100}/, //FIXME:RegExp, doesn't include special characters. Refine
                        msg: "Invalid slide filter description",
                    },
                },
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
            modelName: "SlideFilter",
            //tableName:"", //FIXME: exact table name at the database
            timestamps: true,
        }
    );
    return SlideFilter;
};
