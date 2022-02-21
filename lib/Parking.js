'use strict';

var _ = require('lodash'); 
var Domain = require('../http/Domain'); 


/* jshint ignore:start */
/**
 * Initialize parking 
 *
 * @constructor WhereApi.Parking
 *
 * @function {WhereApi.parking.list} list 
 * @function {WhereApi.parking.detail} detail 
 * @function {WhereApi.parking.devices} devices 
 * @function {WhereApi.parking.logs} logs 
 * @function {WhereApi.parking.create} create 
 * @function {WhereApi.parking.delete} delete 
 * @function {WhereApi.parking.add_device} add_device 
 * @function {WhereApi.parking.delete_device} delete_device 
 * @function {WhereApi.parking.update_status} update_status
 * @param {WhereApi} where - The where client
 */
/* jshint ignore:end */

function Parking(where) {
	console.log("WhereApi.Parking")
	
	Domain.prototype.constructor.call(this, where);
}

_.extend(Parking.prototype, Domain.prototype);
Parking.prototype.constructor = Parking;


Parking.prototype.list = function(params) {
	return this.get('parkings', params)
}

Parking.prototype.detail = function(parking_id) {
	return this.get('/parking_detail', {parking_id: parking_id})
}

Parking.prototype.devices = function(parking_id) {
	return this.get('/get_parking_devices', {parking_id: parking_id})
}

Parking.prototype.logs = function(parking_id) {
	return this.get('/parking_logs', {parking_id: parking_id})
}


Parking.prototype.create = function(params) {
	return this.post('/create_circle_parking', params)
}

Parking.prototype.delete = function(parking_id) {
	var params = {parking_id: parking_id}
	return this.post('/delete_parking', params)
}

Parking.prototype.add_device = function(params) {
	return this.post('/add_device_to_parking', params)
}

Parking.prototype.delete_device = function(params) {
	return this.post('/delete_device_from_parking', params)
}

Parking.prototype.update_status = function(parking_id) {
	var params = {parking_id: parking_id}
	return this.post('/check_parking', params)
}

module.exports = Parking