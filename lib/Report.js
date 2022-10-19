'use strict';

var _ = require('lodash');
var Domain = require('../http/Domain');

/* jshint ignore:start */
/**
 * Initialize report
 *
 * @constructor WhereApi.Report
 *
 * @function {WhereApi.report.by_device} by_device
 * @param {WhereApi} where - The where client
 */
/* jshint ignore:end */

function Report(where) {
	Domain.prototype.constructor.call(this, where);
}

_.extend(Report.prototype, Domain.prototype);
Report.prototype.constructor = Report;

Report.prototype.by_device = function(params) {
	return this.get('report/by_device', params)
}

module.exports = Report