var myApp = angular.module('myApp',[]);

myApp.controller('GreetingController', ['$scope','$http', function($scope,$http) {

    var refresh=function(){
        $http.get('/persons').then(function(response){
            $scope.persons = response.data;
        });
    };

$http.get('/persons').then(function(response){
    console.log('mam dane ktore ja request/żadam');
    console.log(response);
    $scope.persons = response.data;
});

    $scope.addContact = function(){
       $http.post('/persons',$scope.person).then(function(response){
           console.log(response);
           refresh();
       })
    };

    $scope.remove = function(id){
        console.log(id);
        $http.delete('/persons/'+id );
        refresh();
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get('/persons/' + id).then(function(response) {
            $scope.person = response.data;
        });
    };

    $scope.update = function(id) {
        //console.log($scope.person.id);
        $http.put('/persons/' + id, $scope.person).then(function(response) {
            refresh();
        })
    };

}]);
