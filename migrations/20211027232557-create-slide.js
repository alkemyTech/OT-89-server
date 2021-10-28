"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Slides", {
            slideId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            imageUrl: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            text: {
                type: DataTypes.STRING(2000),
                allowNull: false,
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            organizationId: {
                type: DataTypes.INTEGER, //TODO: assuming an Auto Increment id
                allowNull: false,
                references: { model: Organization, key: "organizationId" }, //TODO: check that it is so
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            filterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: SlideFilter, key: "filterId" },
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
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Slides");
    },
};
