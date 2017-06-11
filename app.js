// create the module and name it scotchApp
var trelloApp = angular.module('trelloApp', ['ngRoute']);

// configure our routes
trelloApp.config(function($routeProvider) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'mainController'
		})

		// route for the about page
		.when('/dashboard', {
			templateUrl : 'pages/dashboard.html',
			controller  : 'dashboardController'
		})
});

// create the controller and inject Angular's $scope
trelloApp.controller('mainController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';
});


trelloApp.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

trelloApp.controller('dashboardController', function($scope,$http) {
	/*$http.post('path/to/server/file/to/save/json', $scope.languages).then(function(data) {
      $scope.msg = 'Data saved';
    });*/


    $scope.addComment = function(commentValue,listid,taskid){
    	// console.log($scope.lists);
    	// console.log(typeof(commentValue));
    	if (typeof(commentValue) == "undefined") {
    		return;
    	}
    	for(key in $scope.lists) {
    		// console.log(key);
    		// console.log($scope.lists[key].id);
    		if($scope.lists[key].id == listid) {
				// console.log($scope.lists[key].card);	
    			for(task in $scope.lists[key].card) {
    				if($scope.lists[key].card[task].cardid == taskid){
	    				// console.log($scope.lists[key].card[task].title);	
	    				var commentid = $scope.lists[key].card[task].comment.length;
	    				var commentobj = {
	    					"msgid": commentid,
	    					"message": commentValue
	    				}
	    				$scope.lists[key].card[task].comment.push(commentobj);
	    				$scope.commentvalue = "";
	    				// console.log($scope.lists[key].card[task].title);
	    				// console.log($scope.lists[key].card[task].comment.length + "length");
	    				// console.log($scope.lists);
	    				return;
    				}
    			}
    		}
    	}
    	// console.log(commentValue + ' ' + listid + ' ' + taskid);
    }

	$http.get('data.json').success(function(data) {
	   $scope.lists = data;
	});

	$scope.submitForm = function () {
		$scope.showForm = false;
		// console.log($scope.lists);
	}
});

