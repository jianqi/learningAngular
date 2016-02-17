var NewsApp = angular.module("NewsApp", []);

function NewsCtrl($scope, ChatService){
    $scope.name = "";
    $scope.message = "";
    
    $scope.link = "";
    $scope.title = "";
    $scope.thumbnail = "";
    $scope.description = "";
    $scope.date = "";
    
    $scope.post = function(){    
        
        ChatService.send($scope.name,$scope.message,$scope.title);
        
        $scope.message = "";
    }
    
    ChatService.connect(function(data){
        
        $scope.title = data.title;
        $scope.link = data.link;
        $scope.description = data.description;
        $scope.thumbnail = data.thumbnail;
        $scope.date = data.pubdate;
        
    })
    
}

function ChatService($http,$httpParamSerializerJQLike,$rootScope){
    this.source = null;
    this.connect = function(callback){
        this.source = new EventSource("http://10.10.0.56:8080/topnews/api/news");
        this.source.addEventListener("message", function(evt){
            $rootScope.$apply(function(){
                callback(JSON.parse(evt.data));
            })
        });
    }
    
    this.send = function(username, message,title){
        $http({
            method: "POST",
            url: "http://10.10.0.56:8080/topnews/comment",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: $httpParamSerializerJQLike({
                title: title,
                name: username,
                comment: message
            })
        });
    }
}



NewsApp.controller("NewsCtrl", ["$scope","ChatService", NewsCtrl]);

NewsApp.service("ChatService", ["$http","$httpParamSerializerJQLike","$rootScope",ChatService]);
