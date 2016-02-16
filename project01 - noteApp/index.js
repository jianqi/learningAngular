
var noteApp = angular.module("noteApp",["ngAnimate"]);

function noteCtrl ($scope){
    $scope.notes = [];
    $scope.title = "";
    $scope.content = "";
    
    $scope.addNote = function(){
        var noteObj = {
            title: $scope.title,
            content: $scope.content,
            hide : true
        };
        
        $scope.notes.push(noteObj);
       
    }
    
    $scope.removeNote = function($index){
        $scope.notes.splice($index,1);
    }
    
    $scope.toggleText = function($index){
        $scope.notes[$index].hide = !$scope.notes[$index].hide;
    }
    
}

noteApp.controller("noteCtrl", ["$scope", noteCtrl]);