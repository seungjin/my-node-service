// demon.node
// http://github.com/Slashed/daemon.node
/*
var sys = require("sys");
var daemon = require("./daemon");
*/


//var t = new timer();
//t.add_job({"job_name":"hi","alarm":"2010-09-12 12:23:12 +0000", "callback":"aaa"});

var cp = require('child_process');
var rv = require('./request_validator.node.js');




var jobs = function() {
	this.job_stack = [];
	this.get_s = function() {
		//return String(this.job_stack);
		return JSON.stringify(this.job_stack);
	};
	this.set = function(a) {
		cp.exec("uuidgen", function(err,stdout,stderr) { a['id'] = stdout;
			
		})
		this.job_stack.push(a);
	};
	this.rm = function() {
		
	};
}

var j = new jobs();

var http = require('http');
http.createServer(function (request,response) {
	switch (request.url) {
		case "" :
			response.writeHead(200,{'Content-Type' : 'text/plain'});
			response.end("ok!");			
			break;
		case "/" :
			response.writeHead(200,{'Content-Type' : 'text/plain'});
			response.end("ok!");			
			break;
		case "/job" :
			switch (request.method) {
				case "POST":
					j.set({"job_name":"hi","alarm":"2010-09-12 12:23:12 +0000", "callback":"aaa"});
					response.writeHead(200,{'Content-Type' : 'text/plain'});
					response.write(j.get_s());
					response.end();
					break;
				case "GET":
					response.writeHead(200,{'Content-Type' : 'text/plain'});
					response.write(j.get_s());
					response.end();
					break;
				default :
					break;
			};			
			break;
		default :
			response.writeHead(200,{'Content-Type' : 'text/plain'});
			response.end("ok!");
			break;
	}
}).listen(9000,"localhost");