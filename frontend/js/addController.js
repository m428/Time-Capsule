var addController = angular.module('addController', ['geolocation', 'gservice']);
addController.controller('addController', function($scope, $http, $rootScope, geolocation, gservice){

    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // set initial coordinates - center of the US
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;

    // get user's actual coordinates based on HTML5 at window load - SO COOL!
    geolocation.getLocation().then(function(data){

    // set latitude and longitude equal to HTML5 coordinates
    coords = {lat:data.coords.latitude, long:data.coords.longitude};

    // display coordinates in location textboxes rounded to three decimal points
    $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
    $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

    // verification message
    $scope.formData.htmlverified = "Woohoo!";
    gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
});
    // get coordinates based on mouse click
    $rootScope.$on("clicked", function(){

        // run gservice functions for identifying coordinates
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "Not Veriifed";
        });
    });

    // create new cache based from form fields
    $scope.createCache = function() {

        // grab form inputs
        var cacheData = {
            title: $scope.formData.title,
            blerb: $scope.formData.blerb,
            image: $scope.formData.image,,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // save to database
        $http.post('/cachess', cacheData)
            .success(function (data) {
                // clear the form (except location)
                $scope.formData.title = "";
                $scope.formData.blerb = "";
                $scope.formData.image = "";
                // refresh the map with new data
                // gservice.refresh($scope.formData.latitude, $scope.formData.longitude)
            })
            .error(function (data) {
                console.log('Error: ' + data);
        });
    };
});
