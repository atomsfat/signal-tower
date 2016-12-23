'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var webpack = require('webpack');
  // WebpackDevServer = require('webpack-dev-server'),
var nodemon = require('gulp-nodemon');
var webpackConfig = require('./webpack.config.js');
var devCompiler;
var config;
var myDevConfig = Object.create(webpackConfig);

config = {
  jadeSrc: './src/web/resources/*.jade'
};

// modify some webpack config options
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-web-dev', ['jades'], function buildWebDev(callback) {
  // run webpack
  devCompiler.run(function devCompile(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    callback();
  });
});


gulp.task('jades', function jades() {
  var YOUR_LOCALS = {};
  gulp.src(config.jadeSrc)
    .pipe(jade(YOUR_LOCALS))
    .pipe(gulp.dest('./public/'));
});


gulp.task('build-web', ['webpack:build-web-dev'], function watch() {
  gulp.watch(['src/web/**/*'], ['webpack:build-web-dev']);
});


gulp.task('nodemon', function runNodemon(cb) {
  var started = false;

  return nodemon({
    script: './src/main/js/app.js',
    ignore: ['./src/main/web/*']
  }).on('start', function start() {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  });
});
