/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function(req, res) {
		res.view('item/new');
	},

	create: function (req, res, next) {

		var itemObj = {
			name: req.param('name'),
			description: req.param('description'),
			sku: req.param('sku'),
			location: req.param('location'),
			owner: req.session.User,
		}
		
		Item.create(itemObj, function itemCreated(err, item) {

			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}
				
				return res.redirect('/item/show'+item.id);
			}

			res.redirect('/item/show/'+item.id);
		});
	},	

	index: function (req, res, next) {
		User.find(req.session.User.id).populate('inventory').exec(function(err,items){
			if (err) return res.negotiate(err);

			res.view({
				items: items[0].toJSON().inventory
			});
		});
	},

	show: function (req, res, next) {
		Item.find(req.param('id')).populate('owner').exec(function foundItem (err, item) {
			if (err) return next(err);
			if (!item) return next();

			res.view({
				item: item[0].toJSON()
			});
		});
	},

	destroy: function (req, res, next) {

		Item.findOne(req.param('id'), function foundItem (err, item) {
			if (err) return next(err);

			if (!item) return next('Item does not exist.');

			Item.destroy(req.param('id'), function itemDestroyed(err) {
				if (err) return next(err);

				res.redirect('/item/index')
			});
		});
	},

	edit: function (req, res, next) {

		Item.findOne(req.param('id'), function foundItem (err, item) {
			if (err) return next(err);
			if (!item) return next('item does not exist.');

			res.view({
				item: item
			});
		});
	},

	update: function (req, res, next) {

		var itemObj = {
			name: req.param('name'),
			description: req.param('description'),
			location: req.param('location'),
		}

		Item.update(req.param('id'), itemObj, function foundItem (err, item) {
			if (err) return res.redirect('/item/edit/' + req.param('id'));

			res.redirect('/item/show/' + req.param('id'));
		});
	},
};

