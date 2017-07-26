var gulp = require('gulp')
  clean = require('gulp-clean'),
  conf = require('../gulp_opts').conf;

// default task
gulp.task('clean_build', function(cb) {

  return gulp.src([conf.dest+"/js", conf.dest+"/css", "preview"], {read: false})
    .pipe(clean({force: true}));

});
