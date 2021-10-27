"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Roles", {
            roleId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(15),
            },
            description: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
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
        await queryInterface.dropTable("Roles");
    },
};
