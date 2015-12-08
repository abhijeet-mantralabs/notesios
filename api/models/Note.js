/**
* Note.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		title:{
			type: 'string'
		},
		description:{
			type: 'string'
		},
		username:{
			type: 'string'
		},
		userId:{
			type: 'string'
		},
		date:{
			type: 'string'
		}
	},

	createNote: function(data, callback){
		Note.create(data).exec(function(err, resp){
			if(err){
				callback(err, null);
			}else{
				callback(null, resp);
			}
		});
	},

	editNote: function(data, callback){
		Note.update({id: data.noteId},{title: data.noteTitle, description: data.noteDescription}).exec(function(err, resp){
			if(err){
				callback(err, null);
			}else{
				callback(null, resp);
			}
		});
	},

	deleteNote: function(noteId, callback){
		Note.destroy({id: noteId}).exec(function(err){
			if(err){
				callback(err, null);
			}else{
				callback(null, {status: true});
			}
		});
	},

	fetch: function(userId, callback){
		Note.find({userId: userId}).exec(function(err, resp){
			if(err){
				callback(err, null);
			}else{
				callback(null, resp);
			}
		});
	}
};

