angular.module('StudentController',
    []).controller('StudentController', function ($scope) {
        $scope.message = 'Welcome to Student section!';
    });

var myApp = angular.module('StudentController', []);
myApp.controller('StudentController', function ($scope, $http) {
    $scope.message = 'Welcome to Student section!';

    let apiUrl = "http://localhost:3000/api";

    $http.get(apiUrl + "/students").then(function (response) {
        $scope.students = response.data;
    });
    var refresh = function () {
        $http.get(apiUrl + "/students").then(function (response) {
            $scope.students = response.data;
            $scope.student = {};
            console.log($scope.student);

        });
    };
    refresh()
    $scope.addStudent = function () {
        if (document.getElementById("nameS").value.length < 3) {
            alert("Wrong name!")
        }
        else {
            if (document.getElementById("placeS").value.length < 3)
                alert("Wrong place!")
            else {
                if (document.getElementById("lastnameS").value.length < 3) {
                    alert("Wrong last name!")
                }
                else {
                    if (document.getElementById("b-dayS").value.length < 6) {
                        alert("Wrong date!")
                    }
                    else {
                        if (document.getElementById("groupS").value.length < 3) {
                            alert("Wrong group!")
                        }
                        else {
                            $http.post(apiUrl + "/students/add", $scope.student)
                                .then(function (response) {
                                    console.log(response);
                                    refresh();
                                });
                        }
                    }
                }
            }
        }
    };
    $scope.delete = function (id) {
        $http.delete(apiUrl + "/students/" + id)
            .then(function (response) {
                console.log(response);
                refresh();
            });
    };


    $scope.edit = function (student) {

        document.getElementById("name").value = student.name;
        document.getElementById("place").value = student.place;
        document.getElementById("lastname").value = student.lastname;
        document.getElementById("birthday").value = student.birthday;
        document.getElementById("group").value = student.group;

        console.log(student);
        $http.delete(apiUrl + "/students/" + student._id)
            .then(function (response) {
                console.log(response);
                refresh();
            });
        refresh();

    };

    $scope.save = function () {


        $scope.student.name = document.getElementById("name").value;
        $scope.student.place = document.getElementById("place").value;
        $scope.student.lastname = document.getElementById("lastname").value;
        $scope.student.birthday = document.getElementById("birthday").value;
        $scope.student.group = document.getElementById("group").value;

        if (document.getElementById("name").value.length < 3) {
            alert("Wrong name!")
        }
        else {
            if (document.getElementById("place").value.length < 3)
                alert("Wrong place!")
            else {
                if (document.getElementById("lastname").value.length < 3) {
                    alert("Wrong last name!")
                }
                else {
                    if (document.getElementById("birthday").value.length < 6) {
                        alert("Wrong date!")
                    }
                    else {
                        if (document.getElementById("group").value.length < 3) {
                            alert("Wrong group!")
                        }
                        else {
                            $http.post(apiUrl + "/students/add", $scope.student)
                                .then(function (response) {
                                    console.log(response);
                                    refresh();
                                });
                        }
                    }
                }
            }
        }




        refresh();

    };

});

