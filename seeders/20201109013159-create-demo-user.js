"use strict";
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models/index");
const { adminSeed, regularSeed } = require("./UserDataSeed");

const User = db.sequelize.models.User;
//FIXME: Make sure that hashing matches with the one at register/login routes
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Users", [...adminSeed, ...regularSeed], {
        //await User.bulkCreate([...adminSeed, ...regularSeed], {
            hooks: { //FIXME: hooks are not working
                beforeBulkCreate: async (bulk) => {
                    return await bulk.map(async (user) => {
                        throw new Error(`entre a Hooks ${user}`)
                        if (user.password) {
                            const salt = await bcrypt.genSaltSync(10, "a");
                            user.password = bcrypt.hashSync(
                                user.password,
                                salt
                            ); //replaces the incoming password for its hashed state before registering it into the database
                            return user;
                        }
                    });
                },
            },
            individualHooks:{ //FIXME: hooks are not working
                beforeCreate: async(user)=>{throw new Error(`entre a individualHooks ${user}`)}
            }
        });
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
