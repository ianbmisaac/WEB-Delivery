'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('pendiente', 'confirmado', 'preparando', 'en_camino', 'entregado', 'cancelado'),
        defaultValue: 'pendiente'
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deliveryLat: {
        type: Sequelize.FLOAT
      },
      deliveryLng: {
        type: Sequelize.FLOAT
      },
      notes: {
        type: Sequelize.TEXT
      },
      estimatedDeliveryTime: {
        type: Sequelize.DATE
      },
      deliveredAt: {
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      RestaurantId: {
        type: Sequelize.INTEGER,
        references: { model: 'Restaurants', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
