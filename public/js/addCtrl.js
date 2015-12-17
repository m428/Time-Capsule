// create the addCtrl controller - depends on services
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){


    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // set initial coordinates to center of US
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;



    // get user's coordinates based on HTML5 at window load - SO COOL!
    geolocation.getLocation().then(function(data){

    // set latitude and longitude equal to HTML5 coordinates
    coords = {lat:data.coords.latitude, long:data.coords.longitude};

    $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
    $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

    // message coordinates verified.
    $scope.formData.htmlverified = "Woohoo!";

    gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

});


    // get coordinates on click
    $rootScope.$on("clicked", function(){

        // gservice functions associated with identifying coordinates
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "Nope";
        });
    });


    // creates new cache based on html form
    $scope.createUser = function() {

        // Grabs all of the text box fields
        var userData = {
            title: $scope.formData.title,
            blerb: $scope.formData.blerb,
            image: $scope.formData.image,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // saves cache data to database
        $http.post('/users', userData)
            .success(function (data) {
                console.log(data)
                alert("Cache Created!")
                // once complete, clear form
                // $scope.formData.title = "";
                // $scope.formData.blerb = "";
                // $scope.formData.image = "";

                // refresh map with new data
                // gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
            })
            .error(function (data) {
                console.log('Error: ' + data);
          });
    };
});
