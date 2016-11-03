angular.module('myApp')
  .controller('VenuesController', function($scope, $stateParams, $http, VenuesService, FavoritesService) {

      $scope.visited = null;
      $scope.doSearch = function(addressError, categoryError){
        if(addressError || categoryError){
          alert('hey i need an address and category!!');
          return;
        }
        
        // google
        VenuesService.getGoogle($scope.address).then(function(response) {
          console.log(response.data);
          if (response.data.results.length === 0) {
            alert("please write the correct address!!!");
            return;
          }
          var location = response.data.results[0].geometry.location;
          console.log(location.lat, location.lng);

    
          // wikipedia
          VenuesService.getWikipedia(location).then(function(response) {
            $scope.interests = response.data.query.geosearch
          });

          //foursquare
          VenuesService.getFoursquare(location, $scope.category).then(function(response) {
            $scope.venues =  response.data.response.groups[0].items
          })
        });
      }

      $scope.isInFavorite = function(locationName) {
        for(var i = 0; i < $scope.listFavorites.length; i++) {
          if ($scope.listFavorites[i].name === locationName){
            return true;
          }
        }
        return false;
      }

      FavoritesService.list().then(function(result) {
        console.log(result.data)
        $scope.listFavorites = result.data;

      })
   

      $scope.addFavoriteFoursquare = function(location) {  
        FavoritesService.create({
          name: location.venue.name,
          lat: location.venue.location.lat,
          lng: location.venue.location.lng,
          address: location.venue.location.formattedAddress.join(', ')
        }).then(function(result){
          $scope.listFavorites.push(result.data);
        })
      }

      $scope.addFavoriteWikipedia = function(location) {
        console.log(location,"wilipedia");
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.lat + ',' + location.lon).then(function(response){
          FavoritesService.create({
            name: location.title,
            lat: location.lat,
            lng: location.lon,
            address: response.data.results[0].formatted_address
          }).then(function(result) {
            $scope.listFavorites.push(result.data)
          })
        });
      }

});

