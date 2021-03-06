'use strict'

 var jwt = require ('jsonwebtoken');
 var moment = require('moment');
 var secret = 'clave_secreta_adminpie';

//================================================
// Verificar token
//================================================

 exports.ensureAuth = function(req, res, next){

 	var token = req.query.token;  //viene del query ?token= en la url
 	jwt.verify( token, secret, (err, decoded) => {
 			if(err){
 				return res.status(401).send({messsage:'Token no válido'});
 			}
 			if(decoded.exp <= moment().unix()){
				return res.status(401).send({messsage:'El token ha expirado'});
		    }
            
 			req.user = decoded;

 	        next();
 	});

 }

//================================================
// Verificar ADMIN
//================================================

 exports.ensureAdmin = function(req, res, next){

 	var usuario = req.user;

 	if ( usuario.role === 'ADMIN_ROLE'){
 		next();
 		return;
 	} else {
  		return res.status(404).send({messsage:'Token no válido - No es administrador'});
 	}
 }

//================================================
// Verificar ADMIN o MSIMO USUARIO
//================================================

 exports.ensureAdminIgualUsuario = function(req, res, next){

 	var usuario = req.user; // viene del decode del token
 	var id = req.params.id; // viene del parametro :id, que se pone en la url.

 	if ( usuario.role === 'ADMIN_ROLE' || req.user.sub === id ){
 		next();
 		return;
 	} else {
  		return res.status(404).send({messsage:'Token no válido - No es administrador - No es el mismo usuario' });
 	}
 }

//================================================
// Verificar ADMIN o USUARIO USER
//================================================

 exports.ensureAdminUser = function(req, res, next){

 	var usuario = req.user; // viene del decode del token
 	
 	if ( usuario.role === 'ADMIN_ROLE' || usuario.role === 'USER_ROLE' ){
 		next();
 		return;
 	} else {
  		return res.status(404).send({messsage:'Token no válido - No es administrador - No está autorizado' });
 	}
 }

//================================================
// Verificar ADMIN o USUARIO MEDICAL
//================================================

 exports.ensureAdminMedical = function(req, res, next){

 	var usuario = req.user; // viene del decode del token
 	
 	if ( usuario.role === 'ADMIN_ROLE' || usuario.role === 'MEDICAL_ROLE' ){
 		next();
 		return;
 	} else {
  		return res.status(404).send({messsage:'Token no válido - No es administrador - No está autorizado' });
 	}
 }
 //================================================
// Verificar ADMIN o USUARIO MEDICAL o USUARIO USER
//================================================

 exports.ensureAdminMedicalUser = function(req, res, next){

 	var usuario = req.user; // viene del decode del token
 	
 	if ( usuario.role === 'ADMIN_ROLE' || usuario.role === 'MEDICAL_ROLE' || usuario.role === 'USER_ROLE' ){
 		next();
 		return;
 	} else {
  		return res.status(404).send({messsage:'Token no válido - No es administrador - No está autorizado' });
 	}
 }

//================================================
// Verificar ADMIN o USUARIO PESQUISA
//================================================

 exports.ensureAdminPesquisa = function(req, res, next){

 	var usuario = req.user; // viene del decode del token
 	
 	if ( usuario.role === 'ADMIN_ROLE' || usuario.role === 'PESQUISA_ROLE' ){
 		next();
 		return;
 	} else {
  		return res.status(404).send({messsage:'Token no válido - No es administrador - No está autorizado' });
 	}
 }