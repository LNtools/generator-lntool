// <%= appname %> generated on <%= date %> using https://github.com/LNtools/generator-lntool <%= version %>

const gulp = require('gulp');
const replace = require('gulp-replace');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');
const conf = require('./gulp_opts').conf;

/** require dir with gulp tasks */
requireDir('./gulp-tasks');



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
        ['build_js', 'sass'],
        ['copy', 'templates'],
        function(){
            console.log("El Build de la aplicación se creó en  ----> %s <---- ok!", conf.dest);
            cb();
        });
});



gulp.task("nota-ln", function(cb) {

    let URL_NACION = conf.deploy.pathProduction + conf.deploy.uploadPath;
    URL_NACION = URL_NACION.replace(/\\/g, "/").replace("https:/e", "https://e"); // fix windows path
    let regexBody = /[\s\S]*?<body.*?>([\s\S]*?)<\/body>[\s\S]*?<\/html>/i;
    let regexLocalScript = /<script[^>]*>(.*?)<\/script[^>]*>/ig;
    let regexLocalLink = /<link[^>]*>/ig;
    
    return gulp.src(conf.dest+'**.html')
        .pipe(replace(regexBody, (match) => { // get body content
            try{
                return match.match(regexBody)[1];
            }catch (e){
                console.error(e);
                return match;
            }
        } ))
        .pipe(replace(regexLocalScript, (match) => { // replace local scripts tags
            try{
                return match.replace(/src="((?!https?).+)"/, `src="${URL_NACION}$1"`)
            }catch(e){
                console.error(e);
                return match;
            }
        }))
        .pipe(replace(regexLocalLink, (match) => { // replace local link styles tags
            try{
                return match.replace(/href="((?!https?).+)"/, `href="${URL_NACION}$1"`)
            }catch(e){
                console.error(e);
                return match;
            }
        }))
        .pipe(replace(/^\d|\D/, match => `<!-- HTML LIBRE L9 -->\n${match}`)) // add comments
        .pipe(replace(/[\d|\D]+/m, match => `${match}\n<!-- END HTML LIBRE L9 -->` ))
        .pipe(gulp.dest("nota-ln/"));

});


/**
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */
const git = require('gulp-git');
const bump = require('gulp-bump');
const filter = require('gulp-filter');
const tagVersion = require('gulp-tag-version');

function inc(importance) {
    // get all the files to bump version in
    return gulp.src(['./package.json', './bower.json'])
        // bump the version number in those files
        .pipe(bump({type: importance}))
        // save it back to filesystem
        .pipe(gulp.dest('./'))
        // commit the changed version number
        .pipe(git.commit('bumps package version'))
 
        // read only one file to get the version number
        .pipe(filter('package.json'))
        // **tag it in the repository**
        .pipe(tagVersion());
}

gulp.task('patch', function() { return inc('patch'); })
gulp.task('feature', function() { return inc('minor'); })
gulp.task('release', function() { return inc('major'); })