var express   = require('express'),
    app       = express(),
    ws        = require('express-ws')(app),
    exec      = require('child_process').exec;

// Use `.html` for extensions
app.use(express.static(__dirname));

// Optional middleware
app.use(function (req, res, next) {
  console.log('Optional middleware');
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
    console.log('Received message : ' + msg);
  });

});

app.listen(3000, function(){
  console.log("Listening on http://localhost:3000 !");
  exec('open http://localhost:3000/')
});
