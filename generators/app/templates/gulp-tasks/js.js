var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


var fs = require('fs');

gulp.task('build_js', function(callback) {

    try{
        var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    }catch(e){
        console.warn("No se encontro el manifiest.json");
        var manifest = {};
        manifest.conf = {};
    }


    var jsbuild = manifest.conf.app_cwd+'jsbuild';

    var bundler =
                browserify(manifest.conf.app_cwd+'js/main.js', { debug: true })
                .transform("babelify",
                    {global: true, presets: ["es2015"]});

    bundler
        .bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source(manifest.js_all))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(manifest.conf.dest+ "js"))
        // .pipe(gulp.dest(jsbuild))
        .emit('end');

        callback();
});

gulp.task('js_vendor', function(){

    try{
            var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
        }catch(e){
            console.warn("No se encontro el manifiest.json");
            var manifest = {};
            manifest.conf = {};
        }



    return gulp.src([
        // 'lib/vue/dist/vue.min.js',
        // 'lib/underscore/underscore-min.js',
        // 'lib/d3/d3.min.js',
        // 'lib/jquery/dist/jquery.min.js',
        // 'lib/d3-queue/d3-queue.js',
        // './webapp/libs/jquery.nicescroll/dist/jquery.nicescroll.min.js'
        ], { cwd: manifest.conf.app_cwd })
        .pipe(uglify())
        .pipe(concat(manifest.js_vendor))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(manifest.conf.dest+ "js"));

});


gulp.task('js_all', function(){
    //combine all js files of the app

    return gulp.src([
        'jsbuild/**/*.js',
        ], { cwd: manifest.conf.app_cwd })
        .pipe(uglify())
        .pipe(concat(manifest.js_all))
        .pipe(gulp.dest(manifest.conf.dest+ "js"));

});
