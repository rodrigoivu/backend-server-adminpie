'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var profesionesValidas = {
	values: ['GENERAL','NEUROLOGO', 'FONOAUDIOLOGO', 'KINESILOGO', 'TERAPEUTA', 'PSICOLOGO','AUDIO'],
	message: '{VALUE} no es una profesión permitida'
};

var Horas = new Schema({
	nombre: String,
	hora: Boolean
});

var Dias = new Schema({
    dia: String,
	horas: [ Horas ]
});

var ProfesionalSchema = new Schema({

	user: { type: Schema.Types.ObjectId,ref:'User',unique: true ,required: [true,'El usario es necesario']},
	profesion: { type: String, required: true, default: 'GENERAL', enum: profesionesValidas},
	dias: [ Dias ]
},{ collection: 'profesionales'});

ProfesionalSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Profesional', ProfesionalSchema);