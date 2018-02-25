var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cors = require('cors');

var corsOptions = {
  origin: true,
  credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/routes')
routes.assignRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

