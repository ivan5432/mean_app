angular.module('appRoutes', []).config(['$routeProvider',
    '$locationProvider', function ($routeProvider,
        $locationProvider) {
        $routeProvider
            // home page
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            // students page that will use the StudentController
            .when('/students', {
                templateUrl: 'views/student.html',
                controller: 'StudentController'
            })

            .when('/groups', {
                templateUrl: 'views/groups.html',
                controller: 'GroupController'
            });
        $locationProvider.html5Mode(true);
    }]);