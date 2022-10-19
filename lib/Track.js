'use strict';

var _ = require('lodash');
var Domain = require('../http/Domain');

/* jshint ignore:start */
/**
 * Initialize track
 *
 * @constructor WhereApi.Track
 *
 * @function {WhereApi.track.history} history
 * @function {WhereApi.track.analysis} analysis
 *
 * @param {WhereApi} where - The where client
 */
/* jshint ignore:end */

function Track(where) {
    Domain.prototype.constructor.call(this, where);
}

_.extend(Track.prototype, Domain.prototype);
Track.prototype.constructor = Track;


Track.prototype.history = function(params) {
	return this.get('track/history', params)
}

Track.prototype.analysis = function(params) {
	return this.get('track/analysis', params)
}

module.exports = Track