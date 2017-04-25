'use strict';
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var conf = require('../conf').conf;

/** mahe and push github page branch from build folder */
gulp.task('deploy-gh-page', function() {
  return gulp.src(conf.dest+'**/*')
    .pipe(ghPages());
});
