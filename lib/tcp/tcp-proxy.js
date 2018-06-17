var util = require('util'),
    net = require('net'),
    tls = require('tls'),
    EventEmitter = require('eventemitter3'),
    stream = require('stream');

var Duplex = stream.Duplex;



util.inherits(TcpProxy, EventEmitter);

function TcpProxy (options) {
  EventEmitter.call(this);
  if (!(this instanceof TcpProxy)) { return new TcpProxy(options) }

};

TcpProxy.prototype.proxy = function (socket, options) {
  this.socket = socket;

  options.target = options.target || this.target;

  this.proxySock = options.ssl
    ? tls.connect(options.ssl, options.target)
    : net.connect(options.target);

  this.proxySock.on('error', this.emit.bind(this, 'error'));
  this.socket.on('error', this.emit.bind(this, 'error'));

  this.proxySock.pipe(this.socket).pipe(this.proxySock);


};

module.exports = TcpProxy;


module.exports.createServer =
module.exports.createProxyServer = function createServer(options) {
  var server = options.ssl
    ? tls.createServer(options.ssl, requestHandler)
    : net.createServer(requestHandler);

  var proxy = TcpProxy(options);
  proxy.on('error', server.emit.bind(server, 'error'));

  function requestHandler(socket) {
    proxy.proxy(socket, options);
  }

  return server;
};