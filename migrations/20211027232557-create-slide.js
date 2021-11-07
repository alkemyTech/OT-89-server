"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        console.log(
            "@/migrations/create-slide.js \nWARNING: Organization model reference has been disabled untill it has been incorporated to the project"
        );
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
                //references: { model: "Organization", key: "organizationId" }, //TODO: silenced till it is created
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            filterId: {
                type: Sequelize.INTEGER,
                references: { model: "SlideFilters", key: "filterId" },
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
