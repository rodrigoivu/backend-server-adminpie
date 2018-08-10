'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var NgbDate = new Schema({
  day: Number,
  month: Number,
  year: Number
});

var PacienteSchema = new Schema({

    rut: { type: String, unique: true,required: [true,'El rut del paciente es necesario'] },
	name: { type: String, required: [true,'El nombre es necesario']},
	fechaNacimiento: { type: NgbDate, required: false },
	establecimiento: { type: String, required: false },
	nivel: { type: String, required: false },
	direccion: { type: String, required: false },
	fijo: { type: String, required: false },
	celular: { type: String, required: false },
	email: { type: String, required: false }
	// observaciones: { type: String, required: false }

});

//UserSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Paciente', PacienteSchema);