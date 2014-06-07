var omgneedApp = angular.module('omgneed-app', ['ngResource', 'mm.foundation']).config(
    ['$httpProvider', function($httpProvider) {
    var authToken = angular.element("meta[name=\"csrf-token\"]").attr("content");
    var defaults = $httpProvider.defaults.headers;

    defaults.common["X-CSRF-TOKEN"] = authToken;
    defaults.patch = defaults.patch || {};
    defaults.patch['Content-Type'] = 'application/json';
    defaults.common['Accept'] = 'application/json';
}]);

omgneedApp.factory('User', ['$resource', function($resource) {
  return $resource('/users/:id',
     {id: '@id'},
     {update: { method: 'PATCH'}});
}]);

omgneedApp.factory('Products', ['$resource', function($resource) {
  return $resource('/products/:id',
     {id: '@id'},
     {update: { method: 'PATCH'}});
}]);

omgneedApp.factory('List', ['$resource', function($resource) {
  return $resource('/lists/:id',
     {id: '@id'},
     {update: { method: 'PATCH'}});
}]);

omgneedApp.controller('ListsCtrl', ['$scope', 'User', 'Products', 'List', function($scope, User, Products, List) {

  $scope.users = [];
  $scope.products = [];
  $scope.lists = [];

  $scope.newList = new List();

User.get(function(users) {
      $scope.users = users;
   });

List.query(function(lists) {
      $scope.lists = lists;
   });

Products.query(function(products){
  $scope.products = products;

});

$scope.saveList = function() {
      $scope.newList.$save(function(list) {
        console.log(list);
        $scope.lists.push(list);
        $scope.newList = new List();
      });
    };

    $scope.deleteList = function (list) {
      list.$delete(function() {
        position = $scope.lists.indexOf(list);
        $scope.lists.splice(position, 1);
      }, function(errors) {
        $scope.errors = errors.data;
      });
    };

}]);
