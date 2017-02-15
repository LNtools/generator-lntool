/** SERVER TASKS */


var gulp = require('gulp'),
    connect = require('gulp-connect')
;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

var conf = require('../conf').conf;


function get_path_app(_path){ return conf.app_cwd+ _path; }

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
      .pipe(sourcemaps.write())
      // .pipe(gulp.dest(conf.dest+'css'));
      .pipe(gulp.dest(get_path_app('css')));
});


gulp.task('watch_sass', function () {
  gulp.watch([get_path_app('scss/**/*.scss')], ['sass', "reload"]);
});


gulp.task('reload', ['test_js'], function () {
  gulp.src('*.html', { cwd: conf.app_cwd })
    .pipe(connect.reload());
});
 

gulp.task('watch', function () {
  gulp.watch([get_path_app('*.html'), get_path_app('**/*.css'), get_path_app('js/**/*.js') ], ['reload']);
});


// development server
gulp.task('server', ['sass', 'connect', 'watch', 'watch_sass']);


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