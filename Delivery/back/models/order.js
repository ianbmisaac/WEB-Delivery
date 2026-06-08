'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'UserId' });
      Order.belongsTo(models.Local, { foreignKey: 'LocalId' });
      Order.belongsTo(models.Deliverer, { foreignKey: 'DelivererId' });
      Order.hasMany(models.OrderItem, { foreignKey: 'OrderId' });
    }
  }
  Order.init({
    status: {
      type: DataTypes.ENUM('pendiente', 'confirmado', 'preparando', 'en_camino', 'entregado', 'cancelado'),
      defaultValue: 'pendiente'
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    deliveryLat: {
      type: DataTypes.FLOAT
    },
    deliveryLng: {
      type: DataTypes.FLOAT
    },
    notes: {
      type: DataTypes.TEXT
    },
    estimatedDeliveryTime: {
      type: DataTypes.DATE
    },
    deliveredAt: {
      type: DataTypes.DATE
    },
    DelivererId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
