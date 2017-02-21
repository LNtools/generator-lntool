/** Build JS files */

var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    merge = require('merge-stream'),
    browserify = require('gulp-browserify');


var conf = require('../conf').conf;

var js_all = require('../conf').js_all;
var js_vendor = require('../conf').js_vendor;


/** build js */

gulp.task('browserify', function () {
    return gulp.src("js/main.js", { cwd: conf.app_cwd })
    .pipe(browserify({
        // insertGlobals : true,
        debug : true,
        paths: [conf.app_cwd+'js/']
    }))
    // .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(uglify())
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(conf.app_cwd+'jsbuild'));
});

gulp.task('js_vendor', function(){
    gulp.src([
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

    gulp.src([
        'js/**/*.js',
        ], { cwd: conf.app_cwd })
        .pipe(uglify())
        .pipe(concat(js_all))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(conf.dest+ "js"))
        .pipe(gulp.dest(conf.dest+"preview/"+ "js"));

});
