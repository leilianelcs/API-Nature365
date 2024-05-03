'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('alunos', 'cep', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('alunos', 'endereco', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('alunos', 'cep');

    await queryInterface.removeColumn('alunos', 'endereco');
  }
};
