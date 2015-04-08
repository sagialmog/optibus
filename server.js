var express = require('express');
var http = require('http');
var app = express();
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/css'));

app.get('/', function(req, res){
  res.writeHead(302, {
  	'Location': '/index.html'
  });
  res.end()
});

app.get('/index.html', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/api/optibus/' , function(req ,res){
	var http = require('http');

	var options = {
	  host: 'interview.optibus.co',
	  port: 2503,
	  path: '/'
	};

	http.get(options, function(resp){
	  var content='';
	  resp.on('data', function(chunk){
		content+=chunk;
	  });
	  resp.on('end', function(){
		res.send(content);
	  });
	})
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Optibus app listening at http://%s:%s', host, port);

});