var express = require('express');
var router = express.Router();
const { sequelize } = require('../models/index')
var db = require("../models");
var TpData = db.TpData;
var Sale = db.Sale;
var Saledetail = db.Saledetail;
var Article = db.Article;

/* GET home page. */
router.get('/', async function(req, res, next) {

  
  var tdData = await Sale.findOne( {
    where : {id : 1 },
      attributes: {
        exclude : ["id", "tpdataId", "createdAt", "updatedAt"],
        include: [
          "invoice_number",
          [sequelize.fn("DATE_FORMAT",sequelize.col("invoice_date"),"%Y-%m-%d %H:%i:%s"),"invoice_date"],
          "payment_type",
          "invoice_signature",
          [sequelize.literal('(SELECT tp_name FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'tp_name'],
          [sequelize.literal('(SELECT tp_type FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'tp_type'],
          [sequelize.literal('(SELECT tp_TIN FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'tp_TIN'],
          [sequelize.literal('(SELECT tp_trade_number FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'tp_trade_number'],
          [sequelize.literal('(SELECT tp_postal_number FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'tp_postal_number'],
          [sequelize.literal('(SELECT tp_phone_number FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'tp_phone_number'],
          [sequelize.literal('(SELECT tp_address_commune FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'tp_address_commune'],
          [sequelize.literal('(SELECT tp_address_quartier FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'tp_address_quartier'],
          [sequelize.literal('(SELECT tp_address_avenue FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'tp_address_avenue'],
          [sequelize.literal('(SELECT tp_address_number FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'tp_address_number'],
          [sequelize.literal('(SELECT vat_taxpayer FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'vat_taxpayer'],
          [sequelize.literal('(SELECT ct_activity_sector FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'ct_activity_sector'],
          [sequelize.literal('(SELECT tp_legal_form FROM  tpdata WHERE  tpdata.id = Sale.tpdataId)'), 'tp_legal_form'],
          
      ]
    },
      include :[{
          model : Saledetail, as : "Invoices",
          attributes: { 
            include: [
              [sequelize.literal('(SELECT item_designation FROM  articles WHERE  articles.id = Invoices.articleId)'), 'item_designation'],
            ],
            exclude : [
              'id', 'articleId', 'saleId', 'createdAt', 'updatedAt'
            ]
          }
      }]
      
  });

  console.log(JSON.stringify(tdData, null, 2))
  res.end(JSON.stringify(tdData, null, 2))
    // console.log(da);

  res.render('home/index');
});

module.exports = router;
