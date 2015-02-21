angular.module('todoService', [])

	// supper simple service
	// each function returns a promis object
	.factory('Todos', function($http){
		return {
			get: function () {
				return $http.get('/api/todos');
			},
			create: function (todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete: function (id) {
				return $http.delete('/api/todos/' + id);
			}
		};
	});