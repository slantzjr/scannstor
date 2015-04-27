module.exports = function(req, res, ok) {
	if (!req.session.authenticated) {
		var requireLoginError = [{name: 'requireLogin', message: 'You must be signed in.'}];
  		req.session.flash = {
  			err: requireLoginError
  		}
  		res.redirect('/session/new');
  		return;
  	}

	var sessionUserMatchesId = req.session.User.id == req.param('id');
	var isAdmin = req.session.User.admin;

	if (!(sessionUserMatchesId || isAdmin)) {
		var noRightsError = [{name: 'noRights', message: 'You cannot access this page.'}]
		req.session.flash = {
			err: noRightsError
		}
		res.redirect('/session/new');
		return;
	}

	ok();
};