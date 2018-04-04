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
        ['build_js', 'sass', 'js_vendor'],
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