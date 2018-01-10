// <%= appname %> generated on <%= date %> using https://github.com/LNtools/generator-lntool <%= version %>

var gulp = require('gulp');

var requireDir = require('require-dir');
requireDir('./gulp-tasks'),
runSequence = require('run-sequence')
;

var conf = require('./gulp_opts').conf;


// default task
// gulp.task('default', ['express_app']);
gulp.task('default', ['browser-sync']);

gulp.task('build-autotune', ['build'], function(cb) { // build para LNTOOLS

    var fs = require('fs');
    try{
        var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    }catch(e){
        console.warn("No se encontro el manifiest.json");
        var manifest = {};
        manifest.conf = {};
    }

     return gulp.src(["**/*"], { cwd: manifest.conf.dest })
        .pipe(gulp.dest(manifest.conf.dest+"./preview"));

});



gulp.task('build', ['make_manifest'], function(cb) { // build para Especiales

    runSequence(
        'clean_build',
        ['build_js', 'sass', 'js_vendor'],
        ['copy', 'templates'],
        function(){
            console.log("El Build de la aplicación se creó en  ----> %s <---- ok!", conf.dest);
            cb();
        });
});
