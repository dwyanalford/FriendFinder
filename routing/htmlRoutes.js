var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function (req, res) {
    res.render("home");
});



router.get("/survey", function(req, res) {
  

});


module.exports = router; 