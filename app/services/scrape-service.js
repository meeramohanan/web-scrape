var request = require('request');
var cheerio = require('cheerio');

//Function for parsing the input url
function scrapeUrl(url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, html) => {
            if(!err && res.statusCode == 200) {
                extractMetaData(html)
                .then((metaData) => {
                    resolve(metaData)
                }, (err) => {
                    reject(JSON.stringify({
                        message: 'An error occurred while parsing url'
                    }));
                })
            } else {
                reject(JSON.stringify({
                    message: 'An error occurred while parsing url'
                }));
            }
        });
    });
}


//Function for extracting meta data
function extractMetaData(html) {
    return new Promise((resolve, reject) => {
        var metaData = {}
        const $ = cheerio.load(html);
        const webpageTitle = $("title").text();
        const metaDescription =  $('meta[name="description"]').attr('content');
        if(webpageTitle) {
            metaData.title = webpageTitle;
        }
        if(metaDescription) {
            metaData.description = metaDescription;
        }
        metaData.images = [];
        $("img").each(function(i, image) {
            const image_src = $(image).attr('src');
            if(image_src != '' && image_src != null) {
                metaData.images.push(image_src);
            }
        });
        resolve(metaData)
    });
}

module.exports = {
    scrapeUrl: scrapeUrl
}