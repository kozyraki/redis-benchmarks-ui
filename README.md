# Web GUI for redis-benchmark

This is a simple web app frontend for running the `redis-benchmark` tool for [Redis](http://github.com/antirez/redis).

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


![Alt text](https://raw.githubusercontent.com/compybara/redis-benchmarks-ui/master/screenshots/benchmarks-ui.png)
