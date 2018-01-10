var gulp = require('gulp');
var swig = require('gulp-swig');
var htmlreplace = require('gulp-html-replace');
var fs = require('fs');
var conf = require('../gulp_opts').conf;


var opts = {
	defaults: { cache: false },
	data: conf.meta_data
};


gulp.task('templates', function() {
	try{
        var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    }catch(e){
        console.warn("No se encontro el manifiest.json");
        var manifest = {};
        manifest.conf = {};
    }

    // var opts = {
    //     conditionals: true,
    //     spare:true
    // };

  gulp.src('views/*.html', { cwd: conf.app_cwd })
    .pipe(swig(opts))
	.pipe(htmlreplace({
		js: ['js/'+manifest.js_all],
		css: ['css/'+manifest.css_file_min]
	}))
    // .
    // .pipe(gulp.dest(conf.app_cwd))
    .pipe(gulp.dest(conf.dest))
});