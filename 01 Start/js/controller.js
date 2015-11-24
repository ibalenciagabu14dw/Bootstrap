var app = angular.module("miApp",[]);

app.controller("MiCont",["$scope","$http",function($scope,$http){
	$scope.nombres = [
		{nombre:"lunes"},
		{nombre:"martes"},
		{nombre:"miercoles"},
		{nombre:"jueves"},

	];
	$scope.nombre="";
	$scope.mostrarAlert=false;
	$scope.mostrarAlert2=false;
	$scope.actualizarNombre = function(){

		if($scope.nombre==""){
			$scope.mostrarAlert=true;
		}//if
		else{

			$scope.mostrarAlert=false;

			$scope.saludo = "Hola " + $scope.nombre;
			$scope.nombres.push({nombre:$scope.nombre});

			$http({
	    	method: 'JSONP',
	    	url: 'http://api.flickr.com/services/feeds/photos_public.gne',
	    	params: {
	    		'format': 'json',
	      		'jsoncallback': 'JSON_CALLBACK',
			tagmode:"any",
			tags: $scope.nombre
	    	}//params
	  		})//http
	  		.success(function(photos) {

	    		console.log(photos);
	    		$scope.fotos=photos.items;
	    		$scope.mostrarAlert2=false;
	    		if(photos.items.length == 0){
	  				$scope.mostrarAlert2=true;
	  			}//if
	  			else{
	  				$scope.mostrarAlert2=true;
	  			}//else
			})//success
			.error(function(){
				$scope.mostrarAlert2=false;
			});
		}//else
	}//actualizarNombre
	

}]);//app.controller