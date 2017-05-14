'use strict';

angular.module('bookStore')
  .controller('SaleCtrl', function($scope, ngNotify, RestSrv, SERVICE_PATH, $rootScope, $location) {

    $scope.sale = $rootScope.authSale;

    $scope.delete = function(book) {
        $scope.sale.itensSale.splice($scope.sale.itensSale.indexOf(book), 1);
        $scope.sale.fullValue =  $scope.sale.fullValue - book.price;
        ngNotify.set('Book \'' + book.title + '\' deleted.', 'warn');
    };

    var saleUrl = SERVICE_PATH.PRIVATE_PATH + '/sale';

    $scope.saveSale = function() {
        RestSrv.add(saleUrl, $scope.sale, function(sale) {
          ngNotify.set('Sale success.', 'success');
          $location.path('/');
        });
      };
  });