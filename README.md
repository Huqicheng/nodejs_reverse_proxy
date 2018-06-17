# nodejs_reverse_proxy

Implementation of a reverse proxy server and some load balancers.

## How to install
```
npm install https://github.com/Huqicheng/nodejs_reverse_proxy.git
```

## How to run the server
'''
var proxy = require("nodejs_reverse_proxy");

config = {
	targets: [
		"http://localhost:3001",
		"http://localhost:3002"
	],

	balancer: "ip_hash",

	port: 3000,

	ip: "127.0.0.1"
}

var app = proxy.createServer(config);

app.listen(config.port, config.ip);
'''
