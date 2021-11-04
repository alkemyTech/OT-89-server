("use strict");
const { Model } = require("sequelize");
const { stringValidation } = require("../helpers/validation/modelValidation");

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
                        args: stringValidation(2, 25), 
                        msg: "Invalid filter name",
                    },
                },
            },
            description: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    is: {
                        args: stringValidation(2, 25), 
                        msg: "Invalid filter description",
                    },
                },
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "SlideFilter",
            timestamps: true,
        }
    );
    return SlideFilter;
};
