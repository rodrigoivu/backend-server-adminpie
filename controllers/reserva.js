'use strict'

 var Reserva = require('../models/reserva');

//================================================
// CREAR RESERVA
//================================================

function saveReserva(req,res){
	var reserva = new Reserva(req.body);

	if( reserva.paciente !=null && reserva.user !=null &&reserva.fecha !=null && reserva.horaReservado !=null && reserva.poshora !=null){
				//Guardar profesional
				reserva.save((err, reservaStored) => {
					if(err){
						res.status(500).send({
							error: err,
							message: 'Error al guardar reserva'
						});
					}else{
						if(!reservaStored){
							res.status(404).send({message: 'No se ha registrado la reserva'});
						}else{
							res.status(200).send({
								reserva: reservaStored,
							});
						}
					}
				});
	}else{
		res.status(200).send({message: 'Faltan Datos (Paciente, Usuario, Fecha, Hora, poshora)'});
	}
}

//================================================
// MOSTRAR TODAS LAS RESERVAS PAGINADOS
//================================================
function listReservas(req,res){

	var desde = req.query.desde || 0;
	desde= Number(desde);

	Reserva.find({})
	   .populate('paciente', 'name')
	   .populate('user', 'name')
	   .skip(desde)
	   .limit(10)	
	   .exec(
	   		(err, reservas) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando reservas'});
	   			}else{
	   				Reserva.count({}, (err,conteo) =>{
	   					res.status(200).send({
								reservas: reservas,
								total: conteo
						});
	   				});
	   				
	   			}
	   		}
	   	);
}

//================================================
// BUSCAR RESERVAS POR FECHA
//================================================
function listReservasPorFechaUsuario(req,res){
    var userId = req.params.id_user;
	var fechaSeleccionada=req.query.fecha || '0-0-000';
	var regexUserId = new RegExp(userId, 'i');//no finciona esto del regex en este caso
    var regexFecha = new RegExp(fechaSeleccionada, 'i'); //no finciona esto del regex en este caso
    
    
	Reserva.find({})
	   .and([ {'user': userId}, {'fecha': fechaSeleccionada} ])
	   .populate('paciente', 'name')
	   .exec(
	   		(err, reservas) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando reservas'});
	   			}else{
   					res.status(200).send({
						reservas: reservas,
					});
	   				
	   				
	   			}
	   		}
	   	);
}

module.exports = {
	saveReserva,
	listReservas,
	listReservasPorFechaUsuario
	
};