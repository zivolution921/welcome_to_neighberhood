angular.module('myApp')
  .controller('FavoritesController', function($scope, $http, FavoritesService) {
   
    $http.get('favorites').then(function(result) {
      console.log(result.data)
      $scope.favorites = result.data;
    })
   
   $scope.update = function(favorite) {
    favorite.edit = false;
    FavoritesService.update(favorite).then(function(result) {
      console.log(result.data)
    })
   }

   $scope.delete = function(favorite, index) {
    FavoritesService.delete(favorite).then(function(result) {
      $scope.favorites.splice(index, 1);
      console.log(result.data)
    })
   }

   //$scope.homeAddress = '112 brown circle paramus nj';

    $scope.calculate = function(addressError){
      if (addressError) {
        alert("Please input address!!!");
        return;
      }
      var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + $scope.homeAddress + "&sensor=false";

     $http.get(googleUrl).then(function(response) {
        if(response.data.results.length === 0) {
          alert("Please input the correct address!!!");
          return;
        }
       var location = response.data.results[0].geometry.location;
       console.log(location.lat, location.lng);

       $scope.favorites.forEach(function(item){
          item.distance = calculateDistance(location.lat, location.lng, item.lat, item.lng, 'M');
       });

       $scope.favorites = $scope.favorites.sort(function(a, b){ return a.distance - b.distance });

      });
    };

   function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
  }

  $scope.currentLocation = function(){
    $scope.homeAddress = 'Locating...'
    navigator.geolocation.getCurrentPosition(success, error) 
  }


  function success(position) {
    console.log(position)
    var crd = position.coords;
    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');

    $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + [crd.latitude, crd.longitude].join(',')).then(function(response){
      $scope.homeAddress = response.data.results[0].formatted_address;
    });
  }

  function error(error) {
    console.log(error)
  }

});