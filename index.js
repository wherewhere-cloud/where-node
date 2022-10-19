"use strict";

var axios = require("axios");

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

var WhereApi = function (app_id, app_secret, opts) {
  opts = opts || {};
  var env = opts.env || process.env;

  this.baseUrl = "https://api.wherewhere.cloud/v1";

  this.app_id = app_id || env.WHERE_APP_ID;
  this.app_secret = app_secret || env.WHERE_APP_SECRET;

  // Domains
  this._httpClient = undefined;
  this._token = undefined;
  this._libs = [];
};

Object.defineProperty(WhereApi.prototype, "httpClient", {
  get: function () {
    if (!this._httpClient) {
      var RequestClient = require("./http/RequestClient");
      this._httpClient = new RequestClient();
    }
    return this._httpClient;
  },
});

Object.defineProperty(WhereApi.prototype, "token", {
  get: function () {
    return this._token;
  },
  set: function (data) {
    this._token = data;
  },
});

const libs = [
  "account",
  "device",
  "location",
  "monitor",
  "parking",
  "report",
  "share",
  "track",
];
libs.forEach((e) => {
  // console.log('Property define', e)
  Object.defineProperty(WhereApi.prototype, e, {
    get: function () {
      if (!this._libs[e]) {
        var libClass = require("./lib/" + e[0].toUpperCase() + e.slice(1));
        this._libs[e] = new libClass(this);
      }
      return this._libs[e];
    },
  });

});

module.exports = WhereApi;
