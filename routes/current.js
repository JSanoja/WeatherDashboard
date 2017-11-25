var express = require('express');
var router = express.Router();
var token = 'ca69ddea5b1e4a60adb220952172511';
var http = require('http');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var options = {
      host: 'api.apixu.com',
      path: '/v1/current.json?key='+token+'&q=Buenos%20Aires&lang=es',
      json:true
  };
  http.get(options, (resp) => {
    let data = '';
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      let json = JSON.parse(data);
      var jsonData = {
        actual : json.current.temp_c,
        condicion : json.current.condition.text,
        icono : json.current.condition.icon
      };
      res.send(jsonData);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});
module.exports = router;
