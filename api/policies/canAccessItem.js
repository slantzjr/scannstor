module.exports = function(req, res, ok) {
	if (!req.session.authenticated) {
		var requireLoginError = [{name: 'requireLogin', message: 'You must be signed in.'}];
  		req.session.flash = {
  			err: requireLoginError
  		}
  		return res.redirect('/session/new');
  	}

  	Item.findOne(req.param('id')).exec(function foundItem (err, item) {
  		if (err) {
  			// Need to respond here or it'll hang forever
  			return res.negotiate(err);
  		}
  		if (!item) {
  			// Need to respond here or it'll hang forever
  			return res.notFound(new Error('item does not exist'));
  		}

  		var sessionUserMatchesOwner = req.session.User.id === item.owner;
		var isAdmin = req.session.User.admin;

		if (!(sessionUserMatchesOwner || isAdmin)) {
			var noRightsError = [{name: 'noRights', message: 'This item does not belong to you'}]
			req.session.flash = {
				err: noRightsError
			}
			return res.redirect('/session/new');
		}
		
		// Continue onward
		ok();
	});
};
