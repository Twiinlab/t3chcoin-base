var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cors = require('cors');

var init = require('./init');

var corsOptions = {
  origin: true,
  credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/routes')
routes.assignRoutes(app);

init();

app.listen(3000,'0.0.0.0', function() {
  console.log("server starting on http://localhost:3000");
});

