'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var profesionesValidas = {
	values: ['GENERAL','NEUROLOGO', 'FONOAUDIOLOGO', 'KINESILOGO', 'TERAPEUTA', 'PSICOLOGO','AUDIO'],
	message: '{VALUE} no es una profesión permitida'
};

// var Horas = new Schema({
// 	nombre: String,
// 	hora: Boolean
// });

// var Dias = new Schema({
//     dia: String,
// 	horas: [ Horas ]
// });

var HoraSemanal = new Schema({
  horaLu: Boolean,
  horaMa: Boolean,
  horaMi: Boolean,
  horaJu: Boolean,
  horaVi: Boolean,
  horaSa: Boolean,
  horaDo: Boolean,
  nombreLu: String,
  nombreMa: String,
  nombreMi: String,
  nombreJu: String,
  nombreVi: String,
  nombreSa: String,
  nombreDo: String,
  hora: String
});

var ProfesionalSchema = new Schema({

	user: { type: Schema.Types.ObjectId,ref:'User',unique: true ,required: [true,'El usario es necesario']},  
	profesion: { type: String, required: true, default: 'GENERAL', enum: profesionesValidas},
	horaSemana: [ HoraSemanal ]
},{ collection: 'profesionales'}); // esto es para evitar que se grave como porfesionals

ProfesionalSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Profesional', ProfesionalSchema);