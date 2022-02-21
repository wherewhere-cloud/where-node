'use strict';

var _ = require('lodash'); 
var Domain = require('../http/Domain'); 


/* jshint ignore:start */
/**
 * Initialize location 
 *
 * @constructor WhereApi.Location
 *
 * @function {WhereApi.location.list} list 
 * @function {WhereApi.location.status} status 
 * @function {WhereApi.location.update} update 
 * @param {WhereApi} where - The where client
 */
/* jshint ignore:end */

function Location(where) {
	//console.log("WhereApi.Location")
	Domain.prototype.constructor.call(this, where)

	this._list 	= undefined;

}

_.extend(Location.prototype, Domain.prototype);
Location.prototype.constructor = Location;

Location.prototype.list = function(params) {
	return this.get('location', params)
}

Location.prototype.status = function(params) {
	return this.get('location_status', params)
}

Location.prototype.update = function(params) {
	return this.post('/update_location', params)
}

Location.prototype.batch_update = function(params) {
	return this.post('/batch_update_location', params)
}

module.exports = Location