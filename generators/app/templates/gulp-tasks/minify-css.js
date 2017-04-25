'use strict';
/** mify css files */

var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    cssBase64 = require('gulp-css-base64');


var conf = require('../conf').conf;

var css_file_min = require('../conf').css_file_min;


gulp.task('minify-css', function () {
/** debe mantener el orden */
    gulp.src([ 'css/**/*.css' ], { cwd: conf.app_cwd })
    .pipe(cssBase64())
    .pipe(minifyCSS())
    .pipe(concat(css_file_min))
    .pipe(gulp.dest(conf.dest+'css'))
    .pipe(gulp.dest(conf.dest+"preview/"+'css'));

});

//Without options
gulp.task('cssBase64', function () {
    return gulp.src([ 'css/**/*.css' ], { cwd: conf.app_cwd })
        .pipe(cssBase64())
        .pipe(gulp.dest('cssBase64'));
});
