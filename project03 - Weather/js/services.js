function fetchWeatherService($http, $q){
    this.fetchWeather = function(location){
        var defer = $q.defer();
//        console.log(">>> url " + CONFIG.weather_url+"?q="+location+"&appid="+CONFIG.api_key);
        $http.get("http://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=01bf3a7c34b5aa5e36af37414c55443b&units=metric")
            .then(function(result){
            defer.resolve(result.data);
        }) 
        
        return (defer.promise);
        
    };
}

angular.module('app.services', [])
    .constant("CONFIG",{"api_key":"01bf3a7c34b5aa5e36af37414c55443b",
                        "weather_url":"http://api.openweathermap.org/data/2.5/weather"})
    .service('fetchWeatherService', ["$http","$q",fetchWeatherService]);

