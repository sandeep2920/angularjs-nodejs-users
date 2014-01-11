'use strict';

angular.module('angularjsNodejsUsersApp').controller('UserCtrl', ['$scope', 'UserService', function ($scope, UserService) {

    $scope.listAllUsers = function() {
        UserService.list(function(data) {
            $scope.users = data;
        });
    };

    $scope.reset = function() {
        $scope.successMessage = null;
        $scope.errorMessage = null;
        $scope.nameErrorMessage = null;
        $scope.usernameErrorMessage = null;
        $scope.passwordErrorMessage = null;
        $scope.listAllUsers();
    };
    
    $scope.editUser = function(user) {
        $scope.reset();
        $scope.user = user;
    };

    $scope.newUser = function() {
        $scope.user = new UserService();
        $scope.reset();
    };

    $scope.saveUser = function() {
        $scope.reset();
        $scope.user.$create(function(data) {
            console.log(data);
            $scope.listAllUsers();
            $scope.successMessage = 'Information saved';
        }, function(err) {
            angular.forEach(err.data.errors, function(value, key) {
                $scope[value.path + 'ErrorMessage'] = value.message;
            });
        });
    };

    $scope.removeUser = function(user) {
        $scope.user.$remove({id: user._id}, function(res) {
            $scope.reset();
            $scope.successMessage = 'Information removed';
        });
    };

    $scope.newUser();
    
}]);