var app = angular.module('myTodo', ['ui.router']);

app.factory('toDoService', ['$http', function($http) {
	var o = {toDos: []};
	
	o.getAll = function() {
		return $http.get('/todos').success(function(data) {
			angular.copy(data, o.toDos);
		});
	};

	o.create = function(todo) {
		return $http.post('/todos', todo).success(function(data) {
			o.toDos.push(data);
		});
	};

	o.delete = function(todo) {
		$http.delete('/todos/' + todo._id).success(function(data) {
			o.toDos.pop(todo);
		});
	};

	return o;
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('home', {
		url: '/home',
		templateUrl: 'partials/home.html',
		controller: 'toDoController',
		resolve: {
			postPromise: ['toDoService', function(toDoService) {
				return toDoService.getAll();
			}]
		}
	});

	$urlRouterProvider.otherwise('home');
}]);

app.controller('toDoController', ['$scope', 'toDoService', function($scope, toDoService) {
	$scope.toDos = toDoService.toDos;

	$scope.addToDo = function() {
		if($scope.message === '') {return;}
		toDoService.create({
			message: $scope.message,
			complete: false
		});

		$scope.message = "";
	};

	$scope.completeToDo = function(todo) {
		toDoService.delete(todo);
	};
}]);