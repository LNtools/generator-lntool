'use strict';
/** test JS */

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish')
;

gulp.task('test_js', function(){

    try{
        var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    }catch(e){
        console.warn("No se encontro el manifiest.json");
        var manifest = {};
        manifest.conf = {};
    }
    var conf = manifest.conf;

    return gulp.src(['js/**/*.js'], { cwd: conf.app_cwd })
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter(stylish));
});
