var _ = require("underscore");
var hash_func = require("./utils/hash_func.js");

class Balancer {
  constructor(serverList) {
    this.serverList = [];
    for(let i=0;i<serverList.length;i++){
      let protocol = serverList[i].protocol;
      let host = serverList[i].host;
      this.serverList.push(protocol+"://"+host);
    }
  }

  // Getter
  get getServerList() {
    return this.serverList;
  }
  // Method
  nextServer(req) {
    return null;
  }

  onProxyReq(req) {
    return;
  }

  onProxyRes(res) {
    return;
  }
  
};

class RabinRoundBalancer extends Balancer {
  nextServer(req) {
  	var targetServer = this.serverList.shift();
  	this.serverList.push(targetServer);
  	return targetServer;
  }
};

class RandomBalancer extends Balancer {
  nextServer(req) {
    var targetServer = _.sample(this.serverList);
    return targetServer;
  }
};


class IPHashBalancer extends Balancer {
  nextServer(req) {
    var ip_addr = req.ip;
    return this.serverList[hash_func(ip_addr, this.serverList.length)];

  }
};

class LeastConnectionBalancer extends Balancer {

  constructor(serverList) {
    super(serverList);
    this.serverMap = {};
    for(let i=0;i<serverList.length;i++){
      this.serverMap[serverList[i].host] = 0;
    }
  }

  nextServer(req) {
    var ip_addr = req.ip;
    let min = 0;
    let min_entry = 0;
    let map = this.serverMap;
    for(var key in map){
      if(map[key] <= min) {
        min = map[key];
        min_entry = key;
      }
    }
    let host = min_entry;
    this.serverMap[host] = this.serverMap[host] + 1;
    return "http"+"://"+host;

  }

  onProxyRes(res) {
    let host = res.req.getHeader("host");
    this.serverMap[host] = this.serverMap[host] - 1;
  }
}



module.exports = {
	RabinRoundBalancer : RabinRoundBalancer,
  RandomBalancer : RandomBalancer,
  IPHashBalancer : IPHashBalancer,
  LeastConnectionBalancer : LeastConnectionBalancer
};