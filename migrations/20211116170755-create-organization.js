'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Organizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {  
        type: Sequelize.STRING,
        allowNull: false,  
      },
      image: {  
        type: Sequelize.STRING ,
        allowNull: false,
      },
      content: {  
        type: Sequelize.STRING,
        allowNull: false,  
      },
      phone: {  
        type: Sequelize.STRING,
        allowNull: false,  
      },
      adress: {  
        type: Sequelize.STRING,
        allowNull: false,  
      },
      facebook: {  
        type: Sequelize.STRING,
        allowNull: true,  
      },
      linkedin: {  
        type: Sequelize.STRING,
        allowNull: true,  
      },
      instagram: {  
        type: Sequelize.STRING,
        allowNull: true,  
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable('Organizations');
  }
};