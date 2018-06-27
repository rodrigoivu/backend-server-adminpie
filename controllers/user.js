'use strict'

 var fs = require('fs');
 var path = require('path');
 var bcrypt = require('bcryptjs');
 var User = require('../models/user');
 var jwt = require('../services/jwt');

function loginUser(req,res){
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email.toLowerCase()}, (err,user) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe'});
			}else{
				//Comprobar la contraseña
				if( bcrypt.compareSync( password,user.password) ){
					//devolver los datos del usuario logueado
					if(params.gethash){
						// devolver un token de jwt
						res.status(200).send({
						token: jwt.createToken(user)
					});
					}else{
						res.status(200).send({user});
					}

				}else{
						res.status(404).send({message: 'El usuario no ha podido loguearse'});
				}
			}
		}
	});
}

function saveUser(req,res){
	var user = new User();

	var params = req.body;


	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role ='USER_ROLE';
	user.image = 'null';

	if(params.password){
		// Encriptar contraseña 
		user.password = bcrypt.hashSync(params.password,10);
		
		if(user.name !=null && user.name !=null && user.email != null){
				//Guardar el usuario
				user.save((err, userStored) => {
					if(err){
						res.status(500).send({message: 'Error al guardar el usuario'});
					}else{
						if(!userStored){
							res.status(404).send({message: 'No se ha registrado el usuario'});
						}else{
							res.status(200).send({
								user: userStored,
								tokenUser: req.user
							});
						}
					}
				});
			}else{
				res.status(200).send({message: 'Rellena todos los campos'});
			}
	}else{
		res.status(200).send({message: 'Introduce la contraseña'});
	}

}

function updateUser(req,res){
	var userId = req.params.id; // éste parámetro se pone en el url despues de /
	var update = req.body;      // éstos parámetros vienen del x-www-form-urlencoded

	 if(userId != req.user.sub){
		return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
	}

	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});
		}else{
			if(!userUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({user: userUpdated});
			}
		}
	});
}

function uploadImage(req,res){
	var userId =req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_ext = path.extname(file_path);
		var file_name = path.basename(file_path);
		
		
		if(file_ext == '.png' || file_ext == '.jpg' || file_ext == '.gif'){

			User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
 	
				if(!userUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			    }else{
					res.status(200).send({image: file_name, user: userUpdated});
			    }

			});

		}else{
			res.status(200).send({message: 'Extención del archivo no válida'});
		}
		
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/users/'+imageFile;

	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

function deleteUser(req,res){
	var userId = req.params.id; // éste parámetro se pone en el url despues de /
	User.findByIdAndRemove(userId, (err, userRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al borrar usuario'});
		}else{
			if(!userRemoved){
				res.status(404).send({message: 'No existe usuario con ese id'});
			}else{
				res.status(200).send({user: userRemoved});
			}
		}
	});
}

module.exports = {
	loginUser,
	saveUser,
	updateUser,
	uploadImage,
	getImageFile,
	deleteUser
};

// }