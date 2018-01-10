
const gulp = require('gulp');
const s3 = require( "gulp-s3" );
const gzip = require('gulp-gzip');
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const gulp_opts = require('../gulp_opts');

gulp.task('deploy', function () {

    var options = {
            uploadPath: gulp_opts.conf.uploadPath
            // headers: {
            // //     // 'Cache-Control': 'max-age=1, no-transform, public',
            //     // 'Vary': 'Accept-Encoding'
            // }

        }

    if (fs.existsSync(gulp_opts.conf.credentialsPath)) {
        var s3Credentials = JSON.parse(fs.readFileSync(gulp_opts.conf.credentialsPath));


        gulp.src('**', { cwd: gulp_opts.conf.dest })
            .pipe(s3(s3Credentials, options))
            .on('end', function(e){
                console.log( "Deploy complete on: \n" +  gulp_opts.conf.absolutePath);
                opn(gulp_opts.conf.absolutePath);
            });
    }
    else{

        console.log( "El archivo "+ gulp_opts.conf.credentialsPath + " no existe, renombre s3Creentials.json.tmpl y vuelva a intentar");
    }

});
