'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deliverer extends Model {
    static associate(models) {
      Deliverer.hasMany(models.Order, { foreignKey: 'DelivererId' });
    }
  }
  Deliverer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true }
    },
    vehicle: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    longitude: {
      type: DataTypes.FLOAT
    }
  }, {
    sequelize,
    modelName: 'Deliverer',
  });
  return Deliverer;
};
