'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('locais', {
      id: {
       allowNull: false,
       autoIncrement: true,
       primaryKey: true,
       type: Sequelize.INTEGER
      },
      id_usuario: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nome_rota: {
       allowNull: false,
       type: Sequelize.STRING
     },
      descricao: {
       allowNull: false,
       type: Sequelize.STRING
     },
     localizacao: {
      allowNull: false,
      type: Sequelize.STRING
    },
    cep: {
      allowNull: false,
      type: Sequelize.STRING
    },
    coordenadas: {
      allowNull: false,
      type: Sequelize.STRING
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('locais');
  }
};