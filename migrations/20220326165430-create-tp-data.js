'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TpData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tp_name: {
        type: Sequelize.STRING
      },
      tp_type: {
        type: Sequelize.STRING
      },
      tp_TIN: {
        type: Sequelize.STRING
      },
      tp_trade_number: {
        type: Sequelize.STRING
      },
      tp_postal_number: {
        type: Sequelize.STRING
      },
      tp_phone_number: {
        type: Sequelize.STRING
      },
      tp_address_commune: {
        type: Sequelize.STRING
      },
      tp_address_quartier: {
        type: Sequelize.STRING
      },
      tp_address_avenue: {
        type: Sequelize.STRING
      },
      tp_address_number: {
        type: Sequelize.STRING
      },
      vat_taxpayer: {
        type: Sequelize.STRING
      },
      ct_activity_sector: {
        type: Sequelize.STRING
      },
      tp_legal_form: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('TpData');
  }
};