var app=angular.module('bondacom', []); // inicializo angular
app.controller('main', function($scope, $http) {
  $scope.ta=true;
  $scope.mm=true;

  setInterval(function(){  // actualizo el resultado cada 8 segundos
    if ($scope.ta) {
      current();
    }
    if ($scope.mm) {
      history();
    }
  }, 8000);
  function current() {  // petiticion de Temp Actual
    $http.get('/current')
  		 	.then(function(data) { // cuando tenga respuesta del servidor
            $scope.current = data.data;
            $scope.ocultar="ocultar2";
  		 	}, function(data) { // si hay error
  		 		console.log('Error: ' + data);
  	});
  };
  function history() { // peticion de Max y Min 
    $http.get('/history')    // realizo la peticion
        .then(function(data) {
            $scope.history = data.data;
            $scope.ocultar2="ocultar2";
        }, function(data) {
          console.log('Error: ' + data);
    });
  };

});
