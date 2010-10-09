var faye = require('./lib/faye/faye-node');

var bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
});

var node_router = require('./lib/node-router/node-router');
var server = node_router.getServer();

server.get("/", function(req,res,match) {
	return "job get";
});

server.get("/job", function(req,res,match) {
	return "current job states"
});

server.post("/job", function(req,res,match) {
	return "hh"
})

server.get("/dashboard", function(req,res,match) {
	return node_router.staticHandler('./static/dashboard.html')(req,res);
})

server.get("/push_test", function(req,res,match) {
	return node_router.staticHandler('./static/push.html')(req,res);
})

server.get(new RegExp("^/static(.*)$"), function(req,res,match) {
	return node_router.staticDirHandler('./','')(req,res);
})

/*
 * reular expression is also available.
server.get(new RegExp("^/(.*)$"), function hello(req, res, match) {
  return "Hello " + (match || "World") + "!";
});
*/

bayeux.attach(server.server);
server.listen(9000);
