'use strict';

var _ = require('lodash');
var Domain = require('../http/Domain');

/**
 * Initialize accounts domain
 *
 * @constructor WhereApi.Account
 *
 * @function {WhereApi.account.token} token
 * @function {WhereApi.account.list} list
 * @function {WhereApi.account.create} create
 * @function {WhereApi.account.delete} delete
 * @function {WhereApi.account.update} update
 * @param {WhereApi} where - The where client
 */
function Account(where) {
	console.log("WhereApi.Account")
	Domain.prototype.constructor.call(this, where);
}

_.extend(Account.prototype, Domain.prototype);
Account.prototype.constructor = Account;

Account.prototype.signup = function(params) {
	return this.upost('signup', params)
}
Account.prototype.token = function(params) {
	return this.upost('access_token', params)
}

Account.prototype.list = function(params) {
	return this.get('accounts', params)
}
Account.prototype.create = function(params) {
	return this.post('account/create', params)
}
Account.prototype.delete = function(account_id) {
	var params = {account_id: account_id}
	return this.post('account/delete', params)
}
Account.prototype.update = function(params) {
	return this.post('account/update', params)
}

module.exports = Account