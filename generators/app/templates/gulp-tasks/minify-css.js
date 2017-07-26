'use strict';
/** mify css files */

var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    cssBase64 = require('gulp-css-base64'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    fs = require('fs')
;




gulp.task('sass', function(){

    try{
        var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    }catch(e){
        console.warn("No se encontro el manifiest.json");
        var manifest = {};
        manifest.conf = {};
    }
    var conf = manifest.conf;
    var css_file_min = manifest.css_file_min;

    gulp.src('sass/*.scss', { cwd: conf.app_cwd })
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssBase64())
        // .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(concat(css_file_min))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(conf.dest+'css'));
        // .pipe(gulp.dest(getPathApp('css')));
      // .pipe(gulp.dest(getPathApp('css')));
});


gulp.task('minify-css', function () {
/** debe mantener el orden */
    gulp.src([ 'css/**/*.css' ], { cwd: conf.app_cwd })
    .pipe(cssBase64())
    .pipe(minifyCSS())
    .pipe(concat(css_file_min))
    .pipe(gulp.dest(conf.dest+'css'));
    // .pipe(gulp.dest(conf.dest+"preview/"+'css'));

});

//Without options
gulp.task('cssBase64', function () {
    return gulp.src([ 'css/**/*.css' ], { cwd: conf.app_cwd })
        .pipe(cssBase64())
        .pipe(gulp.dest('cssBase64'));
});
