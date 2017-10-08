var sshConnected = false;
var Client = require('node-rest-client').Client;
var conn = new Client();
var Sequelize = require("sequelize");

conn.on('ready', function() {
  sshConnected = true;
  var sequelize = new Sequelize("Employees", "jwin4740", "47bug", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

}).on('close', function() {
  sshConnected = false;
}).connect({
    host: '173.230.140.34',
    port: 22,
    username: "jwin4740",
    privateKey: require('fs').readFileSync('C:/Users/jwin4740/.ssh/known_hosts')
});

net.createServer(function(sock) {
  sock.on('error', function() {});
  if (!sshConnected) return sock.end();
  conn.forwardOut(
    '127.0.0.1',
    sock.remotePort,
    '127.0.0.1',
    3306,
    function (err, stream) {
      if (err) return sock.end();
      stream.pipe(sock).pipe(stream);
    });
}).listen(3306);
