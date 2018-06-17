var express  = require('express');
var app      = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

var rabin_balancer = require("./balancer").RabinRoundBalancer;
var random_balancer = require("./balancer").RandomBalancer;
var iphash_balancer = require("./balancer").IPHashBalancer;
var serverOne = 'http://localhost:3001',
    ServerTwo = 'http://localhost:3002',
    ServerThree = 'http://localhost:3003';

var serverList = [serverOne, ServerTwo, ServerThree]

var robin = new iphash_balancer(serverList)



 
app.use("/", function(req, res) {
    var targetServer = robin.nextServer(req);
    
    apiProxy.web(req, res, {target: targetServer});
});



app.listen(3000, "127.0.0.1");

module.exports = app;