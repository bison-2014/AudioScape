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

//= require jquery
//= require jquery_ujs
//= require foundation


//= require_tree .
$(document).ready(function() {



  $('body').on('click', '#home', function(event) {
    event.preventDefault()

    var myUrl = $(this).attr('href')
    $.ajax({type: 'get', url: myUrl})
      .done(function(response) {
        $('.container').remove()
        $('header').remove()

        // var r = $.parseHTML(response)
        var $header = $(response).filter('header')
        var $container = $(response).filter('.container')
        console.log($header)
        $('body').append($header)
        $('body').append($container)
        init()

      })
  })

  // $('body').on('click', '#signin', function(event) {
  //   event.preventDefault()

  //   var myUrl = $(this).attr('href')
  //   $.ajax({type: 'get', url: myUrl})
  //     .done(function(response) {
  //       $('.container').remove()

  //       $('body').append($('<div>').addClass('container row').append(response))

  //     })
  // })

  // $('body').on('click', '#signup', function(event) {
  //   event.preventDefault()

  //   var myUrl = $(this).attr('href')
  //   $.ajax({type: 'get', url: myUrl})
  //     .done(function(response) {
  //       $('.container').remove()

  //       $('body').append($('<div>').addClass('container row').append(response))

  //     })
  // })

  $('body').on('click', '#user', function(event) {
    event.preventDefault()

    var myUrl = $(this).attr('href')
    $.ajax({type: 'get', url: myUrl})
      .done(function(response) {
        $('.container').remove()

        $('body').append($('<div>').addClass('container row').append(response))

      })
  })

  // $('body').on('click', '#signout', function(event) {
  //   event.preventDefault()

  //   var myUrl = $(this).attr('href')
  //   $.ajax({type: 'delete', url: myUrl})
  //     .done(function(response) {
  //       $('.container').remove()
  //       $('footer').remove()
  //       $('body').append($('<div>').addClass('container row').append(response))

  //     })
  // })

  // $('body').on('submit', '#new_user', function(event) {
  //   // event.preventDefault()
  //   $('body').append($('<footer>').append($('<audio>').attr('id', 'audio').attr('preload', 'auto').attr('tabindex', '0').attr('controls', '').attr('type', 'audio/mpeg')))
  //   // var myUrl = $(this).attr('action')
  //   // $.ajax({type: 'post', url: myUrl, data: $(this).serialize()})
  //   //   .done(function(response) {
  //   //     $('header').remove()
  //   //     $('.container').remove()
  //   //     // var $ul = $('<ul>').addClass('button-group even-3')
  //   //     // $ul.append($('<li>').append($('<a>').attr('id', 'home').attr('class', 'button').attr('href', '/').text('Home')))
  //   //     // $ul.append($('<li>').append($('<a>').attr().attr('id', 'user').attr('class', 'button').attr('href', '/users/edit').text('User')))
  //   //     // $ul.append($('<li>').append($('<a>').attr().attr('id', 'signout').attr('class', 'button').attr('href', '/users/sign_out').attr('rel', 'nofollow').attr('data-method', 'delete').text('Exit')))
  //   //     // $('body').append($('<header>').append("<%= escape_javascript(render 'layouts/navigation').html_safe %>"))

  //   //     // $('body').append($('<header>').append($ul))
  //   //     var $header = $(response).filter('header')
  //   //     var $container = $(response).filter('.container')
  //   //     $('body').append($header)
  //   //     $('body').append($container)

  //     // })
  // })


  $('body').on('click', '#new-playlist', function(event) {
  event.preventDefault()
  var myUrl = $(this).attr('href')

  $.ajax({type: 'get', url: myUrl})
    .done(function(response) {
      // $('header').remove()
      $('.container').remove()

      $('body').append($('<div>').addClass('container row').append(response))

    })

  })

  $('body').on('submit', '#new_playlist', function(event) {
    event.preventDefault()
    var myUrl = $(this).attr('action')
    $.ajax({type: 'post', url: myUrl, data: $(this).serialize()})
      .done(function(response) {
        $('.container').remove()
        $('body').append($('<div>').addClass('container row').append(response))
      })
  })

  $('body').on('click', '#new-song', function(event) {
    event.preventDefault()
    var myUrl = $(this).attr('href')
    $.ajax({type: 'get', url: myUrl})
      .done(function(response) {
        $('.container').remove()
        $('body').append($('<div>').addClass('container row').append(response))
      })

  })

  $('body').on('submit', '#search-songs', function(event) {
    event.preventDefault()

     var myUrl = $(this).attr('action')
    $.ajax({type: 'get', url: myUrl, data: $(this).serialize()})
      .done(function(response) {
        $('.container').remove()
        $('body').append($('<div>').addClass('container row').append(response))
      })
  })

  $('body').on('click', '.add-song', function(event) {
    event.preventDefault()

     var myUrl = $(this).parent().attr('action').replace(/\?(.+)/, '')
     var params = $(this).parent().attr('action').match(/\?(.+)/)[1]
    $.ajax({type: 'post', beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))}, url: myUrl, data: params})
      .done(function(response) {
        $('.container').remove()
        // $('header').remove()


        var $container = $(response).filter('.container')
        var $newSong = $(response).find('.coverart').last().find('a')
        $('body').append($container)
        // $('#secret-playlist').append($newSong)

        init()
      })
  })

  var minUpdateUserDistance = 0.01 //km
  var userId = $("div[style='display:none']").attr('id')
  var firebaseRef = new Firebase("https://blinding-fire-43.firebaseio.com/");
  var geo_options = {
  enableHighAccuracy: true,
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
    $.ajax({type: 'patch', url: '/users/'+userId+'', data: { user: {latitude: position.coords.latitude, longitude: position.coords.longitude}}})
    // geoFire.get(userId).then(function(location) {
    //   if (location === null) {
    //     geoFire.set(userId, [position.coords.latitude, position.coords.longitude]);
    //     firebaseRef.child(userId).update({'datetime': currentdate});
    //     console.log('No key in database so we set the initial position')
    //   }
    //   else {
    //     if (GeoFire.distance([position.coords.latitude, position.coords.longitude], location) > minUpdateUserDistance ) {
    //       geoFire.set(userId, [position.coords.latitude, position.coords.longitude]);
    //       console.log('checked the key and we moved enough to update database')
    //     }
    //     }
    //   }, function(error) {
    //     console.log("Error: " + error);
    //   }
    // );
    // firebaseRef.child(userId).update({'datetime': currentdate});
  }



getLocation()

  var audio;
  var playlist;
  var tracks;
  var current;


init();
function init(){
    current = 0;
    audio = $('#audio');
    playlist = $('#playlist');
    tracks = playlist.find('.coverart a').clone();
    $('#secret-playlist').find('a').remove()
    $div = $('footer').find('#secret-playlist')
    $('#secret-playlist').append(tracks)
    len = tracks.length;
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
            console.log('done')
            link = $div.find('a')[0];
        }else{
            link = $div.find('a')[current];
        }
        console.log($(link))
        run($(link),audio[0]);
    });
}
function run(link, player){
        console.log(link)
        player.src = link.attr('href');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        audio[0].load();
        audio[0].play();
}





})

$(function(){ $(document).foundation(); });
