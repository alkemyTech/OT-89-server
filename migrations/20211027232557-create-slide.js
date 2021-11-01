"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Slides", {
            slideId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            imageUrl: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            text: {
                type: Sequelize.STRING(2000),
                allowNull: false,
            },
            order: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            organizationId: {
                type: Sequelize.INTEGER, //TODO: assuming an Auto Increment id
                allowNull: false,
                references: { model: Organization, key: "organizationId" }, //TODO: check that it is so
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            filterId: {
                type: Sequelize.INTEGER,
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
