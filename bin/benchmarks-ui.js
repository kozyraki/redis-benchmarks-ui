/**
 * benchmarks-ui.js - Very simple Express web application for benchmarking Redis performance.
 *
 * Author: Adam Duston
 * License: MIT
 */
var express = require('express');
var fs = require('fs');
var exec = require('child_process').exec;
var RedisBenchmark = require('../lib/redis-benchmark');
var bodyParser = require('body-parser');
var cfenv = require("cfenv");

// Load the configuration from the config file.
var configFile = "./config/config.json";
try {
  var config = JSON.parse(fs.readFileSync(configFile));
  console.log(config);
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
app.set('view engine', 'jade');

// Create a static resource for the public directory.
app.use(express.static('public'));

// Set some express configuration options
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Default app route for index.hml
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  console.log(req.body);
    benchmarkOpts = {
      "redis_host": req.body.redis_host,
      "redis_port": req.body.redis_port,
      "redis_pw": req.body.redis_pw,
      "num_requests": req.body.num_requests,
      "benchmark_bin": benchmark_cmd
    };

    runBenchmark(benchmarkOpts, function(results) {
      console.log(results);
      res.render('results', {
        "results": results,
        "redis_host": req.body.redis_host,
        "redis_port": req.body.redis_port,
        "redis_pw": req.body.redis_pw,
        "num_requests": req.body.num_requests
        });
    });
});

var appEnv = cfenv.getAppEnv();
var server = app.listen(appEnv.port, appEnv.bind, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('benchmarks-ui running on %s', appEnv.url);

});

var runBenchmark = function(options, callback) {
  /**
   * Run a benchmark for the Redis server given in options.
   */

  // Assume the options sent are options appropriate for RedisBenchmark
  benchmark = new RedisBenchmark(benchmarkOpts);

  console.log("Running benchmark for %s:%s", options.redis_host, options.redis_port);

  // Run the benchmark and pass the output to the calling function.
  benchmark.run(options.num_requests, function(output){
    callback(output);
  });

};
