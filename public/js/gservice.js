angular.module('gservice', [])
  .factory('gservice', function($rootScope, $http){

    var googleMapService = {};
    // sets latitude and longitude
    googleMapService.clickLat  = 0;
    googleMapService.clickLong = 0;
    // all locations
    var locations = [];
    // dropped marker from previous entry
    var lastMarker;
    // marker for current entry
    var currentSelectedMarker;

    // center of US
    var selectedLat = 39.50;
    var selectedLong = -98.35;

    googleMapService.refresh = function(latitude, longitude, filteredResults){

      locations = [];

      selectedLat = latitude;
      selectedLong = longitude;

      $http.get('/users').success(function(response){
        locations = convertToMapPoints(response);
        initialize(latitude, longitude);
      });
    };

    var convertToMapPoints = function(response){

      var locations = [];

      for(var i= 0; i < response.length; i++) {

        var user = response[i];

        var contentString =
        '<p><b>Title</b>: ' + user.title +
        '<br><b>Blerb</b>: ' + user.blerb + '<br>' +
        '<b>Image</b>: ' + user.image +
        '</p>';

        // convert json to maps friendly formatting
        locations.push({
          latlon: new google.maps.LatLng(user.location[1], user.location[0]),
          message: new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 320
          }),
          title: user.title,
          blerb: user.blerb,
          image: user.image
        });
      }
      return locations;
    };

    var initialize = function(latitude, longitude){

// create map styles!
      var styles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#424242"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#424242"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#424242"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#424242"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#424242"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#424242"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#424242"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#424242"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#424242"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#424242"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#424242"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffd600"
            },
            {
                "lightness": 17
            }
        ]
    }
]

      var options = {
        mapTypeControlOptions: {
          mapTypeIds: ['Styled']
        },
        center: myLatLng,
        zoom: 4,
        disableDefaultUI: true,
        mapTypeId: 'Styled'
      };

      var myLatLng = {
        lat: selectedLat,
        lng: selectedLong
      };

      // grab div with id = map and inject map
      var div = document.getElementById('map');
      var map = new google.maps.Map(div, options);
      var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
      map.mapTypes.set('Styled', styledMapType);

      // create a marker for each location
      locations.forEach(function(n, i){
        var marker = new google.maps.Marker({
          position: n.latlon,
          map: map,
          title: "Big Map",
          animation: google.maps.Animation.DROP,
          icon: 'http://i.imgur.com/OCTRuKR.png',
        });

        google.maps.event.addListener(marker, 'click', function(e){
          currentSelectedMarker = n;
          n.message.open(map, marker);

          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        });
      });

      var initialLocation = new google.maps.LatLng(latitude, longitude);

      var marker = new google.maps.Marker({
        position: initialLocation,
        animation: google.maps.Animation.BOUNCE,
        map: map,
        icon: 'http://orig03.deviantart.net/1eab/f/2008/129/e/9/get_colored_with_the_rainbow_by_debadyuti.gif',
      });

      lastMarker = marker;

      map.panTo(new google.maps.LatLng(latitude, longitude));

      google.maps.event.addListener(map, 'click', function(e){
        var marker = new google.maps.Marker({
          position: e.latLng,
          animation: google.maps.Animation.BOUNCE,
          map: map,
          icon: 'http://orig03.deviantart.net/1eab/f/2008/129/e/9/get_colored_with_the_rainbow_by_debadyuti.gif'
        });

        if(lastMarker) {
          lastMarker.setMap(null);
        }

        lastMarker = marker;
        map.panTo(marker.position);

        googleMapService.clickLat = marker.getPosition().lat();
        googleMapService.clickLong = marker.getPosition().lng();
        $rootScope.$broadcast("clicked");
      });
    };

    google.maps.event.addDomListener(window, 'load', googleMapService.refresh(selectedLat, selectedLong));

    return googleMapService;
  });
