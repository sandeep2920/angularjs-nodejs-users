'use strict';

angular.module('angularjsNodejsUsersApp', ['ngCookies', 'ngResource', 'ngSanitize']).config(function ($routeProvider) {
    
    $routeProvider

    .when('/', {templateUrl: 'views/user.html', controller: 'UserCtrl'})
    
    .otherwise({redirectTo: '/'});

});
