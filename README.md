# Web GUI for redis-benchmark

This is a simple web app frontend for running the `redis-benchmark` tool for [Redis](http://github.com/antirez/redis).



![Alt text](https://raw.githubusercontent.com/compybara/redis-benchmarks-ui/master/screenshots/benchmarks-ui.png)

## Installation

To run this application you will need to install [node](https://nodejs.org/en/download/) and
[redis-cli](http://redis.io/topics/quickstart). See the setup section below for instructions on building a standalone
`redis-benchmark` binary.

To install from Github

    $ git clone https://github.com/compybara/redis-benchmarks-ui.git
    $ cd redis-benchmarks-ui
    $ npm install

## Setup

Depending on your environment you'll need to specify which version of the `redis-benchmark` binary to run. By default
the app will look for `/usr/local/bin/redis-benchmark`. The `config/config.json` file can be used to specify an
alternative location. You can use `config/config_sample.json` as a template.

If you're deploying to an environment where you can't install a system-wide version of the
redis-cli tools package you can bundle a copy of the `redis-benchmark` binary with your app.

To build your own `redis-benchmark` binary make sure you've installed a C compiler and then peform the following steps:

    $ git clone http://github.com/antirez/redis.git
    $ cd redis
    $ make
    $ make redis-benchmark

If the compile completes successfully you can simply copy the file `src/redis-benchmark` to your app directory.


## Usage

To run locally complete the above configuration and run

    node bin/benchmarks-ui.js

You can deploy this app to CoudFoundry using the included `manifest.yml` and `Procfile`. You will need to follow the
setup instructions for compling a standalone binary in order to run the app in CloudFoundry as it's not likely that the
CF environment will have a copy of the redis-cli tools installed.

Currently deploying to CloudFoundry doesn't work. Everything runs as expected locally, but there are errors spawning
the child process when running in a CF container. Hopefully CloudFoundry compatibility will be working soon.
