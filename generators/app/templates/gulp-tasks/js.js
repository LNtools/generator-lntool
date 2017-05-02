var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


var conf = require('../conf').conf;

var js_all = require('../conf').js_all;
var js_vendor = require('../conf').js_vendor;

var jsbuild = conf.app_cwd+'jsbuild';

gulp.task('build_js', function(callback) {

    var bundler =
                browserify(conf.app_cwd+'js/main.js', { debug: true })
                .transform("babelify",
                    {global: true, presets: ["es2015"]});

    bundler
        .bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(jsbuild))
        .emit('end');

        callback();
});

gulp.task('js_vendor', function(){
    return gulp.src([
        // 'lib/underscore/underscore-min.js',
        // 'lib/d3/d3.min.js',
        // 'lib/jquery/dist/jquery.min.js',
        // 'lib/d3-queue/d3-queue.js',
        // './webapp/libs/jquery.nicescroll/dist/jquery.nicescroll.min.js'
        ], { cwd: conf.app_cwd })
        .pipe(uglify())
        .pipe(concat(js_vendor))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(conf.dest+ "js"))
        .pipe(gulp.dest(conf.dest+"preview/"+ "js"));

});


gulp.task('js_all', function(){
    //combine all js files of the app

    return gulp.src([
        'jsbuild/**/*.js',
        ], { cwd: conf.app_cwd })
        .pipe(uglify())
        .pipe(concat(js_all))
        .pipe(gulp.dest(conf.dest+ "js"))
        .pipe(gulp.dest(conf.dest+"preview/"+ "js"));

});
