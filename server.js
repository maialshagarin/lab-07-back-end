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
getlocation(req.query.data)
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
 getWeather(req.query.data)
    .then (weatherData => res.status(200).json(weatherData) );
}


function getWeather (query) {
    const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${query.latitude},${query.longitude}`;

    // let data = require('./data/darksky.json'); /// chanded with previous line ///
    return superagent.get(url)
    .then( data => {
      let weather = data.body;
      return weather.daily.data.map( (day) => {
        return new Weather(day);
      });
    });



 
  };
  
  function Weather( day ) {

      this.forecast = day.summary;
      this.time = new Date(day.time * 1000).toDateString();
          // this.latitude = data.latitude
          // this.longitude = data.longitude
          
          
        }
       /* [
            {
              "link": "https://www.eventbrite.com/seattlejshackers/events/253823797/",
              "name": "SeattleJS Hackers",
              "event_date": "Wed Apr 23 2014",
              "summary": "Come and meet other JS hackers at the Code Fellows campus!"
            },
            {
              "link": "https://www.eventbrite.com/Angular-Seattle/events/253595182/",
              "name": "Angular Seattle",
              "event_date": "Tue May 09 2017",
              "summary": "Want to better understand the hottest TypeScript framework?"
            },
            ...
          ]*/
          server.get('/event', eventHanddler);

          function eventHanddler(req,res) {
            getWeather(req.query.data)
               .then (weatherData => res.status(200).json(weatherData) );
           }

          function Event (event){
              this.link = event.link ;
              this.name = event.name ;
              this.event-date = event.event-date ;
              this.summary = event.summary 

          }
        server.use('*', (req,res) => {
            res.status(404).send('?????????');
          });

        server.get('*',(request,Response) =>{
            Response.status(500).send('Sorry, something went wrong');
        });
       
        server.listen(PORT, () => console.log(`App listening on ${PORT}`));
     