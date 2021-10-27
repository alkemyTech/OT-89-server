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
                },
                {
                    roleId: 2,
                    name: "Standard",
                    description: "Usuario regular",
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
