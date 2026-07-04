'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    static associate(models) {
      Score.belongsTo(models.Student, {
        foreignKey: 'student_id',
        as: 'student',
      });
      Score.belongsTo(models.Subject, {
        foreignKey: 'subject_id',
        as: 'subject',
      });
    }
  }

  Score.init(
    {
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Score',
      tableName: 'scores',
    }
  );

  return Score;
};
