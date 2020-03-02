'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoibWoyOTYwIiwiYSI6ImNrNzU4eXkwNjB2eHkzbXBuMmxpeng4ZWEifQ.HCra4TqNRHHkpKDmYRAK1w'
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mj2960/ck76exelt1pcu1ipc5kh0go7p',
    center: [-89.8113, 30.0221],
    zoom: 10
    // center: [-73.93324, 40.80877],
    // zoom: 14
});
var trees_url = "./data/nyc_harlemriverstreettrees_4326.geojson"


map.on('load',function(){

        // NYPL map warper raster tile service as source
map.addSource('nypl',{
    'type':'raster',
    'tiles':["http://maps.nypl.org/warper/maps/tile/27677/{z}/{x}/{y}.png "],
    "tileSize": 256,
  });
  // create a layer from the NYPL tiles
  map.addLayer({
    'id':'nypl-m',
    'type':'raster',
    'source':'nypl',
    'paint':{
      'raster-opacity':0.85
    }
})

    // define a 'source' for your point dataset
    map.addSource('trees_data',{
      'type':'geojson',
      'data': "./data/nyc_harlemriverstreettrees_4326.geojson"
    });
    // add a new layer with your points
    map.addLayer({
      'id':'trees',
      'type':'circle',
      'source':'trees_data',
      'paint':{
        'circle-radius':4,
        'circle-color': '#349f27',
        'circle-opacity':0.7
      },
    })
    //add layer with point dataset for disaster tour
    map.addSource('disaster_data',{
        'type':'geojson',
        'data': "./data/Disaster_Tour_Only.geojson"
      });
      //add layer for the points
    map.addLayer({
        'id':'disaster',
        'type':'circle',
        'source':'disaster_data',
        'paint':{
          'circle-radius':4,
          'circle-color': '#FF0000',
          'circle-opacity':0.7
        },
      })
  
  
  });
