var express = require('express');
var router = express.Router();

//Load controllers
const scrapingController = require('../controllers/scraping-controller');

//Route for parsing web page
router.post('/scrape', scrapingController.extractUrlMetaData);

module.exports = router;