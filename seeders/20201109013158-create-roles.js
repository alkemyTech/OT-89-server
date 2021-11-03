"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Roles",
            [
                {
                    roleId: 1,
                    name: "Admin",
                    description: "Usuario administrador",
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    roleId: 2,
                    name: "Standard",
                    description: "Usuario regular",
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         */
        await queryInterface.bulkDelete("Roles", { roleId: [1, 2] });
    },
};
