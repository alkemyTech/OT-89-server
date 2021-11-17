"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Activities", [
      {
        name: "Actividad name test",
        content: "Actividad content test",
        image: "https://picsum.photos/200/300",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Activities", {
      name: "Actividad name test",
      content: "Actividad description test",
      image: "https://picsum.photos/200/300",
    });
  },
};
