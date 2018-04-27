var gulp = require('gulp');
// var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var bro = require('gulp-bro');
var rename = require("gulp-rename");
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var lazypipe = require('lazypipe');

var gulp_opts = require('../gulp_opts');

let isDev = process.env.NODE_ENV=="development" || process.env.NODE_ENV !="production";
let isPro = process.env.NODE_ENV =="production";


var jshintChannel = lazypipe()
    // adding a pipeline step
    .pipe(jshint) // notice the stream function has not been called!
    .pipe(jshint.reporter);
    // adding a step with an argument
    // .pipe(jshint.reporter, 'fail');



gulp.task('build_js', () => {

    gulp.src(gulp_opts.conf.app_cwd+'js/main.js')
        .pipe(gulpif(isDev, jshintChannel())) // JS lint tas
        .pipe(bro({
            debug: isDev,
            transform: [
                // babelify.configure({ presets: ['es2015'] }),
                // babelify.configure({ presets: ['env'] }),
                babelify.configure({ }),
                // [ 'uglifyify', { global: true } ]
          ]
        }))
        .pipe( gulpif(isPro, uglify()) )
        .pipe(rename(gulp_opts.js_all))
        .pipe(gulp.dest(gulp_opts.conf.dest+ "js"))

});

