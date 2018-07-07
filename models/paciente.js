'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var rolesValidos = {
	values: ['ADMIN_ROLE', 'USER_ROLE', 'INITIAL_ROLE', 'MEDICAL_ROLE', 'PESQUISA_ROLE'],
	message: '{VALUE} no es un rol permitido'
};

var UserSchema = new Schema({

	name: { type: String, required: [true,'El nombre es necesario']},
	email: { type: String, required: [true,'El correo es necesario']},
	rut: { type: String, unique: true, required: [true,'El rut es necesario']},
	surname: { type: String, required: false},

});

UserSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Paciente', UserSchema);