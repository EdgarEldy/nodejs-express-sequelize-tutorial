'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sale.hasMany(models.Saledetail, {
        as: 'Invoices',
        foreignKey: 'saleId',
      });
      Sale.belongsTo(models.TpData, {
        foreignKey: 'tpdataId',
      });
    }
  }
  Sale.init({
    tpdataId: DataTypes.INTEGER,
    invoice_number: DataTypes.STRING,
    invoice_date: DataTypes.DATE,
    payment_type: DataTypes.STRING,
    invoice_signature: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};