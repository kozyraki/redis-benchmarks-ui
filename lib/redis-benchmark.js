/**
 * redis-benchmarks.js - Utility module for running redis-benchmarks cli too.
 *
 * Author: Adam Duston
 * License: MIT
 */
var util = require('util');
var csv = require('csv');


 module.exports = function(options) {
  // Set defaults for the options if they're not included.
  var benchmark_bin = options.benchmark_bin !== undefined ? options.benchmark_bin : "/usr/local/bin/redis-benchmark";
  var redis_host = options.redis_host !== undefined ? options.redis_host : "127.0.0.1";
  var redis_port = options.redis_port !== undefined ? options.redis_port : 6379;
  var num_requests = options.num_requsts !== undefined ? options.num_requsts : 10000;

  // build the command-line command to run.
  var benchmark_cmd = util.format("%s -h %s -p %d -n %d", benchmark_bin, redis_host, redis_port, num_requsts);
};
