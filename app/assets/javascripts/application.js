// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs

//= require_tree .
$(document).ready(function() {

  var x = document.getElementById("demo");

  var minUpdateUserDistance = 0.01 //km
  var userId = $("div[style='display:none']").attr('id')
  var firebaseRef = new Firebase("https://blinding-fire-43.firebaseio.com/");
  var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 30000,
  timeout           : 27000
  };

  // Create a GeoFire index
  var geoFire = new GeoFire(firebaseRef);
  console.log(userId)
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.watchPosition(checkGeoFire, null, geo_options);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }
//   function showPosition(position) {
//       x.innerHTML = "Latitude: " + position.coords.latitude +
//       "<br>Longitude: " + position.coords.longitude;
// }



  function checkGeoFire(position) {
    // geoFire.set(userId, [position.coords.latitude, position.coords.longitude])
    geoFire.get(userId).then(function(location) {
      if (location === null) {
        geoFire.set(userId, [position.coords.latitude, position.coords.longitude]);
        console.log('No key in database so we set the initial position')
      }
      else {
        if (GeoFire.distance([position.coords.latitude, position.coords.longitude], location) > minUpdateUserDistance ) {
          geoFire.set(userId, [position.coords.latitude, position.coords.longitude])
          console.log('checked the key and we moved enough to update database')
        }
        }
      }, function(error) {
        console.log("Error: " + error);
      });

  }


  // geoFire.

getLocation()

//   geoFire.set("some_key", [37.79, -122.41]).then(function() {
//   console.log("Provided key has been added to GeoFire");
// }, function(error) {
//   console.log("Error: " + error);
// });
  // var loc = 0;




})
