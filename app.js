'use strict';
const express = require('express');
const cors = require('cors')({origin: true});
const bodyParser = require('body-parser');

//Load routes
const scrapingRoutes = require('./app/routes/scraping-routes')

const app = express();

app.use(cors);
app.use(bodyParser.urlencoded({extended: 'true'}));
app.use(bodyParser.json()); 


//Use routes
app.use('/api/', scrapingRoutes);

module.exports = app;