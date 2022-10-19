'use strict';

var _ = require('lodash');
var Domain = require('../http/Domain');

/* jshint ignore:start */
/**
 * Initialize accounts domain
 *
 * @constructor WhereApi.Monitor
 *
 * @param {WhereApi} where - The where client
 */
/* jshint ignore:end */

function Monitor(where) {
    Domain.prototype.constructor.call(this, where);
}

_.extend(Monitor.prototype, Domain.prototype);
Monitor.prototype.constructor = Monitor;

Monitor.prototype.list = function(params) {
	return this.post('monitor', params)
}

module.exports = Monitor