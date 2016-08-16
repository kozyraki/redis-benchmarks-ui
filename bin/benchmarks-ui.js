/**
 * benchmarks-ui.js - Very simple Express web application for benchmarking Redis performance.
 *
 * Author: Adam Duston
 * License: MIT
 */
var express = require('express');
var fs = require('fs');
var exec = require('child_process').exec;
var csv = require('csv');


// Load the configuration from the config file.
var configFile = "./config/config.json";
try {
var config = JSON.parse(fs.readFileSync(configFile));
} catch (e) {
  // Quit if the config file can't be read (for now)
  console.log("Error parsing %s - %s", configFile, e);
  process.exit(1);
}

// Set a default for the redis-benchmark bin location, or use the one from the config.json
var benchmark_cmd = "/usr/local/bin/redis-benchmark";
if (config.hasOwnProperty("benchmark_cmd")) {
  benchmark_cmd = config.benchmark_cmd;
}


// Initialize the express application. Use Jade as the view engine
var app = express();
app.set('view engine','jade');

// Create a static resource for the public directory.
app.use(express.static('public'));


// Default app route for index.hml
app.get('/', function(req, res) {
   res.render('index');
});

var server = app.listen(config.port, config.host, function () {
   var host = server.address().address;
   var port = server.address().port;

   console.log('benchmarks-ui listening on %s:%s', host, port);
});
