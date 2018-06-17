var _ = require("underscore");
var hash_func = require("./utils/hash_func.js");

class Balancer {
  constructor(serverList) {
    this.serverList = serverList;
  }

  // Getter
  get getServerList() {
    return this.serverList;
  }
  // Method
  nextServer(req) {
    return null;
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



module.exports = {
	RabinRoundBalancer : RabinRoundBalancer,
  RandomBalancer : RandomBalancer,
  IPHashBalancer : IPHashBalancer
};