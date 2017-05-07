'use strict';

angular.module('bookStore')
  .controller('HomeCtrl', function($scope, ngNotify, RestSrv, SERVICE_PATH) {
    $scope.title = '';
    $scope.books = [];
    
    var bookUrl = SERVICE_PATH.PUBLIC_PATH + '/';
    
    RestSrv.find(bookUrl, function(data) {
        $scope.books = data;
        //ngNotify.set('Loaded books with success.', 'success');
      });
    
    $scope.finByTitle = function(){
        RestSrv.find(bookUrl +'find/'+ $scope.title, function(data) {
            $scope.books = data;
        });
    }
    
    $scope.all = function(){
        RestSrv.find(bookUrl, function(data) {
        $scope.books = data;
        //ngNotify.set('Loaded books with success.', 'success');
      });
    }
  });