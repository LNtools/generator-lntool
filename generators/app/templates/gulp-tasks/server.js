
'use strict';


var gulp = require('gulp');
var browserSync = require('browser-sync');

function getPathApp(_path){

    try{
        var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    }catch(e){
        console.warn("No se encontro el manifiest.json");
        var manifest = {};
        manifest.conf = {};
    }
    var conf = manifest.conf;

    return conf.app_cwd+ _path;
}

gulp.task('browser-sync', ['build'], function () {

    // for more browser-sync config options: http://www.browsersync.io/docs/options/
    browserSync.init({

        port: 8080,

        files: [conf.dest+"/**/*.*"],

        // open the proxied app in chrome
        browser: ['google-chrome'],
        server: {
            baseDir: conf.dest
        }
    });

    gulp.watch([conf.dest+"/**/*.*"], function(){
        browserSync.reload();
    });

    gulp.watch( [getPathApp('*.html')], ['html']);
    gulp.watch( [getPathApp('data/**/*')], ['data']);

    gulp.watch([getPathApp('scss/**/*.scss')], ['sass']);
//   // gulp.watch([getPathApp('css/**/*')], ['minify-css']);

//   gulp.watch( [getPathApp('jsbuild/**/*')], ['js_all']);
    gulp.watch( [getPathApp('js/**/*')], ['build_js']);
});
