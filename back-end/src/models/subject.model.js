'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    static associate(models) {
      Subject.hasMany(models.Score, {
        foreignKey: 'subject_id',
        as: 'scores',
      });
    }
  }

  Subject.init(
    {
      code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      group_a: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Subject',
      tableName: 'subjects',
    }
  );

  return Subject;
};
