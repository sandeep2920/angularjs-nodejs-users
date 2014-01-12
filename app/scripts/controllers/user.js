'use strict';

angular.module('angularjsNodejsUsersApp').controller('UserCtrl', ['$scope', 'UserService', function ($scope, UserService) {

    $scope.page = 1;
    $scope.limit = 5;
    $scope.total = 0;
    $scope.pageNumbers = [];
    
    $scope.decorateNumberPage = function(page, decoration, weight) {
        $('#bt'+page).css("text-decoration", decoration);
        $('#bt'+page).css("font-weight", weight);
    };

    $scope.paginate = function(page) {
        $scope.page = page;
        UserService.paginate({
            page : $scope.page,
            limit : $scope.limit
        }, function(data) {
            $scope.users = data.users;
            $scope.total = data.total;
            $scope.pageNumbers = [];
            for (var i=0;i<$scope.total;i++) {
                $scope.pageNumbers.push(i+1);
            }
        });
        angular.forEach($scope.pageNumbers, function(page, key) {
            $scope.decorateNumberPage(page, "none", "normal");
        });
        $scope.decorateNumberPage(page, "underline", "bold");
    };
    
    $scope.listUsers = function() {
        $scope.paginate($scope.page);
    };
    
    $scope.previous = function() {
        if ($scope.page > 1) $scope.page--;
        $scope.paginate($scope.page);
    };

    $scope.next = function() {
        if ($scope.page < $scope.total) $scope.page++;
        $scope.paginate($scope.page);
    };

    $scope.reset = function() {
        $scope.successMessage = null;
        $scope.errorMessage = null;
        $scope.nameErrorMessage = null;
        $scope.usernameErrorMessage = null;
        $scope.passwordErrorMessage = null;
        $scope.listUsers();
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
        UserService.save({
            _id: $scope.user._id,
            name: $scope.user.name,
            username: $scope.user.username,
            password: $scope.user.password
        }, function(data) {
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
        UserService.remove({id: $scope.user._id}, function(res) {
            $scope.reset();
            $scope.successMessage = 'User removed';
        });
    };

    $scope.newUser();
    
}]);