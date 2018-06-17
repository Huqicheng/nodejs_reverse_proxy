var proxy = require("../");

config = {

	targets: [
		{protocol: "http", host: "localhost:3001"},
		{protocol: "http", host: "localhost:3002"}
	],

	balancer: "least_connection",

	port: 3000,

	ip : "127.0.0.1"
}

var app = proxy.createServer(config);

app.listen(config.port, config.ip);




var express  = require('express');
var app1      = express();
var app2      = express();
var app3      = express();


app1.use("/", function(req, res) {
    res.send("server1: 3001");
});

app1.listen(3001, "127.0.0.1");


app2.use("/", function(req, res) {
    res.send("server2: 3002");
});

app2.listen(3002, "127.0.0.1");