/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    owner: {
        type: 'string',
    },
    ownerName: {
        type: 'string',
    },
    name: {
    	type: 'string',
    	required: true
    },
    description: {
    	type: 'string',
    	required: true
    },
    sku: {
    	type: 'string',
    },
    location: {
        type: 'string',
    },
  },

};