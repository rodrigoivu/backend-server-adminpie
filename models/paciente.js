'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;



var PacienteSchema = new Schema({

	name: { type: String, required: [true,'El nombre es necesario']},
	email: { type: String, required: false },
	rut: { type: String, required: false },
	direccion: { type: String, required: false },
	fijo: { type: String, required: false },
	celular: { type: String, required: false },
	padre: { type: String, required: false },
	madre: { type: String, required: false },
	nacimiento: { type: String, required: false },
	comuna: { type: String, required: false },
	observaciones: { type: String, required: false }

});

//UserSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Paciente', PacienteSchema);