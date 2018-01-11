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
  var manifest;
	try {
    manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
  } catch(e){
    console.warn("No se encontro el manifiest.json");
    manifest = {};
    manifest.conf = {};
  }

  gulp.src('views/*.html', { cwd: conf.app_cwd })
    .pipe(swig(opts))
    .pipe(htmlreplace({
      js: ['js/'+manifest.js_all],
      css: ['css/'+manifest.css_file_min]
    }))
    .pipe(gulp.dest(conf.dest));
});
