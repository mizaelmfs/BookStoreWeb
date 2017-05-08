'use strict';

angular.module('bookStore')
  .controller('AccCtrl', function($scope, $http, $location ,ngNotify, RestSrv, SERVICE_PATH) {
   
    $scope.user = {};
    $scope.showForm = true;

    var userUrl = SERVICE_PATH.PUBLIC_PATH + '/accont';

    $scope.saveUser = function(user) {
        RestSrv.add(userUrl, user, function(newUser) {
            $location.path('/login');
            ngNotify.set('User \'' + user.name + '\' added.', 'success');
        });
      };  
    
    $scope.finByEmail = function(){
        RestSrv.find(userUrl + '/' + $scope.user.email, function(data) {
            $scope.showForm = data;
            ngNotify.set('Email Exists');
        });
    }
    
    $scope.cancel = function(){
         $location.path('/');
    }

    $scope.imageBase = function(){
    var reader = new window.FileReader();
   	 reader.readAsDataURL($scope.user.person.image); 
   	 reader.onloadend = function() {
   	        var base64data = reader.result;
   	                var image = base64data;
   	                var clip = image.split(",");
   	                $scope.user.person.image = clip[1];
   	  }
    }
  });
