'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('Restaurants', 'Locals');

    await queryInterface.addColumn('Locals', 'openingHours', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.renameColumn('Orders', 'RestaurantId', 'LocalId');
    await queryInterface.renameColumn('Products', 'RestaurantId', 'LocalId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Products', 'LocalId', 'RestaurantId');
    await queryInterface.renameColumn('Orders', 'LocalId', 'RestaurantId');
    await queryInterface.removeColumn('Locals', 'openingHours');
    await queryInterface.renameTable('Locals', 'Restaurants');
  }
};
