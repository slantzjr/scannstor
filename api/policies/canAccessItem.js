module.exports = function(req, res, ok) {
	if (!req.session.authenticated) {
		var requireLoginError = [{name: 'requireLogin', message: 'You must be signed in.'}];
  		req.session.flash = {
  			err: requireLoginError
  		}
  		res.redirect('/session/new');
  		return;
  	}

  	Item.findOne(req.param('id'), function foundItem (err, item) {
  		if (err) {
  			console.log('big ol error');
  			return;
  		}
  		if (!item) return('item does not exist');

  		var sessionUserMatchesOwner = req.session.User.id === item.owner;
		var isAdmin = req.session.User.admin;

		if (!(sessionUserMatchesOwner || isAdmin)) {
			var noRightsError = [{name: 'noRights', message: 'This item does not belong to you'}]
			req.session.flash = {
				err: noRightsError
			}
			res.redirect('/session/new');
			return;
		} else {
			ok();
		}
	});
};