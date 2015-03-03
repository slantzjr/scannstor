/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function (req, res) {
		res.view('user/new');
	},

	create: function (req, res, next) {

		var userObj = {
			name: req.param('name'),
			email: req.param('email'),
			password: req.param('password'),
			confirmation: req.param('confirmation')
		}
		
		User.create(userObj, function userCreated(err, user) {

			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}

				return res.redirect('/user/new');
			}

			req.session.authenticated = true;
			req.session.User = user;

			res.redirect('/user/show/'+user.id);
		});
	},

	show: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next(err);
			if (!user) return next();
			res.view({
				user: user
			});
		});
	},

	index: function (req, res, next) {

		User.find(function foundUsers (err, users) {
			if (err) return next(err);

			res.view({
				users: users
			});
		});
	},

	edit: function (req, res, next) {

		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next(err);
			if (!user) return next('User does not exist.');

			res.view({
				user: user
			});
		});
	},

	update: function (req, res, next) {

		if (req.session.User.admin) {
			var userObj = {
				name: req.param('name'),
				email: req.param('email'),
				admin: req.param('admin')
			}
		} else {
			var userObj = {
				name: req.param('name'),
				email: req.param('email')
			}
		}

		User.update(req.param('id'), userObj, function foundUser (err, user) {
			if (err) return res.redirect('/user/edit/' + req.param('id'));

			res.redirect('/user/show/' + req.param('id'));
		});
	},

	destroy: function (req, res, next) {

		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next(err);

			if (!user) return next('User does not exist.');

			User.destroy(req.param('id'), function userDestroyed(err) {
				if (err) return next(err);

				res.redirect('/user/index')
			});
		});
	},
};

