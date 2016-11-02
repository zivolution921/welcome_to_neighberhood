function VenuesService($http) {
  var services = {};
 

  services.getFoursquare = function(location, category) {
    var foursquareUrl = "https://api.foursquare.com/v2/venues/explore?ll=" + location.lat + "," + location.lng + "&client_id=" + config.clientId + "&client_secret=" + config.clientSecret + "&v=20161025&query=" + category; 
    return $http.get(foursquareUrl)
  }

  services.getGoogle = function(address) {
    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false";
    return $http.get(googleUrl)
  }

  services.getWikipedia = function(location) {
    var wikipediaUrl = "https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=" + location.lat + "|" + location.lng + "&format=json&origin=*";
    return $http.get(wikipediaUrl)
  }


  return services;
};
angular.module("myApp")
  .factory('VenuesService', VenuesService) 