'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Local extends Model {
    static associate(models) {
      Local.belongsTo(models.User, { foreignKey: 'UserId' });
      Local.hasMany(models.Order, { foreignKey: 'LocalId' });
      Local.hasMany(models.Product, { foreignKey: 'LocalId' });
    }
  }
  Local.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    description: {
      type: DataTypes.TEXT
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    phone: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    openingHours: {
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Local',
  });
  return Local;
};
