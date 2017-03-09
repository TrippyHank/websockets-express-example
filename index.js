var express   = require('express'),
    app       = express(),
    expressWs = require('express-ws')(app),
    hbs       = require('express-hbs');

// Use `.html` for extensions
app.use(express.static(__dirname));

// Optional middleware
app.use(function (req, res, next) {
  console.log('middleware');
  return next();
});

// Create handler / for GET
app.get('/', function(req, res, next){
  res.render('index')
});

// WebSocket
app.ws('/', function(ws, req) {

  // Handler
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('Connection opened !');
});

app.listen(3000, function(){
  console.log("~ Listening on http://localhost:3000/ ");
});
