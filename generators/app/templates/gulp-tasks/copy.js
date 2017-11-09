'use strict';
var gulp = require('gulp'),
    merge = require('merge-stream'),
    htmlreplace = require('gulp-html-replace'),
    minifyHTML = require('gulp-minify-html'),
    ext_replace = require('gulp-ext-replace'),
    fs = require('fs')
;



/** copy HTML files */
gulp.task('html', function () {
    try{
        var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    }catch(e){
        console.warn("No se encontro el manifiest.json");
        var manifest = {};
        manifest.conf = {};
    }

    var opts = {
        conditionals: true,
        spare:true
    };
    // var html = gulp.src('*.html', { cwd: manifest.conf.app_cwd })
    gulp.src([
        '*.html'
        ], { cwd: manifest.conf.app_cwd })
        .pipe(htmlreplace({
            js: ['js/'+manifest.js_all],
            css: ['css/'+manifest.css_file_min]
        }))
        // .pipe(minifyHTML(opts))
        // .pipe(ext_replace('.ejs'))
        .pipe(gulp.dest(manifest.conf.dest));
        // .pipe(gulp.dest(manifest.conf.dest+"preview"));

});

/** copy assets */
gulp.task('copy_assets', function () {

    try{
        var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    }catch(e){
        console.warn("No se encontro el manifiest.json");
        var manifest = {};
        manifest.conf = {};
    }


    var fonts = gulp.src('css/fonts/*', { cwd: manifest.conf.app_cwd })
        .pipe(gulp.dest(manifest.conf.dest+'css/fonts'));

    var favicon = gulp.src('favicon.ico', { cwd: manifest.conf.app_cwd })
        .pipe(gulp.dest(manifest.conf.dest));
        // .pipe(gulp.dest(manifest.conf.dest+"preview"));

    var img = gulp.src(['img/**/*'], { cwd: manifest.conf.app_cwd })
        .pipe(gulp.dest(manifest.conf.dest+'img'));
        // .pipe(gulp.dest(manifest.conf.dest+"preview/"+'img'));

    var css_img = gulp.src(['css/images/**/*'], { cwd: manifest.conf.app_cwd })
        .pipe(gulp.dest(manifest.conf.dest+'css/images'));
        // .pipe(gulp.dest(manifest.conf.dest+"preview/"+'css/images'));

});

/** copy data folder */
gulp.task('data', function () {
    try{
        var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    }catch(e){
        console.warn("No se encontro el manifiest.json");
        var manifest = {};
        manifest.conf = {};
    }

    var data = gulp.src('data/*', { cwd: manifest.conf.app_cwd })
        .pipe(gulp.dest(manifest.conf.dest+'data'));
        // .pipe(gulp.dest(manifest.conf.dest+"preview/"+'data'));
});


gulp.task('templates', function () {
    try{
        var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    }catch(e){
        console.warn("No se encontro el manifiest.json");
        var manifest = {};
        manifest.conf = {};
    }

    var templates = gulp.src('templates/*', { cwd: manifest.conf.app_cwd })
        .pipe(gulp.dest(manifest.conf.dest+'templates'));
});

gulp.task('copy', ['html', 'copy_assets', 'data', 'templates']);
