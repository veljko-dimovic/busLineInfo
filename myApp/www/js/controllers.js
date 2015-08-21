myBusLine.controller('busLinesCtrl',['$scope', '$rootScope', '$filter','$interval','$timeout','busLineSvc','$ionicHistory', function ($scope,$rootScope, $filter,$interval, $timeout,busLineSvc,$ionicHistory)
{
   busLineSvc.getBusLines().then(function(result){
     $scope.busLines = result.lines;
   });

   $scope.goBack = function(){
      $ionicHistory.goBack();
   };
}]);

myBusLine.controller('busLineCtrl', function($scope, $stateParams,busLineSvc,favoritesSvc,$ionicHistory, filterFilter) {
  busLineSvc.getBusLinesInfo($stateParams.lineId).then(function(result){
    $scope.activeLine = result;
    $scope.updateData();
  });

  $scope.goBack = function(){
     $ionicHistory.goBack();
  };

  $scope.selection = "Radni dan";

  $scope.$watch("selection", function(newVal, oldVal) {
                if(newVal !== oldVal) {
                    $rootScope.beaconSense = newVal;
                    localStorage.setItem("beaconSense", newVal);
                }
            });


  $scope.updateData = function (value) {
    if(value == null)
    value =$scope.selection;
    $scope.filteredItemsA =  filterFilter($scope.activeLine.polasci,{smer:'smerA', dan:value});
    $scope.filteredItemsB =  filterFilter($scope.activeLine.polasci,{smer:'smerB', dan:value});
  };

    $scope.addToFavorites = function(){
      favoritesSvc.addFavorite($scope.activeLine).then(function(result){
        if(result !="Ok"){

        }
          $scope.result='Uspesno dodata linija u moje linije';
      });
    };
});

myBusLine.controller('favoritesCtrl', function($scope, $stateParams,busLineSvc,favoritesSvc,$ionicHistory) {
  favoritesSvc.getAll().then(function(result){
    busLineSvc.getBusLines().then(function(data){
      $scope.busLines = data.lines;
      $scope.favorites = result;
      angular.forEach($scope.favorites, function(value, key)
      {
        busLineSvc.getBusLinesInfo(value).then(function(result){
          $scope.polasci.push.apply($scope.polasci, result.polasci);
        });
      });
    });

    $scope.polasci = [];
     $scope.selection = "Radni dan";

    $scope.ifExists = function (value) {
      if($scope.favorites === undefined)
      return false;
        var index = $scope.favorites.indexOf(value.id);
        if(index!=-1){
          return true;
        }
        return false;
    }

    $scope.isTimePass = function (value) {
      var today = new Date();
      var res = value.time.split(":");
      var start = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate(),res[0],res[1],0);
      return start > today;
    }

    $scope.goBack = function(){
       $ionicHistory.goBack();
    };

    $scope.removeFromFavorites = function(item){
      favoritesSvc.remove(item.id);
        favoritesSvc.getAll().then(function(result){
          $scope.favorites = result;
        });
    }
  });
});

myBusLine.controller('aboutCtrl', function($scope, $stateParams,busLineSvc,favoritesSvc,$ionicHistory) {
  $scope.goBack = function(){
     $ionicHistory.goBack();
  };
});
myBusLine.controller('homeCtrl', function($scope, $stateParams,busLineSvc,favoritesSvc,$ionicHistory) {
  favoritesSvc.getAll().then(function(result){
    busLineSvc.getBusLines().then(function(data){
      $scope.busLines = data.lines;
      $scope.favorites = result;
      angular.forEach($scope.favorites, function(value, key)
      {
        busLineSvc.getBusLinesInfo(value).then(function(result){
          $scope.polasci.push.apply($scope.polasci, result.polasci);
        });
      });
    });
    });

    $scope.polasci = [];
     $scope.selection = "Radni dan";

    $scope.ifExists = function (value) {
      if($scope.favorites === undefined)
      return false;
        var index = $scope.favorites.indexOf(value.id);
        if(index!=-1){
          return true;
        }
        return false;
    }

    $scope.isTimePass = function (value) {
      var today = new Date();
      var res = value.time.split(":");
      var start = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate(),res[0],res[1],0);
      return start > today;
    }

});

myBusLine.controller('mapCtrl',function ($scope, $ionicLoading, $compile,$ionicHistory){
  function initialize() {
      var myLatlng = new google.maps.LatLng(44.012711,20.926741);

      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"),
          mapOptions);

      //Marker + infowindow + angularjs compiled ng-click
      var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
      var compiled = $compile(contentString)($scope);

      var infowindow = new google.maps.InfoWindow({
        content: compiled[0]
      });

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Uluru (Ayers Rock)'
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });

      $scope.map = map;
    }
    //google.maps.event.addDomListener(window, 'load', initialize);
   initialize();

    $scope.centerOnMe = function() {
      if(!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };

    $scope.goBack = function(){
       $ionicHistory.goBack();
    };

    $scope.clickTest = function() {
      alert('Example of infowindow with ng-click')
    };
});
