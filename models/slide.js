("use strict");
const { Model } = require("sequelize");

//SLIDE MODEL
module.exports = (sequelize, DataTypes) => {
    class Slide extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Slide.belongsTo(models.Organization, {
                foreignKey: "organizationId",
            });
            Slide.belongsTo(models.SlideFilter, { foreignKey: "filterId" });
        }
    }
    Slide.init(
        {
            slideId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                validate: { isInt: true },
            },
            imageUrl: {
                type: DataTypes.STRING(500),
                allowNull: false,
                validate: { isUrl: true },
            },
            text: {
                type: DataTypes.STRING(2000),
                allowNull: false,
                //validate: { is: true }, //TODO: set validation
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: { isInt: true },
            },
            organizationId: {
                type: DataTypes.INTEGER, //TODO: assuming an Auto Increment id
                allowNull: false,
                references: { model: Organization, key: "organizationId" }, //TODO: check that it is so
                validate: { isInt: true },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            filterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references:{model:SlideFilter, key:"filterId"},
                validate: { isInt: true },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
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
            modelName: "Slide",
            //tableName:"", //FIXME: exact table name at the database
            timestamps: true,
        }
    );
    return Slide;
};
