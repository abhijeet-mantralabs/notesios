/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	login: function(req, res){
		if(!req.body || !req.body.username || !req.body.password){
			res.status(400).json( {status: 400 , message: "some field(s) missing" });
		}else{
			User.login(req.body.username, req.body.password, function(err, resp){
				if(err){
					res.serverError(err);
				}else{
					req.session.authenticated = true;

					req.session.user = resp;
					sails.log.debug("req session user- login>>>>>>",req.session.user);
					res.json({status: 200, data: resp});
				}
			});
		}
	},

	logout: function(req, res){
		if(req.session.user){
			req.session.user = null;
			req.session.authenticated = false;
			res.json({msg: 'logged out successfully', status: true});
		}else{
			res.status(400).json( {status: 400 , message: "please login to logout" });
		}
	},

	signUp: function(req, res){
		if(!req.body || !req.body.username || !req.body.password || !req.body.name){
			res.badRequest('Please provide things');
		}else{
			sails.log.debug("hjhgj>>>>",req.body.username,req.body.password);
			User.signup(req.body.username,req.body.password,req.body.name, function(err, resp){
				if(err){
					res.serverError(err);
				}else{
					res.json({status: 200, data: resp});
				}
			});
		}
	}
};

