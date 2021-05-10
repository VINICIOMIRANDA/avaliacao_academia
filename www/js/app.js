var app = angular.module('App',['ngRoute','controllers']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){

	$routeProvider.when('/',{templateUrl: 'partials/main.html',controller: 'MainCtrl'}).
	when('/cadastro_novo',{templateUrl: 'partials/cadastro_novo.html',controller: 'CadNovCtrl'}).
    when('/clientes',{templateUrl:'partials/lista_clientes.html',controller:'ListCtrl'}).
    when('/clientes/deletar/:id',{templateUrl:'partials/deletar.html',controller:'DeltCrtl'}).
    when('/clientes/deletar/',{templateUrl:'partials/deletar.html',controller:'DeltCrtl'}).
	when('/calcule_imc/',{templateUrl:'partials/calcule_imc.html',controller:'ImcCrtl'}).
	when('/exercicios/',{templateUrl:'partials/exercicios.html',controller:'ExerCrtl'}).
	when('/exercicios_musculacao/',{templateUrl:'partials/exercicios_musculacao.html',controller:'ExerMCrtl'}).
	when('/exercicios_aerobicos/',{templateUrl:'partials/exercicios_aerobicos.html',controller:'ExerACrtl'}).
    when('/clientes/editar_clientes/:id',{templateUrl:'partials/editar_cadastro.html',controller:'EdtCtrl'}).
    when('/clientes/editar_clientes/',{templateUrl:'partials/editar_cadastro.html',controller:'EdtCtrl'}).
    when('/meu_usuario',{templateUrl:'partials/detalhes.html',controller:'DetalhesCrtl'}).
    when('/login',{templateUrl:'partials/login.html',controller:'LoginCtrl'}); 

	
	$locationProvider.html5Mode(false).hashPrefix('!');

}]);