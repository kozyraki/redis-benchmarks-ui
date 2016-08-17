# Web GUI for redis-benchmark

The goal of this project is to provide a simple web interface for running the `redis-benchmark` tool for
[Redis](http://github.com/antirez/redis).

## Setup

Depending on your environment you'll need to specify which version of the `redis-benchmark` binary to run. By default
the app will look for `/usr/local/bin/redis-benchmark`. The `config.js` file can be modified to specify an alternative
location.

If you're deploying to an environment like CloudFoundry you may not be able to install a system-wide version of the
redis-cli tools. In this case you may want to bundle a copy of the `redis-benchmark` binary with your app.

To build your own `redis-benchmark` binary make sure you've installed a C compiler and then peform the following steps:
  
    $ git clone http://github.com/antirez/redis.git
    $ cd redis
    $ make
    $ make redis-benchmark

If the compile completes successfully you can simply copy the file `src/redis-benchmark` to your app directory.
