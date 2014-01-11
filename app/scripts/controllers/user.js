'use strict';

angular.module('angularjsNodejsUsersApp').controller('UserCtrl', ['$scope', 'UserService', function ($scope, UserService) {

    $scope.listAllUsers = function() {
        UserService.list(function(data) {
            $scope.users = data;
        });
    };

    $scope.reset = function() {
        $scope.user = new UserService();
        $scope.listAllUsers();
    };
    
    $scope.reset();

    $scope.editUser = function(user) {
        $scope.user = user;
    };

    $scope.newUser = function() {
        $scope.reset();
    };

    $scope.saveUser = function() {
        $scope.user.$create(function() {
            $scope.listAllUsers();
        });
    };

    $scope.removeUser = function(user) {
        $scope.user.$remove({id: user._id}, function(res) {
            $scope.reset();
        });
    };

}]);