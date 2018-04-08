// modules
var express = require('express')
  , http = require('http')
  , https = require('https')
  , fs = require('fs')
  , morgan = require('morgan');

// configuration files
var configServer = require('./lib/config/server');
var options = {
	//key: fs.readFileSync('agent2-key.pem FILE HERE')
	//cert: fs.readFileSync('agent2-cert.cert FILE HERE')
}

detected = 0;
// app parameters
var app = express();
var app2 = express();

app.set('port', configServer.httpPort);
app2.set('port', configServer.http2Port);
app.use(express.static(configServer.staticFolder));
app.use(morgan('dev'));
app2.get('/',function(req, res){
	if (detected > 0) {
		res.json({title : 'Someone is here. Be Careful!'});
	} else{
		res.json({title : 'Nobody is here. Youre safe!'});
	}

});

// serve index
require('./lib/routes').serveIndex(app, configServer.staticFolder);

/* // original HTTP server
var server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('HTTP server listening on port ' + app.get('port'));
});*/ 

//new http server
/*var server2 = http.createServer(app);
server2.listen(80, function () {
  console.log('HTTP server listening on port 80');
});*/


//http camera server
var server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('app HTTP server supposedly listening on port ' + app.get('port'));
});

//http json server (3000
var server2 = http.createServer(app2);
server2.listen(3000, '0.0.0.0', function () {
  console.log('app2 HTTP server supposedly listening on port ' + app2.get('port'));
});





// WebSocket server
var io = require('socket.io')(server);
var io2 = require('socket.io')(server2);
io.on('connection', require('./lib/routes/socket'));

module.exports.app = app;
module.exports.app2 = app2;


setInterval(
	function(){ 
		console.log("hi")
	}
,5000)
