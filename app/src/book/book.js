'use strict';

angular.module('bookStore')
  .controller('BookCtrl', function($scope, ngNotify, RestSrv, SERVICE_PATH) {
    
    $scope.book = {};
    $scope.books = [];
    $scope.pagination = {};
    $scope.totalPages = [];
    $scope.showAddEditUser = false;

     //show author
     $scope.show = function() {
      $scope.showAddEditUser = true;
    };
    //Hide author
    $scope.hide = function() {
      $scope.showAddEditUser = false;
      $scope.book = {};
    };

    var bookUrl = SERVICE_PATH.PRIVATE_PATH + '/book';

    $scope.edit = function(book) {
      $scope.show();
      $scope.book = angular.copy(book);
      
    };

    $scope.delete = function(book) {
      RestSrv.delete(bookUrl, book, function() {
        $scope.books.splice($scope.books.indexOf(book), 1);
        ngNotify.set('User \'' + book.title + '\' deleted.', 'success');
      });
    };
    
    $scope.saveBook = function(book) {
        RestSrv.add(bookUrl, book, function(newBook) {
          if(book.id){
            for (var i = 0; i < $scope.books.length; i++) {
              if ($scope.books[i].id === book.id) {
              $scope.books[i] = book;
              }
            }
          } else{
            $scope.books.push(newBook);
          }
          $scope.hide();
          ngNotify.set('Book \'' + book.title + '\' added.', 'success');
        });
      };

     RestSrv.find(bookUrl + ' /list?page=0&size=4&sort=id', function(data) {
        $scope.books = data.content;
        $scope.pagination = data;
        for(var i = 0; i < $scope.pagination.totalPages; i++){
          $scope.totalPages.push(i);
          
        }
        
      });

       $scope.findPagination = function(page) {
        RestSrv.find(bookUrl + '/list?page='+ page +'&size=4&sort=id', function(response) {
           $scope.books = response.content;

        });
      };

    $scope.imageBase = function(){
    var reader = new window.FileReader();
   	 reader.readAsDataURL($scope.book.image); 
   	 reader.onloadend = function() {
   	        var base64data = reader.result;
   	                var image = base64data;
   	                var clip = image.split(",");
   	                $scope.book.image = clip[1];
   	  }
    }
  });