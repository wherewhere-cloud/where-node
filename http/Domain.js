"use strict";
var _ = require("lodash");
var Q = require("q");
var axios = require("axios");

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * Base domain object
 *
 * @constructor
 *
 * @param {Where} where - A Where Client
 * @param {string} baseUrl - Base url for this domain
 */
function Domain(where, baseUrl = "") {
  this.where = where;
  this.baseUrl = baseUrl || where.baseUrl;
}

/**
 * Turn a uri into an absolute url
 *
 * @param  {string} uri uri to transform
 * @return {string} absolute url
 */
Domain.prototype.absoluteUrl = function (uri) {
  return _.trim(this.baseUrl, "/") + "/" + _.trim(uri, "/");
};

/**
 * Make request to this domain
 *
 * @param {object} opts request options
 * @return {Promise} request promise
 */
Domain.prototype.request = function (opts) {
  return this.where.request(
    _.assign({}, opts, {
      uri: this.absoluteUrl(opts.uri),
    })
  );
};

Domain.prototype.get = function (url, params = {}) {
  var deferred = Q.defer();

  var promise = new Promise((resolve, reject) => {
    let access_token = this.where.token || null;
    if (!access_token) {
      reject({
        code: 401,
        msg: "token is required",
      });
    }

    let _params = new FormData();
    params["access_token"] = access_token;
    for (let key in params) {
      _params.append(key, params[key]);
    }

    axios({
      url: this.absoluteUrl(url),
      method: "get",
      params: params,
    })
      .then((res) => {
        let result = res.data;
        if (result.code == 0) resolve(result.data);
        else reject(result);
      })
      .catch((err) => {
        reject({ msg: JSON.stringify(err) });
      });
  });

  promise.then((data) => {
    deferred.resolve(data);
  });
  promise.catch((err) => {
    deferred.reject(err);
  });

  return deferred.promise;
};

Domain.prototype.post = function (url, params = {}) {
  var deferred = Q.defer();
  var promise = new Promise((resolve, reject) => {
    let access_token = this.where.token || null;
    if (!access_token) {
      reject({
        code: 401,
        msg: "token is required",
      });
    }

    let _params = new FormData();
    params["access_token"] = access_token;
    for (let key in params) {
      _params.append(key, params[key]);
    }

    axios
      .post(this.absoluteUrl(url), _params)
      .then((res) => {
        let result = res.data;
        if (result.code == 0) {
          resolve(result.data);
        } else {
          reject(result);
        }
      })
      .catch((err) => {
        reject({ msg: JSON.stringify(err) });
      });
  });

  promise.then((data) => {
    deferred.resolve(data);
  });
  promise.catch((err) => {
    deferred.reject(err);
  });

  return deferred.promise;
};

Domain.prototype.uget = function (url, params = {}) {
  var deferred = Q.defer();

  var promise = new Promise((resolve, reject) => {
    let _params = new FormData();
    for (let key in params) {
      _params.append(key, params[key]);
    }
    axios({
      url: this.absoluteUrl(url),
      method: "get",
      params: params,
    })
      .then((res) => {
        let result = res.data;
        if (result.code == 0) resolve(result.data);
        else reject(result);
      })
      .catch((err) => {
        reject({ msg: JSON.stringify(err) });
      });
  });

  promise.then((data) => {
    deferred.resolve(data);
  });
  promise.catch((err) => {
    deferred.reject(err);
  });

  return deferred.promise;
};

Domain.prototype.upost = function (url, params = {}) {
  var deferred = Q.defer();
  var promise = new Promise((resolve, reject) => {
    let _params = new FormData();
    for (let key in params) {
      _params.append(key, params[key]);
    }
    axios
      .post(this.absoluteUrl(url), _params)
      .then((res) => {
        let result = res.data;
        if (result.code == 0) {
          resolve(result.data);
        } else {
          reject(result);
        }
      })
      .catch((err) => {
        reject({ msg: JSON.stringify(err) });
      });
  });

  promise.then((data) => {
    deferred.resolve(data);
  });
  promise.catch((err) => {
    deferred.reject(err);
  });

  return deferred.promise;
};

module.exports = Domain;
