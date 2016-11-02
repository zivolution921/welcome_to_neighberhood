function FavoritesService($http) {
  var services = {};
  var endpoint = "favorites";

    services.list = function() {
      return $http.get(endpoint);
    }
  
    services.get = function(favorite_id) {
      return $http.get(endpoint + "/" + favorite_id);
    }

    services.create = function(favorite) {
      return $http.post(endpoint, { favorite: favorite });
    }

    services.update = function(favorite) {
      return $http.put(endpoint + "/" + favorite.id, {
        favorite: favorite
      });
    }

    services.delete = function(favorite) {
      return $http.delete(endpoint + "/" + favorite.id);
    }
    return services;
  }

angular.module("myApp")
  .factory('FavoritesService', FavoritesService) 