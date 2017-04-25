var gulp = require('gulp')
  clean = require('gulp-clean'),
  conf = require('../conf').conf;

// default task
gulp.task('clean_build', function(cb) {

  return gulp.src([conf.dest+"/js", conf.dest+"/css"], {read: false})
    .pipe(clean({force: true}));

});
