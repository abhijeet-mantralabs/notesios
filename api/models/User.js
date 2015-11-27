/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		username:{
			type: 'string'
		},
		password:{
			type: 'string'
		},
		name:{
			type: 'string'
		}
	},

	login: function(usn, pwd, callback){
		User.findOne({username: usn, password: pwd}).exec(function(err, resp){
			if(err){
				callback(err, null);
			}else if(resp){
				callback(null ,resp);
			}else{
				callback({status: 401 , message: "user does not exist " }, null);
			}
		});
	},

	signup: function(uUsername, uPassword, uName, callback){
		User.create({username:uUsername, password: uPassword, name:uName}).exec(function(err, resp){
			if(err){
				callback(err, null);
			}else{
				callback(null, resp);
			}
		});
	}
};

