'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Saledetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      saleId: {
        type: Sequelize.INTEGER
      },
      articleId: {
        type: Sequelize.INTEGER
      },
      item_quantity: {
        type: Sequelize.DOUBLE
      },
      item_pricemitem_ct: {
        type: Sequelize.FLOAT
      },
      item_tl: {
        type: Sequelize.FLOAT
      },
      item_price_nvat: {
        type: Sequelize.DOUBLE
      },
      vat: {
        type: Sequelize.DOUBLE
      },
      item_price_wvat: {
        type: Sequelize.DOUBLE
      },
      item_total_mount: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('Saledetails');
  }
};