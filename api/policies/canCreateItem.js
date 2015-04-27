module.exports = function(req, res, ok) {
	if (!req.session.authenticated) {
		var requireLoginError = [{name: 'requireLogin', message: 'You must be signed in.'}];
  		req.session.flash = {
  			err: requireLoginError
  		}
  		res.redirect('/session/new');
  		return;
  	}

	var sessionUserMatchesOwner = req.session.User.id == req.param('owner');
	var isAdmin = req.session.User.admin;

	if (!(sessionUserMatchesOwner || isAdmin)) {
		var noRightsError = [{name: 'noRights', message: 'You cannot add items to other users'}]
		req.session.flash = {
			err: noRightsError
		}

		res.redirect('/item/new/?owner='+req.session.User.id);
		return;
	}

	ok();
};