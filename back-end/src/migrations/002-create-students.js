'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      sbd: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true,
      },
      ma_ngoai_ngu: {
        type: Sequelize.STRING(5),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('students', ['sbd'], {
      name: 'idx_students_sbd',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('students');
  },
};
