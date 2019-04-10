const express = require('express');
const router = express.Router();

const successMessage = require('../middlewares/response-messages').successMessage;
const errorMessage = require('../middlewares/response-messages').errorMessage;

const scrapeService = require('../services/scrape-service');

module.exports.extractUrlMetaData = async (req, res) => {
    scrapeService.scrapeUrl(req.body.url)
    .then((data) => {
        successMessage(res, data)
    },(err) => {
        errorMessage(res, err);
    });
}




