'use strict'

var express = require('express');
var PacienteController = require ('../controllers/paciente');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './uploads/users'});

//FALTA PONER LAS AUTORIZACIONES !!!!!	

 api.post('/crear-paciente', PacienteController.savePaciente);
 // api.put('/update-paciente/:id', PacienteController.updateProfesional);
 api.get('/pacientes', PacienteController.listPacientes);
 // api.delete('/remove-paciente/:id', PacienteController.deleteProfesional);

 
module.exports = api;