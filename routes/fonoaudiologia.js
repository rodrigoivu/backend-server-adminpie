'use strict'

var express = require('express');
var FonoaudiologiaController = require ('../controllers/fonoaudiologia');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//FALTA PONER LAS AUTORIZACIONES !!!!!	

 api.post('/crear-fonoaudiologia', FonoaudiologiaController.saveFonoaudiologia);
 api.put('/update-fonoaudiologia/:id/:fecha', FonoaudiologiaController.updateFonoaudiologia);
 api.get('/fonoaudiologia-paciente/:id', FonoaudiologiaController.pacienteFonoaudiologia);
 
 
module.exports = api;