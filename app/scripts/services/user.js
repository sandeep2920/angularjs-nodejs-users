'use strict';

angular.module('angularjsNodejsUsersApp').factory('UserService', ['$resource', function($resource) {
    return $resource('api/users/:id', {
        id: '@id'
    }, {
        list: {method: 'GET', isArray: true},
        update: {method: 'PUT'},
        create: {method: 'POST'},
        remove: {method: 'DELETE'}
    });
}]);