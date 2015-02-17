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
//= require foundation

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

  var currentdate = new Date();




  // Create a GeoFire index
  var geoFire = new GeoFire(firebaseRef);


  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.watchPosition(checkGeoFire, null, geo_options);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }


  function checkGeoFire(position) {
    // firebaseRef.push(userId)

    geoFire.get(userId).then(function(location) {
      if (location === null) {
        geoFire.set(userId, [position.coords.latitude, position.coords.longitude]);
        firebaseRef.child(userId).update({'datetime': currentdate});
        console.log('No key in database so we set the initial position')
      }
      else {
        if (GeoFire.distance([position.coords.latitude, position.coords.longitude], location) > minUpdateUserDistance ) {
          geoFire.set(userId, [position.coords.latitude, position.coords.longitude]);
          console.log('checked the key and we moved enough to update database')
        }
        }
      }, function(error) {
        console.log("Error: " + error);
      }
    );
    firebaseRef.child(userId).update({'datetime': currentdate});
  }



getLocation()

  var audio;
  var playlist;
  var tracks;
  var current;

  init();
  function init(){
      current = 0;
      audio = $('audio');


      playlist = $('#playlist');
      tracks = playlist.find('span a');
      firstTrackSrc = tracks.first().attr('href')
      source = $('<source>').attr('type', 'audio/mpeg').attr('src', firstTrackSrc)
      audio.append(source)
      len = tracks.length - 1;
      audio[0].volume = .50;
      audio[0].play();
      playlist.find('a').click(function(e){
          e.preventDefault();
          link = $(this);
          current = link.parent().index();
          run(link, audio[0]);
      });
      audio[0].addEventListener('ended',function(e){
          current++;
          if(current == len){
              current = 0;
              link = playlist.find('a')[0];
          }else{
              link = playlist.find('a')[current];
          }
          run($(link),audio[0]);
      });
  }
  function run(link, player){
          player.src = link.attr('href');
          par = link.parent();
          par.addClass('active').siblings().removeClass('active');
          audio[0].load();
          audio[0].play();
  }




})

$(function(){ $(document).foundation(); });
