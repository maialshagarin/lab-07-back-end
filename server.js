'use strict'


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require ('superagent')

const PORT = process.env.PORT;

const server = express();

server.use(cors());







server.get('/location',locationHandler)
//  (request, response) => {
//     const locationData = require('./data/geo.json');
//     const location = new Location(locationData);
//     response.status(200).json(location);
//   });
  function locationHandler(req,res){
getlocation (city)(req.query.data)
.then(locationData => res.status(200).json(locationData));
  }


  function getlocation (city){
      const url =`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GEOCODE_API_KEY}`
      return superagent.get(url)
      .then( data =>{
          return new Location (city , data.body)
      })
  }
  
  function Location( city ,data ) {
      this.search_query = city;
      this.formatted_query = data.results[0].formatted_address;
      this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;
}

server.get('/weather', weatherHanddler);

function weatherHanddler(req,res) {
    let weatherData = getWeather(req.query.data);
    res.status(200).json(weatherData);
}


function getWeather (city) {

    let data = require('./data/darksky.json');
    
    return data.daily.data.map( (day) => {
        return new Weather(day);
    })

 
  };
  
  function Weather( day ) {

      this.forecast = day.summary;
      this.time = new Date(day.time * 1000).toDateString();
          // this.latitude = data.latitude
          // this.longitude = data.longitude
          
          
        }

        server.get('*',(request,Response) =>{
            Response.status(500).send('Sorry, something went wrong');
        });
       
        server.listen(PORT, () => console.log(`App listening on ${PORT}`));