'use strict'

var express = require ('express');
var bodyParser = require ('body-parser');

var app = express();

// cargar rutas

var user_routes = require('./routes/user');
var busqueda_routes = require('./routes/busqueda');
var profesional_routes = require('./routes/profesional');
var paciente_routes = require('./routes/paciente');
var reserva_routes = require('./routes/reserva');
var bloqueo_routes = require('./routes/bloqueo');
var anamnesis_routes = require('./routes/anamnesis');

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended:false}));
// create application/json parser
app.use(bodyParser.json());

// CORS configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin','*'); //permite el acceso a todos los dominios, a las apis
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Whith, Content-Type, Accept,Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');

	next();
});

//rutas base
app.use('/api', user_routes);
app.use('/api', busqueda_routes);
app.use('/api', profesional_routes);
app.use('/api', paciente_routes);
app.use('/api', reserva_routes);
app.use('/api', bloqueo_routes);
app.use('/api', anamnesis_routes);

module.exports = app;