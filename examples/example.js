'use strict';

var WhereApi = require('../');

var app_id  	= process.env.app_id;
var app_secret 	= process.env.app_secret;


var where = new WhereApi(app_id, app_secret);

// 设备 where.device
 
// 获取设备列表
// List devices using promises
var promise = where.device.list()
promise.then(devices => {
	devices.forEach(device => {
		console.log('device: ' + device.imei)
	})
});

// 添加设备
// add device using promise
promise = where.device.add({imei: '123456', 'mark': 'mycar'})
promise.then(success => {
	console.log("add device successfully")
}).catch(err => {
	console.log(err.msg)
})


// 定位 where.location

// 获得设备定位
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
	
})


// 车库

// 轨迹

// 统计

// 监控






