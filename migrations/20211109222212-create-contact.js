'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }, 
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      }, 
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contacts');
  }
};