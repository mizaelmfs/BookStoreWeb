'use strict';

angular.module('bookStore')
  .controller('UserCtrl', function($scope,ngNotify, RestSrv, SERVICE_PATH, $location) {
   
    $scope.user = {};

    var userUrl = SERVICE_PATH.PRIVATE_PATH + '/user';
    
    RestSrv.find(userUrl, function(data) {
        $scope.user = angular.copy(data);
      });

    $scope.saveUser = function(user) {
        RestSrv.add(userUrl, user, function(response) {
            $location.path('/');
            ngNotify.set('User \'' + user.person.name + '\' alter.', 'warn');
        });
      }; 
  });
