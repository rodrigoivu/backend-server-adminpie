'use strict'


// var jwt = require ('jwt-simple');
 var jwt = require ('jsonwebtoken');
 var moment = require('moment');
 var secret = 'clave_secreta_adminpie';


// exports.ensureAuth = function(req, res, next){
// 	if(!req.headers.authorization){
// 		return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'})
// 	}

// 	var token = req.headers.authorization.replace(/['"]+/g,'');

// 	try{
// 		var payload = jwt.decode(token, secret);

// 		if(payload.exp <= moment().unix()){

// 			return res.status(401).send({messsage:'El token ha expirado'});
// 		}

// 	}catch(ex){
// 		//console.log(ex);
// 		return res.status(404).send({messsage:'Token no válido'});
// 	}

// 	req.user = payload;

// 	next();

// };

 exports.ensureAuth = function(req, res, next){
// 	if(!req.headers.authorization){
// 		return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'})
// 	}

 	var token = req.query.token;
 	jwt.verify( token, secret, (err, decoded) => {
 			if(err){
 				return res.status(404).send({messsage:'Token no válido'});
 			}
 			if(decoded.exp <= moment().unix()){
				return res.status(401).send({messsage:'El token ha expirado'});
		    }
            
 			req.user = decoded;

 	        next();
 	});

// 	try{
// 		var payload = jwt.decode(token, secret);

// 		if(payload.exp <= moment().unix()){

// 			return res.status(401).send({messsage:'El token ha expirado'});
// 		}

// 	}catch(ex){
// 		//console.log(ex);
// 		return res.status(404).send({messsage:'Token no válido'});
// 	}

 	// req.user = payload;

 	// next();

 };