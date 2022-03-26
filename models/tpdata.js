'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TpData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TpData.init({
    tp_name: DataTypes.STRING,
    tp_type: DataTypes.STRING,
    tp_TIN: DataTypes.STRING,
    tp_trade_number: DataTypes.STRING,
    tp_postal_number: DataTypes.STRING,
    tp_phone_number: DataTypes.STRING,
    tp_address_commune: DataTypes.STRING,
    tp_address_quartier: DataTypes.STRING,
    tp_address_avenue: DataTypes.STRING,
    tp_address_number: DataTypes.STRING,
    vat_taxpayer: DataTypes.STRING,
    ct_activity_sector: DataTypes.STRING,
    tp_legal_form: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TpData',
  });
  return TpData;
};