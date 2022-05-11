'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Saledetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Saledetail.belongsTo(models.Article, {
        foreignKey: 'articleId',
      });
    }
  }
  Saledetail.init({
    saleId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
    item_quantity: DataTypes.DOUBLE,
    item_pricemitem_ct: DataTypes.FLOAT,
    item_tl: DataTypes.FLOAT,
    item_price_nvat: DataTypes.DOUBLE,
    vat: DataTypes.DOUBLE,
    item_price_wvat: DataTypes.DOUBLE,
    item_total_mount: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Saledetail',
  });
  return Saledetail;
};