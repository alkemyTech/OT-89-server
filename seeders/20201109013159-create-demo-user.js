"use strict";
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { adminSeed, regularSeed } = require("./UserDataSeed");
//FIXME: Make sure that hashing matches with the one at register/login routes
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "Users",
            [...adminSeed, ...regularSeed],
            {
                hooks: {
                    beforeCreate: async (user) => {
                        if (user.password) {
                            const salt = await bcrypt.genSaltSync(10, "a");
                            user.password = bcrypt.hashSync(
                                user.password,
                                salt
                            ); //replaces the incoming password for its hashed state before registering it into the database
                        }
                    },
                },
            }
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         */
        await queryInterface.bulkDelete("Users", {
            email: {
                [Op.or]: {
                    [Op.like]: "%.user@mail.com",
                    [Op.like]: "%.admin@mail.com",
                },
            },
        });
    },
};
