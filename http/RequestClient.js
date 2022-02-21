'use strict';

var _ = require('lodash');
var axios = require('axios');
// // var fs = require('fs');
// var HttpsProxyAgent = require('https-proxy-agent');
// // var Q = require('q');
// // var qs = require('qs');

var Response = require('./Response');
var Request = require('./Request');

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var RequestClient = function () { };


module.exports = RequestClient;