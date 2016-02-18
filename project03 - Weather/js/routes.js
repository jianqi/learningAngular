function WeatherCtrl($rootScope,$scope,$state){
    $rootScope.locations = [];
    
    if(localStorage.getItem("locations")){
        $rootScope.locations = localStorage.getItem("locations").split(",");
    }
    
    $scope.addCity = function(){        
        $state.go('addCity');
    }
    
    $scope.weatherDetails = function(location){
        $state.go('weatherDetail', {"location":location})
    }
}

function CityCtrl($rootScope, $scope, $state){
    $scope.cityName = {"country":''};
    $scope.add = function(){        
        var locations = []
        if(localStorage.getItem("locations")){
            locations = localStorage.getItem("locations").split(",");
        }
        locations.push($scope.cityName.country);
        localStorage.setItem('locations', locations.join(","));
        
        $rootScope.locations.push($scope.cityName.country);
        $state.go("weather");
    }
}

function WeatherDetailCtrl($scope, $stateParams, fetchWeatherService,$ionicNavBarDelegate){
    $scope.date = new Date();
    $scope.weather = "";
    $scope.name = "";
    
    fetchWeatherService.fetchWeather($stateParams.location)
        .then(function (result){
        $scope.weather = result.weather[0];
        $scope.temp = result.main;
        $scope.name = result.name;
        $ionicNavBarDelegate.title(result.name);
        $ionicNavBarDelegate.showBackButton(true);
    });
    
    
}


angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
        
    .state('weather', {
      url: '/main',
      templateUrl: 'templates/weather.html',
      controller: ["$rootScope","$scope","$state",WeatherCtrl]
    })
        
      
    
      
        
    .state('addCity', {
      url: '/addCity',
      templateUrl: 'templates/addCity.html',
      controller: ["$rootScope","$scope","$state",CityCtrl]
    })
        
      
    
      
        
    .state('weatherDetail', {
      url: '/weatherdetails/:location',
      templateUrl: 'templates/weatherDetail.html',
      controller: ["$scope","$stateParams", "fetchWeatherService", "$ionicNavBarDelegate", WeatherDetailCtrl]
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/main');
  

  

});