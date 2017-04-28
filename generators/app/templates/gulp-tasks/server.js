'use strict';
/** SERVER TASKS */
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    conf = require('../conf').conf;


function getPathApp(_path){ return conf.app_cwd+ _path; }

gulp.task('connect', function() {
  connect.server({
    root: conf.app_cwd,
    livereload: true,
    port:8080
  });
});

gulp.task('sass', function(){
    gulp.src('scss/*.scss', { cwd: conf.app_cwd })
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(concat('main.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(getPathApp('css')));
});

gulp.task('watch', function () {
  gulp.watch( [getPathApp('*.html'), getPathApp('data/**/*')], ['reload']);

});

gulp.task('watch_sass', function () {
  gulp.watch([getPathApp('scss/**/*.scss')], ['sass']);
  gulp.watch([getPathApp('css/**/*')], ['reload']);
});

gulp.task('watch_js', function () {
  gulp.watch( [getPathApp('jsbuild/**/*')], ['reload']);
  gulp.watch( [getPathApp('js/**/*')], ['build_js']);

});

/** reload html on browser */
gulp.task('reload', ['test_js'], function () {
  gulp.src('*.html', { cwd: conf.app_cwd })
    .pipe(connect.reload());
});

// development server
gulp.task('server', ['build_js', 'sass', 'connect', 'watch', 'watch_sass', 'watch_js']);

// production server
gulp.task('server_pro', function() {
  connect.server({
    root: 'build',
    port:9000
  });
});

// production server
gulp.task('server_doc', function() {
  connect.server({
    root: './DOC_WEBAPP'
  });
});
