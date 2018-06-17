var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();


exports.createServer = function(config){
	if ("round_rabin" == config.balancer) {
		var constructor = require("./balancer").RabinRoundBalancer;
		var balancer = new constructor(config.targets);
	} else if ("random" == config.balancer) {
		var constructor = require("./balancer").RandomBalancer;
		var balancer = new constructor(config.targets); 
	} else if ("ip_hash" == config.balancer) {
		var constructor = require("./balancer").IPHashBalancer;
		var balancer = new constructor(config.targets); 
	} else {
		throw new Error("Balancer unsupported: " + config.balancer);
	}

	app.use("/", function(req, res) {
    	var targetServer = balancer.nextServer(req);
    	console.log("Redirected to server: " + targetServer);
   	 	apiProxy.web(req, res, {target: targetServer});
	});

	return app;


};