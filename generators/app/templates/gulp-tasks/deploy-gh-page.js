'use strict';
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages'),
fs = require('fs');

// var conf = require('../gulp_opts').conf;

/** mahe and push github page branch from build folder */
gulp.task('deploy-gh-page', ['make_manifest', 'build'],  function() {
    var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));

    return gulp.src(manifest.conf.dest+'**/*')
        .pipe(ghPages());
});
