'use strict';

angular.module('bookStore')
  .controller('HomeCtrl', function($scope, ngNotify, RestSrv, SERVICE_PATH) {
    $scope.title = '';
    $scope.books = [];
    $scope.pagination = {};
    $scope.totalPages = [];
    
    var bookUrl = SERVICE_PATH.PUBLIC_PATH + '/';
    
    RestSrv.find(bookUrl + 'list?page=0&size=6&sort=id', function(data) {
        $scope.books = data.content;
        $scope.pagination = data;
        for(var i = 0; i < $scope.pagination.totalPages; i++){
          $scope.totalPages.push(i);
          
        }
        //ngNotify.set('Loaded books with success.', 'success');
      });
    
    $scope.finByTitle = function(){
        RestSrv.find(bookUrl +'find/'+ $scope.title, function(data) {
            $scope.books = data;
        });
    }

      $scope.findPagination = function(page) {
        RestSrv.find(bookUrl + 'list?page='+ page +'&size=6&sort=id', function(response) {
           $scope.books = response.content;

        });
      };
  });