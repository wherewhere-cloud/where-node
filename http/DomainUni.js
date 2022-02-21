'use strict';
var _ = require('lodash');
var Q = require('q');  
var axios = require('axios')
// const FormData = require('form-data');

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * Base domain object
 *
 * @constructor
 *
 * @param {Where} where - A Where Client
 * @param {string} baseUrl - Base url for this domain
 */
function Domain(where, baseUrl) {
  this.where 	= where
  this.baseUrl 	= baseUrl || where.baseUrl;
}

/**
 * Turn a uri into an absolute url
 *
 * @param  {string} uri uri to transform
 * @return {string} absolute url
 */
Domain.prototype.absoluteUrl = function(uri) {
  return _.trim(this.baseUrl, '/') + '/' + _.trim(uri, '/');
};

/**
 * Make request to this domain
 *
 * @param {object} opts request options
 * @return {Promise} request promise
 */
Domain.prototype.request = function(opts) {
  return this.where.request(_.assign({}, opts, {
    uri: this.absoluteUrl(opts.uri),
  }));
};

Domain.prototype.get = function(url, params = {}) {
	var deferred = Q.defer();
	
	var token = this.token()
	token.then(data => {
		this._token = data

		//this._token = '2513429dc052590cb53454e7ad9aec39'
		var promise = new Promise((resolve, reject) => {
			params['access_token'] = this._token
			
			uni.request({
				url: this.absoluteUrl(url),
				dataType: 'json',
				data: params,
				success: (res) => {
					let result = res.data
					if (result.code == 0) 
						resolve(result.data)
					else 
						reject(result)
				},
				fail: (err) => {
					reject({"msg": JSON.stringify(err)})
				}
			})
			
			// axios({
			//   method: 'get',
			//   url: this.absoluteUrl(url),
			//   params: params
			// })
			// .then(res => {
			// 	console.log("axiox get success")
			// 	let result = res.data
			// 	if (result.code == 0) 
			// 		resolve(result.data)
			// 	else 
			// 		reject(result)
			// })
			// .catch(err => {
			// 	reject({"msg": JSON.stringify(err)})
			// })
			
		});
		
		//return promise;
		
		promise.then(data => {
			deferred.resolve(data)
		})
		promise.catch(err => {
			deferred.reject(err);
		})
	})
	
	token.catch(function(error) {
	  deferred.reject(error);
	});
		
	
	return deferred.promise;
	
};


Domain.prototype.post = function(url, params = {}) {
	var deferred = Q.defer();
	
	var token = this.token()
	token.then(data => {
		this._token = data
		
		var promise = new Promise((resolve, reject) => {
			params['access_token'] = this._token
			
			uni.request({
				url: this.absoluteUrl(url),
				header: { 'content-type': 'application/x-www-form-urlencoded'},
				method: "POST",
				dataType: 'json',
				data: params,
				success: (res) => {
					let result = res.data
					if (result.code == 0) 
						resolve(result.data)
					else 
						reject(result)
				},
				fail: (err) => {
					reject({"msg": JSON.stringify(err)})
				}
			})
		});
		
		promise.then(data => {
			deferred.resolve(data)
		})
		promise.catch(err => {
			deferred.reject(err);
		})
	})
	
	token.catch(function(error) {
	  deferred.reject(error);
	});
		
	
	return deferred.promise;
}

Domain.prototype.token = function() {
  return new Promise((resolve, reject) => {
	  
	  // uni.getStorageSync('token')
	  if (this.where.token) {
		  //console.log("============ 已有token ===============")
		  resolve(this.where.token)
	  } else {
		  var params = {app_id: this.where.app_id,
		  			  app_secret: this.where.app_secret}
					  
		  uni.request({
		  	url: this.absoluteUrl('access_token'),
		  	header: { 'content-type': 'application/x-www-form-urlencoded'},
		  	method: "POST",
		  	dataType: 'json',
		  	data: params,
		  	success: (res) => {
		  		let result = res.data
		  		if (result.code == 0) {
		  			//this._token = result.data.access_token
		  			var token = result.data.access_token
					
					// token 缓存
					this.where.token = token
		  			resolve(token)
		  		}
		  		else 
		  			reject(result)
		  	},
		  	fail: (err) => {
		  		reject({"msg": JSON.stringify(err)})
		  	}
		  })
	  }

	//}

  });
}

module.exports = Domain;