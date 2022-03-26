var express = require('express');
var router = express.Router();

var db = require('models');
var TpData = db.TpData;
var Sale = db.Sale;
var Saledetail = db.Saledetail;
var Article = db.Article;

/* GET home page. */
router.get('/', function(req, res, next) {

  
  var tdData = await TpData.findAll({
    // attributes: [['category_name', 'dataInvoice']],
    include : [{
      model :  Sale,
      // attributes: [['product_name', 'productInvoiceDetail'], ['unit_price', 'priceInvoiceDetail']]
      include : [{
        model : Saledetail,
        include : {
          model : Article
        }
      }]
    }]
  });
  res.end(JSON.stringify(tdData, null, 2))
    // console.log(da);

  res.render('home/index');
});

module.exports = router;
