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
	Domain.prototype.constructor.call(this, where)
}

_.extend(Location.prototype, Domain.prototype);
Location.prototype.constructor = Location;

Location.prototype.list = function(params) {
	return this.get('location', params)
}

Location.prototype.status = function(params) {
	return this.get('location/status', params)
}

Location.prototype.update = function(params) {
	return this.post('location/update', params)
}

Location.prototype.batch_update = function(params) {
	return this.post('location/batch_update', params)
}

module.exports = Location