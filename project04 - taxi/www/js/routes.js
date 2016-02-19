function TaxiCtrl($scope){
    // LOCATION 
    navigator.geolocation.getCurrentPosition(function(pos){
         $scope.$apply(function(){
             $scope.center = pos.coords;
         })
     });
    
    //SMS
    
    
    $scope.bookdetails = {postalCode : "0",
                         pickup : ""};
    
    var options = {
        replaceLineBreaks: false,
        android : {intent: 'INTENT' 
    }};
    $scope.sendSms = function(){
        
            sms.send('1231231', "BOOK "+$scope.bookdetails.postalCode + " #" + $scope.bookdetails.pickup, options)
            .then(
                function(){ // successs
                    console.log("success");
                }, 
                function(){ //failed
                    console.log("failed");
            });
    }
    
    
}


angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('page', {
    url: '/page1',
    templateUrl: 'templates/taxi.html',
    controller: ["$scope", TaxiCtrl]
  })

$urlRouterProvider.otherwise('/page1')

  

});