'use strict'

 // var fs = require('fs');
 // var path = require('path');
 // var bcrypt = require('bcryptjs');
 var Profesional = require('../models/profesional');
 // var jwt = require('../services/jwt');
 // var menu = require('../controllers/menu')

//================================================
// CREAR UN PROFESIONAL
//================================================

function saveProfesional(req,res){
	var profesional = new Profesional();
	//var userId = req.params.id; // éste parámetro se pone en el url despues de /
	var params = req.body;
	
	profesional.user = params.user;
	if (params.profesion !=null){
	profesional.profesion = params.profesion;
	}
	var Dias =[];
	profesional.dias = Dias;	

	if( profesional.user !=null ){
				//Guardar profesional
				profesional.save((err, profesionalStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar profesional'
						});
					}else{
						if(!profesionalStored){
							res.status(404).send({message: 'No se ha registrado el profesional'});
						}else{
							res.status(200).send({
								profesional: profesionalStored,
							});
						}
					}
				});
	}else{
		res.status(200).send({message: 'User no indicado'});
	}
}

//================================================
// ACTUALIZAR UN PROFESIONAL
//================================================

function updateProfesional(req,res){
	
	var userId = req.params.id; // éste parámetro se pone en el url despues de /
	var params = req.body;      // éstos parámetros vienen del raw json(application/json)
  
	Profesional.findOneAndUpdate({user: userId}, params, { new: true }, (err, profesionalUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
		if(err){
			res.status(500).send({message: 'Error al actualizar el profesional',
								error: err	});
		}else{
			if(!profesionalUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el profesional'});
			}else{
				res.status(200).send({profesional: profesionalUpdated });
			}
		}
	});
}

//================================================
// MOSTRAR TODOS LOS PROFESIONALES PAGINADOS
//================================================
function listProfesionales(req,res){

	var desde = req.query.desde || 0;
	desde= Number(desde);

	Profesional.find({})
	   .populate('user', 'name email image role')
	   .skip(desde)
	   .limit(10)	
	   .exec(
	   		(err, profesionales) => {

	   			var pro=[];
	   			profesionales.forEach((item,index) =>{
	   				if(item.user.role == 'PROFESIONAL_ROLE'){
	   					pro.push(item);
	   				}
	   			});
	   				
	   			if (err){
	   				res.status(500).send({message: 'Error cargando profesionales'});
	   			}else{
	   				Profesional.count({}, (err,conteo) =>{
	   					res.status(200).send({
								profesionales: pro,
								total: pro.length
						});
	   				});
	   				
	   			}
	   		}
	   	);
}


module.exports = {
	saveProfesional,
	updateProfesional,
	listProfesionales
};