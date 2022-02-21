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

// Get devices' location
where.location.list({page_size: 20})
.then(data => {
	data.forEach(device => {
		consol.log("imei: " + device.imei)
		consol.log("latitude: " + device.latitude)
		consol.log("longitude: " + device.longitude)
		consol.log("speed: " + device.speed)
	})
	
})
.catch(err => {
	console.log(err.msg)
})

// more examples please see example.js
```

## All class

```javascript

WhereApi.location
WhereApi.location.list(params = {})
WhereApi.location.status(params = {})
WhereApi.location.update(params = {})

WhereApi.device
WhereApi.device.list(params = {})
WhereApi.device.add(params = {})
WhereApi.device.update(params = {})
WhereApi.device.delete(imei)

WhereApi.report
WhereApi.report.by_device(params = {})
WhereApi.report.by_date(params = {})

WhereApi.track
WhereApi.track.history(params = {})
WhereApi.track.analysis(params = {})

WhereApi.parking
WhereApi.parking.list(params = {})
WhereApi.parking.detail(parking_id)
WhereApi.parking.devices(parking_id)
WhereApi.parking.logs(parking_id)
WhereApi.parking.create(params = {})
WhereApi.parking.delete(params = {})
WhereApi.parking.add_device(params = {})
WhereApi.parking.delete_device(params = {})
WhereApi.parking.update_device(params = {})

```
# Documentation

# Version
0.1.0

