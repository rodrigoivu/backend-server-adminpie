'use strict'
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var NgbDate = new Schema({
  day: Number,
  month: Number,
  year: Number
});

var antecedentesFamiliares = new Schema({
	nombreMadre : String,
 	edadMadre : Number,
  	escolaridadMadre : String,
  	ocupacionMadre : String,
  	horarioTrabajoMadre : String,
  	nombrePadre : String,
  	edadPadre : Number,
  	escolaridadPadre : String,
  	ocupacionPadre : String,
  	horarioTrabajoPadre : String,
  	descripcionFamiliar : String
});
var antecedentesSalud = new Schema({
	tiempoGestion : String,
	tipoParto : String,
	motivoCesarea : String,
	pesoNacer : String,
	tallaNacer : String,
	apgar : String,
	enfermedadesPrePostNatal : String,
	cuales : String,
	observaciones : String
});

var historialClinico = new Schema({
	enfermedadesFamiliares : String,
	neurologoPsiquiatra : Number,
	fonoaudiologo : Number,
	educadorPsicopedagogo : Number,
	terapeutaOcupacional : Number,
	kinesiologo : Number,
	psicologo : Number,
	biomedicina : Number,
	tutora : Number,
	otros : Number,
	otrosString : String,
	intervencionQuirurgicaHospitalizaciones : String,
	cualesIntervencion : String,
	tratamientosRecibidos : String,
	medicamentos : String,
	cualesMedicamentos : String,
	medicamentosEfectos : String,
	diagnosticos : String
});

var desarrolloEvolutivo = new Schema({
	edadSientaSolo : String,
	edadCamino : String,
	desempenoAVD : String,
	estabilidadCaminar : Number,
	caidasFrecuentes : Number,
	dominanciaLateral : Number,
	garra : Number,
	pinza : Number,
	pinzaComo : Number,
	dibuja : Number,
	escribe : Number,
	corta : Number
});

var destrezasSocialesComunicativas = new Schema({
	imtaDespedirAplaudir : Number,
	diceDiezPalabras : Number,
	formulaPreguntas : Number,
	hablaFrases : Number,
	esperaTurno : Number,
	ofreceAyuda : Number,
	seComporta : Number,
	reccionCorrrecta : Number
  
});
var comportamientoLudico = new Schema({
	conQueJuega : String,
	conQuienJuega : String,
	dondeJuega : String,
	actividadesInteres : String,
	personalidad : String
  
});
var situacionSocial = new Schema({
	personasFamilia : Number,
	jefeFemenino : String,
	beneficiarioProgramaSocial : String,
	porcentajeRegistroSocial : Number,
	ingresoMensual : Number,
	ingresoPerCapita : Number
  
});


var AnamnesisSchema = new Schema({

	paciente: { type: Schema.Types.ObjectId,ref:'Paciente',unique: true ,required: [true,'El paciente es necesario']},
	user: { type: Schema.Types.ObjectId,ref:'User',unique: false ,required: [true,'El profesional es necesario']},
	fecha: { type: NgbDate, required: [true,'La fecha es necesaria']},
	antecedentesFamiliares: antecedentesFamiliares,
	antecedentesSalud: antecedentesSalud,
	historialClinico: historialClinico,
	desarrolloEvolutivo: desarrolloEvolutivo,
	destrezasSocialesComunicativas: destrezasSocialesComunicativas,
	comportamientoLudico: comportamientoLudico,
	situacionSocial: situacionSocial
	
},{ collection: 'anamnesis'}); // esto es para evitar que se grave como Anamneses

//UserSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único'}) //afecta a los campos con unique: true. PATH toma el valor del campo correspondiente

module.exports = mongoose.model('Anamnesis', AnamnesisSchema);