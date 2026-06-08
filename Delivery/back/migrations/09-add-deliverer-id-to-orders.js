'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'DelivererId', {
      type: Sequelize.INTEGER,
      references: { model: 'Deliverers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('Orders', 'DelivererId');
  }
};
