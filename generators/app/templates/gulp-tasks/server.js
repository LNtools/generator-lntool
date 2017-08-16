
'use strict';


var gulp = require('gulp');
var browserSync = require('browser-sync');

function getPathApp(_path){
    return "source/"+ _path;
}

gulp.task('browser-sync', ['build'], function () {

    // for more browser-sync config options: http://www.browsersync.io/docs/options/
    browserSync.init({

        port: 8080,

        files: ["build/**/*.*"],

        // open the proxied app in chrome
        // browser: ['google-chrome'],
        open: false,
        server: {
            baseDir: "build/"
        }
    });

    gulp.watch(["build/**/*.*"], function(){
        browserSync.reload();
    });

    gulp.watch( [getPathApp('*.html')], ['html']);
    gulp.watch( [getPathApp('data/**/*')], ['data']);

    gulp.watch([getPathApp('sass/**/*.scss')], ['sass']);
//   // gulp.watch([getPathApp('css/**/*')], ['minify-css']);

//   gulp.watch( [getPathApp('jsbuild/**/*')], ['js_all']);
    gulp.watch( [getPathApp('js/**/*')], ['build_js']);
});
