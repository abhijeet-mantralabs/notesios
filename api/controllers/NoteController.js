/**
 * NoteController
 *
 * @description :: Server-side logic for managing Notes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res){
		console.log(req.session);
		if(!req.body || !req.body.title || !req.body.description){
			res.status(400).json( {status: 400 , message: "some Fields missing" });
		}else{
			if(!req.session.user){
			   res.status(401).json({status: 401 , message: "user not logged in " });
			}else{
				var data = {
					title: req.body.title,
					description: req.body.description,
					username: req.session.user.username,
					userId: req.session.user.id,
					date : new Date()
				}
				Note.createNote(data, function(err, resp){
					if(err){
						res.serverError(err);
					}else{
						res.json({status: 200, data: resp});
					}
				});
			}
			
		}
	},

	edit: function(req, res){
		if(!req.body && !req.body.title && !req.body.description && !req.body.noteId){
			res.status(400).json( {status: 400 , message: "some fields missing " });
		}else{
			var data = {
				noteId: req.body.noteId,
				noteTitle: req.body.title,
				noteDescription: req.body.description
			}
			Note.editNote(data, function(err, resp){
				if(err){
					res.serverError(err);
				}else{
					res.json({ status: 200, data: resp});
				}
			});
		}
	},

	delete: function(req, res){
		if(!req.body && !req.body.noteId){
			res.badRequest('provide what is necessary');
		}else{
			Note.deleteNote(req.body.noteId, function(err, resp){
				if(err){
					res.serverError(err);
				}else{
					res.json({data:resp});
				}
			});
		}
	},

	get: function(req, res){
		if(!req.session.user){
			// res.status(401).json( {status: 401 , message: "please login  first" });
		}else{
			Note.fetch(req.session.user.id, function(err, resp){
				if(err){
					res.serverError(err);
				}else{
					res.json({ status: 200, data: resp});
				}
			});
		}
	}
};

