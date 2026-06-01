'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {
      Restaurant.belongsTo(models.User, { foreignKey: 'UserId' });
      Restaurant.hasMany(models.Order, { foreignKey: 'RestaurantId' });
    }
  }
  Restaurant.init({
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};
