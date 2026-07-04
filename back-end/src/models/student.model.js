'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.hasMany(models.Score, {
        foreignKey: 'student_id',
        as: 'scores',
      });
    }
  }

  Student.init(
    {
      sbd: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      ma_ngoai_ngu: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Student',
      tableName: 'students',
    }
  );

  return Student;
};
