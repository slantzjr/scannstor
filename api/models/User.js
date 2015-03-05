/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
  	name: {
  		type: 'string',
  		required: true
  	},
  	
  	email: {
  		type: 'email',
  		unique: true,
  		required: true
  	},

  	encryptedPassword: {
  		type: 'string',
  		protected: true
  	},

  	admin: {
  		type: 'boolean',
  		defaultsTo: false
  	},

    inventory: {
        collection: 'Item',
        via: 'owner'
    },
  },

  beforeValidation: function(values, next) {
    if (typeof values.admin !== 'undefined') {
      if (values.admin === 'unchecked') {
        values.admin = false;
      } else if (values.admin[1] === 'on') {
        values.admin = true;
      }
    }
    next();
  },

  beforeCreate: function (values, next) {
  	if (!values.password || values.password != values.confirmation) {
  		return next({err: ["Password doesn't match password confirmation"]});
  	}

  	require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
  		if (err) return next(err);

  		values.encryptedPassword = encryptedPassword;
  		// values.online = true;
  		next();
  	});
  }


};

