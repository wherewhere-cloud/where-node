'use strict';

var axios = require('axios')

/**
 * WhereApi Client to interact with the Rest API
 *
 * @constructor WhereApi
 *
 * @property {WhereApi.Account} 	account - account domain
 * @property {WhereApi.Device} 		device - device domain
 * @property {WhereApi.Location} 	location - location domain
 * @property {WhereApi.Parking} 	parking - parking domain
 * @property {WhereApi.Track} 		track - track domain
 * @property {WhereApi.Report} 		report - report domain
 * @property {WhereApi.Monitor} 	monitor - monitor domain

  * @returns {WhereApi} A new instance of WhereApi client
  */
 
 
var WhereApi = function(app_id, app_secret, opts) {
	  opts = opts || {};
	  var env = opts.env || process.env;
 
	  this.baseUrl      = "https://api.wherewhere.cloud/v1"
	  
	  this.app_id 		= app_id || env.WHERE_APP_ID;
	  this.app_secret 	= app_secret || env.WHERE_APP_SECRET;
	
	// Domains
	  this._httpClient 	= undefined;
	  this._account 	= undefined;
	  this._device 		= undefined;
	  this._location 	= undefined;
	  this._parking 	= undefined;
	  this._report 		= undefined;
	  this._track 		= undefined;
	  this._monitor 	= undefined;
	  this._token 		= undefined;
	  
}

Object.defineProperty(WhereApi.prototype,
  'httpClient', {
    get: function() {
      if (!this._httpClient) {
        var RequestClient = require('./http/RequestClient'); 
        this._httpClient = new RequestClient();
      }
      return this._httpClient;
    }
});


Object.defineProperty(WhereApi.prototype,
  'token', {
    get: function() {
      return this._token;
    },
	set:function(data){
	    this._token = data;
	}
});

Object.defineProperty(WhereApi.prototype,
  'account', {
    get: function() {
      if (!this._account) {
        var Account = require('./lib/Account');  
        this._account = new Account(this);
      }
      return this._account;
    }
});

Object.defineProperty(WhereApi.prototype,
  'device', {
    get: function() {
      if (!this._device) {
        var Device = require('./lib/Device');  
        this._device = new Device(this);
      }
      return this._device;
    }
});

Object.defineProperty(WhereApi.prototype,
  'location', {
    get: function() {
      if (!this._location) {
        var Location = require('./lib/Location');  
        this._location = new Location(this);
      }
      return this._location;
    }
});

Object.defineProperty(WhereApi.prototype,
  'parking', {
    get: function() {
      if (!this._parking) {
        var Parking = require('./lib/Parking');  
        this._parking = new Parking(this);
      }
      return this._parking;
    }
});

Object.defineProperty(WhereApi.prototype,
  'track', {
    get: function() {
      if (!this._track) {
        var Track = require('./lib/Track');  
        this._track = new Track(this);
      }
      return this._track;
    }
});

Object.defineProperty(WhereApi.prototype,
  'report', {
    get: function() {
      if (!this._report) {
        var Report = require('./lib/Report');  
        this._report = new Report(this);
      }
      return this._report;
    }
});

Object.defineProperty(WhereApi.prototype,
  'Monitor', {
    get: function() {
      if (!this._monitor) {
        var Monitor = require('./lib/Monitor');  
        this._monitor = new Monitor(this);
      }
      return this._monitor;
    }
});

module.exports = WhereApi;