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
 * @function {WhereApi.device.add} add 
 * @function {WhereApi.device.add} delete 
 * @function {WhereApi.device.add} update 
 * @param {WhereApi} where - The where client
 */
/* jshint ignore:end */

function Device(where) {
	console.log("WhereApi.Device")
	
	this._list = undefined
	Domain.prototype.constructor.call(this, where);
}

_.extend(Device.prototype, Domain.prototype);
Device.prototype.constructor = Device;

Device.prototype.list = function(params) {
	return this.get('devices', params)
}

Device.prototype.add = function(params) {
	return this.post('create_device', params)
}

Device.prototype.delete = function(imei) {
	var params = {imei: imei}
	return this.post('/delete_device', params)
}

Device.prototype.update = function(params) {
	return this.post('/update_device', params)
}


module.exports = Device