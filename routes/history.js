var express = require('express');
var router = express.Router();
var token = '409167ff741942d9a59201326170304';
var http = require('http');
var b1=0;
var b2=0;
/* GET users listing. */
router.get('/', function(req, res, next) {
  var d = new Date(); // for now
  var hora = d.getHours(); // => 9
  var hoy = d.getFullYear()+"-" + (d.getMonth()+1)+"-"+ d.getDate() ;
  var ayer = d.getFullYear()+"-" + (d.getMonth()+1)+"-"+ (d.getDate()-1);

  var jsonData = {};
  var horasA = [];
  var horasH = [];
  // console.log(hoy);
  var options = {};

      options = {
          host: 'api.apixu.com',
          path: '/v1/history.json?key='+token+'&q=Buenos%20Aires&lang=es&dt='+ayer
      };
    http.get(options, (resp) => {
      //console.log(options);
      let data = '';
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        let json = JSON.parse(data);
        let HorasAyer = json.forecast.forecastday[0].hour;

        for (let i = hora; i < HorasAyer.length; i++) {
          horasA[(i-hora)]= HorasAyer[i].temp_c;
        }
        // console.log(horasA);
        b1=1;
        // console.log(horasA.length);
        termino1();
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
    options = {
        host: 'api.apixu.com',
        path: '/v1/history.json?key='+token+'&q=Buenos%20Aires&lang=es&dt='+hoy
    };
  http.get(options, (resp) => {
    //console.log(options);
    let data = '';
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      let json = JSON.parse(data);
      // console.log(json)
      // horas [1] = json;
      let HorasHoy = json.forecast.forecastday[0].hour;
      // let HorasHoy = json.forecast.forecastday[1].hour
      // console.log(HorasHoy.length);
      for (let i = 0; i < hora; i++) {
        horasH[i]= HorasHoy[i].temp_c;
      }
      // console.log(horasH.length);
      b2=1;
      termino2();
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  function termino1() {

    if (b2==1) {
      calcular();
    }
  };
  function termino2() {

    if (b1==1) {
      calcular();

    }
  };
  function calcular () {
    let recibo= horasA.concat(horasH);
    recibo.sort(recibo);
    let Max= recibo[23];
    let Min = recibo[0];
    enviar(Max, Min);
  }
  function  enviar (Max, Min) {
    let fechaHoy = hora +'h '+ hoy;
    let fechaAyer = hora +'h '+ayer;
    let enviarjson = {
        Maxima : Max,
        Minima : Min,
        Desde : fechaAyer,
        Hasta : fechaHoy
      };
    b1=0;
    b2=0;  
    res.send(enviarjson);
  }


});

module.exports = router;
