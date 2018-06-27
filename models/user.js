'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var rolesValidos = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} no es un rol permitido'
};

var UserSchema = new Schema({

	name: { type: String, required: [true,'El nombre es necesario']},
	surname: { type: String, required: false},
	email: { type: String, unique: true, required: [true,'El correo es necesario']},
	password: { type: String, required: [true,'La contraseña es necesaria']},
	image: { type: String, required: false},
	role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos}

});

UserSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('User', UserSchema);