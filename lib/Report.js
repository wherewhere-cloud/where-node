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
 * @function {WhereApi.report.by_date} by_date
 * @param {WhereApi} where - The where client
 */
/* jshint ignore:end */

function Report(where) {
	console.log("WhereApi.Report")
	Domain.prototype.constructor.call(this, where);
}

_.extend(Report.prototype, Domain.prototype);
Report.prototype.constructor = Report;

Report.prototype.by_device = function(params) {
	return this.get('/report_by_device', params)
}

Report.prototype.by_date = function(params) {
	return this.get('/report_by_date', params)
}


module.exports = Report