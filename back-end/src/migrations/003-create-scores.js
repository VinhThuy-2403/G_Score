'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('scores', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'subjects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      score: {
        type: Sequelize.DECIMAL(4, 2),
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

    await queryInterface.addIndex('scores', ['student_id'], {
      name: 'idx_scores_student_id',
    });
    await queryInterface.addIndex('scores', ['subject_id'], {
      name: 'idx_scores_subject_id',
    });
    await queryInterface.addConstraint('scores', {
      fields: ['student_id', 'subject_id'],
      type: 'unique',
      name: 'uq_scores_student_subject',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('scores');
  },
};
