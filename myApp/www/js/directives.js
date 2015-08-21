myBusLine.filter('matcher', function(var1, var2) {
  debugger;
/*return function(arr1, arr2) {
  if(arr1 != undefined && arr2 != undefined)
  {
  return arr1.filter(function(val) {
    return arr2.indexOf(val) != -1;
  })
 }
 }*/
});

myBusLine.filter("skip", function () {
return function (data, count) {
if (angular.isArray(data) && angular.isNumber(count)) {
if (count > data.length || count < 1) {
return data;
} else {
return data.slice(count);
}
} else {
return data;
}
}
});


myBusLine.directive('notification', function($interval) {
  return {
    restrict: 'E',
    scope:{},
    tranclude:true,
    templateUrl: 'templates/notification.html',
    link: function (scope, element) {
      debugger;
      scope.visibility = false;
      scope.warningInfoMessage = element.attributes["text"];
      scope.result = 'success';
      var stopTime;

      scope.$watch('warningInfoMessage', function() {
        debugger;
          scope.visibility = true;
          stopTime = $interval(stop, 1500);
      });

      function stop(){
          scope.visibility = false;
          $interval.cancel(stopTime);
      };

      scope.colorTemplate = function() {
          if(scope.result =='success')
          return 'color';

          return 'assertive';
      }
    }
  };
});
