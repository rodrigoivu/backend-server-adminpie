'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var estadosValidos = {
	values: ['VACIO','POR_ATENDER', 'EN_ESPERA', 'EN_ATENCION', 'SE_ATENDIO', 'HORA_CANCELADA','NO_LLEGO','ATRASADO'],
	message: '{VALUE} no es un estado permitido'
};

var PosHora = new Schema ({ 
    pos: Number
});

var ReservaSchema = new Schema({

	paciente: { type: Schema.Types.ObjectId,ref:'Paciente',required: [true,'El paciente es necesario']}, 
	user: { type: Schema.Types.ObjectId,ref:'User',required: [true,'El usuario es necesario']}, //este es el usuario relacionado con el profesional
	fecha: { type: String, required: [true,'La fecha es necesaria']},
	horaReservado: { type: Number, required: [true,'La hora es necesaria']},
	poshora:[ PosHora ],
	fecharegistro: { type: String, required: false},
	estado: { type: String, required: false, default: 'VACIO', enum: estadosValidos},
	confirmada: { type: String, required: false}

});

module.exports = mongoose.model('Reserva', ReservaSchema);