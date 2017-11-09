var gulp = require('gulp')
    , file = require('gulp-file')
    , conf = require('../gulp_opts');

gulp.task('make_manifest', function(cb) {


  return file('manifest.json', JSON.stringify( conf), { src: true })
    .pipe(gulp.dest('.'));

});
