const gulp = require('gulp');
// var sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const bro = require('gulp-bro');
const rename = require("gulp-rename");
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
const eslint = require('gulp-eslint');

var gulp_opts = require('../gulp_opts');

let isDev = process.env.NODE_ENV=="development" || process.env.NODE_ENV !="production";
let isPro = process.env.NODE_ENV =="production";

/** Indica que tiene que reemplazar las imagenes con el path absoluto */
let isNotaLn = process.env.NOTA_ENV =="nota-ln";

let regexImg = /\"?src"?\:.?"?(img)\/\w+.\w{3}"?/g;
let regexImgBg = /window\.PATH_APP\=\"\"\;?/g;
let URL_NACION =  gulp_opts.conf.absolutePath;

gulp.task('build_js', () => {

    gulp.src(gulp_opts.conf.app_cwd+'js/main.js')
        // .pipe(gulpif(isDev, lint())) // JS lint tas
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(bro({
            debug: isDev,
            transform: [
                //vueify
                // babelify.configure({ presets: ['es2015'] }),
                // babelify.configure({ presets: ['env'] }),
                babelify.configure({ }),
                // [ 'uglifyify', { global: true } ]
          ]
        }))
        .pipe( gulpif(isPro, uglify()) )
        .pipe(rename(gulp_opts.js_all))
        .pipe(gulpif(isNotaLn,

            replace(regexImg, (match) => { // get body content
                console.log(`Reemplazando: ${match}`);
                try{
                    return match.replace(/img\//, `${URL_NACION}img/`);
                }catch (e){
                    return match;
                }
            })

        ))
        .pipe(gulpif(isNotaLn,

            replace(regexImgBg, (match) => { // get body content
                console.log(`Reemplazando: ${match}`);
                try{
                    let r = match.replace(/\"\"/, `"${URL_NACION}"`);
                    console.log(r);
                    return r;
                }catch (e){
                    return match;
                }
            })

        ))
        .pipe(gulp.dest(gulp_opts.conf.dest+ "js"))

});

