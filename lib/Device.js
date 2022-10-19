'use strict';

var _ = require('lodash');
var Domain = require('../http/Domain');

/* jshint ignore:start */
/**
 * Initialize device
 *
 * @constructor WhereApi.Device
 *
 * @function {WhereApi.device.list} list
 * @function {WhereApi.device.create} create
 * @function {WhereApi.device.delete} delete
 * @function {WhereApi.device.update} update
 * @param {WhereApi} where - The where client
 */
/* jshint ignore:end */

function Device(where) {
	Domain.prototype.constructor.call(this, where);
}

_.extend(Device.prototype, Domain.prototype);
Device.prototype.constructor = Device;

Device.prototype.list = function(params) {
	return this.get('devices', params)
}

Device.prototype.create = function(params) {
	return this.post('device/create', params)
}

Device.prototype.delete = function(imei) {
	var params = {imei: imei}
	return this.post('device/delete', params)
}

Device.prototype.update = function(params) {
	return this.post('device/update', params)
}


module.exports = Device