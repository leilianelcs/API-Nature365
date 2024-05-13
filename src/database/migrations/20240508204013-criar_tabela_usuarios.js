'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'usuarios',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        email: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
        nome: {
          allowNull: false,
          type: Sequelize.STRING
        },
        sexo: {
          allowNull: false,
          type: Sequelize.STRING
        },
        CPF: {
          allowNull: false,
          type: Sequelize.STRING
        },
        data_nascimento: {
          allowNull: false,
          type: Sequelize.DATE
        },
        celular: {
          allowNull: false,
          type: Sequelize.STRING
        },
          cep: {
          allowNull: false,
          type: Sequelize.STRING
        },
        endereco: {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
