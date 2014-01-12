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

    $scope.removeUser = function(user) {
        $scope.user = user;
    };

    $scope.saveUser = function() {
        $scope.reset();
        $scope.user.$save(function(data) {
            console.log(data);
            $scope.newUser();
            $scope.successMessage = 'User saved';
            $('#formModal').modal('hide');
        }, function(err) {
            angular.forEach(err.data.errors, function(value, key) {
                $scope[value.path + 'ErrorMessage'] = value.message;
            });
        });
    };

    $scope.doRemove = function() {
        $scope.user.$remove({id: $scope.user._id}, function(res) {
            $scope.reset();
            $scope.successMessage = 'User removed';
        });
    };

    $scope.newUser();
    
}]);