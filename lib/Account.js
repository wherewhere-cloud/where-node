'use strict';

var _ = require('lodash'); 
var Domain = require('../http/Domain'); 

/* jshint ignore:start */
/**
 * Initialize accounts domain
 *
 * @constructor WhereApi.Account
 *
 * @function {WhereApi.account.signup} signup 
 * @function {WhereApi.account.list} list 
 * @function {WhereApi.account.add} add 
 * @function {WhereApi.account.add} delete 
 * @function {WhereApi.account.add} update 
 * @param {WhereApi} where - The where client
 */
/* jshint ignore:end */


function Account(where) {
	console.log("WhereApi.Account")
	
	Domain.prototype.constructor.call(this, where);
}

_.extend(Account.prototype, Domain.prototype);
Account.prototype.constructor = Account;

/* jshint ignore:start */
/**
 * signup
 *
 * @function signup
 * @memberof WhereApi.Account
 *
 * @param {function} [param] - username、password
 *
 * @returns {Promise} 
 */
/* jshint ignore:end */
Account.prototype.signup = function(params) {
	return this.post('/signup', params)
}

/* jshint ignore:start */
/**
 * list account
 *
 * @function list
 * @memberof WhereApi.Account
 *
 * @param {function} [param] - account_id、include_child
 *
 * @returns {Promise} 
 */
/* jshint ignore:end */
Account.prototype.list = function(params) {
	return this.get('/child_accounts', params)
}

/* jshint ignore:start */
/**
 * add account
 *
 * @function add
 * @memberof WhereApi.Account
 *
 * @param {function} [param] - username、account_name、password、parent_id
 *
 * @returns {Promise} 
 */
/* jshint ignore:end */
Account.prototype.add = function(params) {
	return this.post('/add_child_account', params)
}

/* jshint ignore:start */
/**
 * delete account
 *
 * @function delete
 * @memberof WhereApi.Account
 *
 * @param {function} [account_id]
 *
 * @returns {Promise} 
 */
/* jshint ignore:end */

Account.prototype.delete = function(account_id) {
	var params = {account_id: account_id}
	return this.post('/delete_child_account', params)
}

/* jshint ignore:start */
/**
 * update account
 *
 * @function update
 * @memberof WhereApi.Account
 *
 * @param {function} [param] - account_id、account_name、password、status
 *
 * @returns {Promise} 
 */
/* jshint ignore:end */
Account.prototype.update = function(params) {
	return this.post('/update_child_account', params)
}

module.exports = Account