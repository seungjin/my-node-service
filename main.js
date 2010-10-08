var faye = require('./lib/faye/faye-node');

var bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
});

var server = require('./lib/node-router/node-router').getServer();

server.get("/", function(req,res,match) {
	return "job get";
});

server.get("/job", function(req,res,match) {
	return "current job states"
});

server.post("/job", function(req,res,match) {
	return "hh"
})

server.get(new RegExp("^/static(.*)$"), function(req,res,match) {
	var staticDir = require('./lib/node-router/node-router').staticDirHandler('./','');
	return staticDir(req,res);
})

/*
 * reular expression is also available.
server.get(new RegExp("^/(.*)$"), function hello(req, res, match) {
  return "Hello " + (match || "World") + "!";
});
*/

bayeux.attach(server.server);
server.listen(9000);
