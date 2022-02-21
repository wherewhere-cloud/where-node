# where-node
WhereWhere.cloud Node.js helper library

[![NPM](https://nodei.co/npm/where-node.png?downloads=true&stars=true)](https://nodei.co/npm/where-node/)

# Get Started
```bash
npm install where-node
```

```javascript
var WhereApi = require('where-node');

var app_id  	= "your_app_id";
var app_secret 	= "your_app_secret";

var where = new WhereApi(app_id, app_secret);

// Get List devices using promises
var promise = where.device.list()
promise.then(devices => {
	devices.forEach(device => {
		console.log('device: ' + device.imei)
	})
});


// add device using promise
promise = where.device.add({imei: '8100202210', 'mark': 'mydevice'})
promise.then(success => {
	console.log("add device successfully")
}).catch(err => {
	console.log(err.msg)
})

```

# Documentation

# Version
0.1.0

