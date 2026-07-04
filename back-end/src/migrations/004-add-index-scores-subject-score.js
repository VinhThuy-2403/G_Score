'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Composite index (subject_id, score) tối ưu cho query thống kê:
    // WHERE subject_id = ? AND score IS NOT NULL
    await queryInterface.addIndex('scores', ['subject_id', 'score'], {
      name: 'idx_scores_subject_score',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('scores', 'idx_scores_subject_score');
  },
};
