
'use strict';


var gulp = require('gulp');
var fs = require('fs');
var browserSync = require('browser-sync');
const gulp_opts = require('../gulp_opts');

function getPathApp(_path){
    return "source/"+ _path;
}

gulp.task('browser-sync', ['build'], function () {


    // for more browser-sync config options: http://www.browsersync.io/docs/options/
    browserSync.init({

        port: 8080,

        files: [ gulp_opts.conf.dest+"**/*.*" ],

        // open the proxied app in chrome
        // browser: ['google-chrome'],
        open: false,
        server: {
            baseDir: gulp_opts.conf.dest
        }
    });

    gulp.watch([ gulp_opts.conf.dest+"**/*.*"], function(){
        browserSync.reload();
    });

    gulp.watch( [getPathApp('views/**/*.html')], ['templates']);
    gulp.watch( [getPathApp('data/**/*')], ['data']);

    gulp.watch([getPathApp('sass/**/*.scss')], ['sass']);

    gulp.watch( [getPathApp('js/**/*')], ['build_js']);
});
