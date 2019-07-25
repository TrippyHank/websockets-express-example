const express = require('express'),
    app = express(),
    ws = require('express-ws')(app),
    path = require('path');

// expose public folder
app.use(express.static(path.join(__dirname, 'public')));

// optional middleware
app.use(function (req, res, next) {
  console.log("optional middleware");
  next();
});

// create handler / for GET
app.get('/', function(req, res, next){
  res.render("index")
});

// websocket
app.ws('/', function(ws, req) {
  // https://github.com/websockets/ws/blob/master/doc/ws.md#event-message
  ws.on('message', function(msg) {
    console.log(`Data received: ${msg}`);
  });
});

// listen for incoming connections
app.listen(3000, function(){
  console.log("Listening on http://localhost:3000 !");
});
