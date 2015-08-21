myBusLine.factory('busLineSvc', ['$http','$q', function ($http,$q)
{
    var factory = {};

    factory.getBusLines = function(){
         return($http.get('data/busLines.json').then(handleSuccess, handleError));
    }

    factory.getBusLinesInfo = function(value){
         return($http.get('data/'+value+'.json').then(handleSuccess, handleError));
    }

   function handleError(response)
   {
       if(!angular.isObject(response.data) || !response.data.message)
       {
           return($q.reject("Error occurred at widget endpoint."));
       }
       return($q.reject(response.data.message));
   }

   function handleSuccess(response)
   {
       return(response.data);
   }

	return factory;
}]);

myBusLine.factory('storageSvc', ['$http','$q', function ($http,$q)
{
    var factory = {};

    factory.save = function(key,value){
      var def = $q.defer();
      window.localStorage.setItem(key,value);
      def.resolve('Ok');
      return def.promise;
    }

    factory.get = function(key){
         return(localStorage.getItem(key));
    }

	return factory;
}]);

myBusLine.factory('favoritesSvc', ['$http','$q', function ($http,$q)
{
    var factory = {};

    factory.addFavorite = function(value){
      var favorites = JSON.parse(window.localStorage.getItem('favorites'));
      var def = $q.defer();
      if(favorites == null){
        favorites = [];
      }
      var index = favorites.indexOf(value.id);
      if(index == -1)
      {
      favorites.push(value.id);
      window.localStorage.setItem('favorites',JSON.stringify(favorites));
      def.resolve('Ok');
      }
      else{
          def.reject('Olredy exists!');
      }
      return def.promise;
    }

    factory.getAll = function(){
      var def = $q.defer();
        def.resolve(JSON.parse(window.localStorage.getItem('favorites')));
        return def.promise;
    }

    factory.remove = function(value){
      var favorites = JSON.parse(window.localStorage.getItem('favorites'));
      var def = $q.defer();
      var index = favorites.indexOf(value);
      favorites.splice(index,1);
      window.localStorage.setItem('favorites',JSON.stringify(favorites));
      def.resolve('Ok');
      return def.promise;
    }

	return factory;
}]);
