'use strict';

var _ = require('lodash');
var axios = require('axios');

var Response = require('./Response');
var Request = require('./Request');

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var RequestClient = function () { };


module.exports = RequestClient;