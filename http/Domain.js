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
function Domain(where, baseUrl = '') {
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

  var token = this.token();
  token.then((data) => {
    this._token = data;

    var promise = new Promise((resolve, reject) => {
      params["access_token"] = this._token;

      axios({
        method: "get",
        url: this.absoluteUrl(url),
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
  });

  token.catch(function (error) {
    deferred.reject(error);
  });

  return deferred.promise;
};

Domain.prototype.post = function (url, params = {}) {
  var deferred = Q.defer();
  var full_url = this.absoluteUrl(url);

  var token = this.token();
  token.then((data) => {
    this._token = data;

    var promise = new Promise((resolve, reject) => {
      params["access_token"] = this._token;

      let _params = new FormData();
      for (var key in params) _params.append(key, params[key]);

      axios
        .post(full_url, _params)
        .then((res) => {
          let result = res.data;
          if (result.code == 0) {
            resolve(result.data);
          } else reject(result);
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
  });

  token.catch(function (error) {
    deferred.reject(error);
  });

  return deferred.promise;
};

Domain.prototype.token = function () {
  return new Promise((resolve, reject) => {
    if (this.where.token) {
      resolve(this.where.token);
    } else {
      let url = this.absoluteUrl("access_token");
      let params = new FormData();
      params.append("app_id", this.where.app_id);
      params.append("app_secret", this.where.app_secret);

      axios
        .post(url, params)
        .then((res) => {
          let result = res.data;
          if (result.code == 0) {
            var token = result.data.access_token;
            // token 缓存
            this.where.token = token;
            resolve(token);
          } else reject(result);
        })
        .catch((err) => {
          reject({ msg: JSON.stringify(err) });
        });
    }
  });
};

module.exports = Domain;
