// const express = require("express")
// const router = express.Router();
// const request = require('request');


// let apiKey = '89301148247885e111f0ec3801a439c8'
// let city = 'london'
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
             

// router.get('/testingW', (req, res) => {
    
//     request(url, function (err, response, body) {
//         var weather = JSON.parse(body)
//         if (weather!==undefined && weather.main!==undefined) {
//            var wmsg = 'It is '+ weather.main.temp + 
//               ' degrees in '+ weather.name +
//               '! <br> The humidity now is: ' + 
//               weather.main.humidity;
//               res.send (wmsg);
//         }
//         else {
//            res.send ("No data found");
//         }
        
//       });

// });


