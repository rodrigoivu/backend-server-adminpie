'use strict'

var express = require('express');
var UserController = require ('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users'});

// var fs = require('fs');
// var path = require('path');
// const multer = require('multer');

// const DIR = './uploads/users';

//  let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

//     }
// });
// let upload = multer({storage: storage});

 api.post('/login', UserController.loginUser);
 api.post('/register', UserController.saveUser);
 api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);
 api.put('/upload-image-user/:id',[md_auth.ensureAuth, md_upload],UserController.uploadImage);
 //api.put('/upload-image-user/:id',[md_auth.ensureAuth, upload.single('image')],UserController.uploadImage);
 api.get('/get-image-user/:imageFile',UserController.getImageFile);
 api.delete('/remove-user/:id',md_auth.ensureAuth, UserController.deleteUser);

module.exports = api;