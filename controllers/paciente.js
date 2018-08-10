'use strict'

 var Paciente = require('../models/paciente');

//================================================
// CREAR UN PACIENTE
//================================================

function savePaciente(req,res){
	var paciente = new Paciente(req.body);

	if( paciente.name !=null ){
				//Guardar profesional
				paciente.save((err, pacienteStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar paciente'
						});
					}else{
						if(!pacienteStored){
							res.status(404).send({message: 'No se ha registrado el paciente'});
						}else{
							res.status(200).send({
								paciente: pacienteStored,
							});
						}
					}
				});
	}else{
		res.status(400).send({message: 'Indicar Nombre de Paciente'});
	}
}

//================================================
// MOSTRAR TODOS LOS PACIENTES
//================================================
function listPacientes(req,res){

	var desde = req.query.desde || 0;
	desde= Number(desde);

	Paciente.find({})
	   .skip(desde)
	   .limit(10)	
	   .exec(
	   		(err, pacientes) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando pacientes'});
	   			}else{
	   				Paciente.count({}, (err,conteo) =>{
	   					res.status(200).send({
								pacientes: pacientes,
								total: conteo
						});
	   				});
	   				
	   			}
	   		}
	   	);
}

module.exports = {
	savePaciente,
	listPacientes
	
};