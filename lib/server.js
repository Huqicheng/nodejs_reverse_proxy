var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');



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
	} else if ("least_connection") {
		var constructor = require("./balancer").LeastConnectionBalancer;
		var balancer = new constructor(config.targets); 
	}
	else {
		throw new Error("Balancer unsupported: " + config.balancer);
	}

	// some configuration options: changeOrigin, ignorePath
	var apiProxy = httpProxy.createProxyServer({
		changeOrigin : true,
		ignorePath : true
	});

	apiProxy.on("proxyRes", function(proxyRes, req, res){
		let host = proxyRes.req.getHeader("host");
		let path = proxyRes.req.path;
		console.log("proxyRes from target host " + host + " according to requested path " + path);
		
		balancer.onProxyRes(proxyRes);
	});

	apiProxy.on("proxyReq", function(proxyReq, req, res){
		console.log("Request path:" + proxyReq.path);
	});

	app.use("/", function(req, res) {
    	var targetServer = balancer.nextServer(req);
    	console.log("Redirected to server: " + targetServer);
   	 	apiProxy.web(req, res, {target: targetServer});
	});

	return app;


};