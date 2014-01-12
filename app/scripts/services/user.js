'use strict';

angular.module('angularjsNodejsUsersApp').factory('UserService', ['$resource', function($resource) {
    return $resource('api/users/:id', {
        id: '@id'
    }, {
        list: {method: 'GET', isArray: true},
        save: {method: 'POST'},
        remove: {method: 'DELETE'}
    });
}]);