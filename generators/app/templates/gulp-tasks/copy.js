'use strict';
var gulp = require('gulp'),
	merge = require('merge-stream'),
	htmlreplace = require('gulp-html-replace'),
	minifyHTML = require('gulp-minify-html')
;
var conf = require('../conf').conf;

var js_all = require('../conf').js_all;
var js_vendor = require('../conf').js_vendor;
var css_file_min = require('../conf').css_file_min;


gulp.task('copy', function () {
    var opts = {
        conditionals: true,
        spare:true
    };

    var html = gulp.src('**/*.html', { cwd: conf.app_cwd })
    gulp.src([
        '**/*.html'
        ], { cwd: conf.app_cwd })
        .pipe(htmlreplace({
            // js: ['js/'+js_vendor, 'js/'+js_all],
            js: ['js/'+js_all],
            css: ['css/'+css_file_min]
        }))
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(conf.dest))
        .pipe(gulp.dest(conf.dest+"preview"));

    var fonts = gulp.src('css/fonts/*', { cwd: conf.app_cwd })
        .pipe(gulp.dest(conf.dest+'css/fonts'))
        .pipe(gulp.dest(conf.dest+"preview/"+'css/fonts'));

    var favicon = gulp.src('favicon.ico', { cwd: conf.app_cwd })
        .pipe(gulp.dest(conf.dest))
        .pipe(gulp.dest(conf.dest+"preview"));

    var img = gulp.src(['img/**/*'], { cwd: conf.app_cwd })
        .pipe(gulp.dest(conf.dest+'img'))
        .pipe(gulp.dest(conf.dest+"preview/"+'img'));

    var css_img = gulp.src(['css/images/**/*'], { cwd: conf.app_cwd })
        .pipe(gulp.dest(conf.dest+'css/images'))
        .pipe(gulp.dest(conf.dest+"preview/"+'css/images'));

    var data = gulp.src('data/*', { cwd: conf.app_cwd })
        .pipe(gulp.dest(conf.dest+'data'))
        .pipe(gulp.dest(conf.dest+"preview/"+'data'));

    var templates = gulp.src('templates/*', { cwd: conf.app_cwd })
        .pipe(gulp.dest(conf.dest+'templates'))
        .pipe(gulp.dest(conf.dest+"preview/"+'templates'));

    var embed = gulp.src('embed.txt', { cwd: conf.app_cwd })
        .pipe(gulp.dest(conf.dest))
        .pipe(gulp.dest(conf.dest+"preview/"));

    return merge(html, fonts, favicon, img, css_img, data, templates, embed);
});
