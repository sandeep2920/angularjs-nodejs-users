'use strict';

angular.module('angularjsNodejsUsersApp').factory('UserService', ['$resource', function($resource) {
    return $resource('api/users/:id:page/:limit', {
        id: '@id',
        page: '@page',
        limit: '@limit'
    }, {
        list: {method: 'GET', isArray: true},
        paginate: {method: 'GET'},
        save: {method: 'POST'},
        remove: {method: 'DELETE'}
    });
}]);