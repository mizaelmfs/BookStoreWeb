'use strict';

angular.module('bookStore')
  .controller('HomeCtrl', function($scope, ngNotify, RestSrv, SERVICE_PATH, $rootScope, $location) {
    $scope.title = '';
    $scope.books = [];
    $scope.pagination = {};
    $scope.totalPages = [];
    $scope.itensSale = {};
    
    $scope.sale = {
      fullValue:0,
      itensSale:[]
    };
    
    var bookUrl = SERVICE_PATH.PUBLIC_PATH + '/';
    
    RestSrv.find(bookUrl + 'list?page=0&size=6&sort=id', function(data) {
        $scope.books = data.content;
        $scope.pagination = data;
        for(var i = 0; i < $scope.pagination.totalPages; i++){
          $scope.totalPages.push(i);
          
        }
      });
    
    $scope.finByTitle = function(){
      if($scope.title){
        RestSrv.find(bookUrl +'find/'+ $scope.title, function(data) {
            $scope.books = data;
        });
      }
    }

    $scope.backspace = function(event){
      if($scope.title){
        RestSrv.find(bookUrl +'find/'+ $scope.title, function(data) {
            $scope.books = data;
        });
      }else{
        if (event.keyCode === 8) {
                RestSrv.find(bookUrl + 'list?page=0&size=6&sort=id', function(data) {
                $scope.books = data.content;
                $scope.pagination = data;
              });
        }
      }
    }

      $scope.findPagination = function(page) {
        RestSrv.find(bookUrl + 'list?page='+ page +'&size=6&sort=id', function(response) {
           $scope.books = response.content;

        });
      };

      $scope.plus = function(book){
        $scope.itensSale = {};
        $scope.itensSale.book = book;
        $scope.sale.fullValue = ($scope.sale.fullValue + $scope.itensSale.book.price);
        $scope.sale.itensSale.push($scope.itensSale);
      //$scope.values();
      ngNotify.set('Book \'' + book.title + '\' add ao cart.', 'grimace');
    };

    $scope.cart = function(){
      $rootScope.authSale = $scope.sale;
       $location.path('/sale');
    };
  });