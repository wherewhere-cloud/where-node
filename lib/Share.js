'use strict';

var _ = require('lodash');
var Domain = require('../http/Domain');
var DomainUni = require('../http/DomainUni');

/* jshint ignore:start */
/**
 * Initialize share
 *
 * @constructor WhereApi.Share
 *
 * @function {WhereApi.share.link} link
 * @function {WhereApi.share.info} info
 * @function {WhereApi.share.track_history} track_history
 * @function {WhereApi.share.track_analysis} track_analysis
 * @function {WhereApi.share.report} report
 *
 * @param {WhereApi} where - The where client
 */
/* jshint ignore:end */

function Share(where) {
    this._d = new Domain(where);
    this._du = new DomainUni(where);
}

_.extend(Share.prototype, Domain.prototype, DomainUni.prototype);
Share.prototype.constructor = Share;


Share.prototype.link = function(params) {
	return this._d.post('share/link', params)
}

Share.prototype.info = function(params) {
	return this._du.get('share/info', params)
}

Share.prototype.track_history = function(params) {
	return this._du.get('share/track_history', params)
}

Share.prototype.track_analysis = function(params) {
	return this._du.get('share/track_analysis', params)
}

Share.prototype.report = function(params) {
	return this._du.get('share/report', params)
}

module.exports = Share