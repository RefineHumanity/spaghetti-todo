var app = angular.module('myTodo', ['ui.router', 'LocalStorageModule']);

app.factory('toDoService', ['$http', 'localStorageService', function($http, localStorageService) {
	var o = {toDos: [], completedToDos: []};
	
	o.getAll = function() {
		return $http.get('/todos').success(function(data) {
			angular.copy(data, o.toDos);
			var complete = localStorageService.get('completedToDos');
			angular.copy(complete, o.completedToDos);
		});
	};

	o.create = function(todo) {
		return $http.post('/todos', todo).success(function(data) {
			o.toDos.push(data);
		});
	};

	o.delete = function(todo) {
		$http.delete('/todos/' + todo._id).success(function(data) {
			o.getAll();
		});
	};

	o.addCompleted = function(todo) {
		var x = o.getCompleted();
		x.push(todo);
		localStorageService.set('completedToDos', x);
		console.log(localStorageService.get('completedToDos'));
		o.completedToDos = x;
		console.log(o.completedToDos);
	};

	o.getCompleted = function() {
		var complete = localStorageService.get('completedToDos');
		var a = [];
		if(complete === null) {
			console.log("Entered if statement");
			localStorageService.set('completedToDos', a);
			return localStorageService.get('completedToDos');
		}

		return localStorageService.get('completedToDos');
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
			todoPromise: ['toDoService', function(toDoService) {
				return toDoService.getAll();
			}]
		}
	});

	$urlRouterProvider.otherwise('home');
}]);

app.controller('toDoController', ['$scope', 'toDoService', function($scope, toDoService) {
	$scope.toDos = toDoService.toDos;
	$scope.completedToDos = toDoService.completedToDos;

	$scope.addToDo = function() {
		if($scope.message === '') {return;}
		toDoService.create({
			message: $scope.message,
			complete: false
		});

		$scope.message = "";
	};

	$scope.completeToDo = function(todo) {

		toDoService.addCompleted(todo);
		toDoService.delete(todo);
	};
}]);