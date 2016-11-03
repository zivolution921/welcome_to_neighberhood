angular.module('myApp')
  .controller('MapsController', function($scope, $http, FavoritesService, NgMap) {
    // load the map via ngMap.getMap() and then populate the map.markers with an array of lat/long of the favorites
    $scope.dynamicMarkers = []

    FavoritesService.list().then(function(result) {
      console.log(result.data)
      $scope.favorites = result.data;
      for (var i = 0; i < $scope.favorites.length; i++) {
        var position = new google.maps.LatLng($scope.favorites[i].lat, $scope.favorites[i].lng);
        var marker = new google.maps.Marker({position: position});
        console.log("My marker is ",marker);
        $scope.dynamicMarkers.push(marker);
      }
      
      console.log("My dynamicMarkers is", $scope.dynamicMarkers);
      NgMap.getMap().then(function(map) {
        $scope.makers = new MarkerClusterer(map, $scope.dynamicMarkers, {});
        // debugger
      })      
    })
    // NgMap.getMap().then(function(map) {
    //   map.markers = [["40.1", "-70.8"]]
    //   // map.markers.push(["40.1", "-70.8"])
    // // console.log(map.getCenter());
    // // console.log('markers', map.markers);
    // // console.log('shapes', map.shapes);
    // });
  
});