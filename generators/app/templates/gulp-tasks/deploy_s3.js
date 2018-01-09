
const gulp = require('gulp');
const s3 = require( "gulp-s3" );
const gzip = require('gulp-gzip');
const fs = require('fs');
const path = require('path');
const opn = require('opn');

const credentialsPath = './s3Credentials.json';
const pathProduction = "http://especialess3.lanacion.com.ar/";

gulp.task('deploy', function () {

    try{
        var manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    }catch(e){
        console.warn("No se encontro el manifiest.json");
        console.warn("Intente ejecutar: $gulp make_manifest");
        // var manifest = {};
        // manifest.conf = {};
        return false;
    }


    var options = {
            uploadPath: manifest.conf.uploadPath
            // headers: {
            // //     // 'Cache-Control': 'max-age=1, no-transform, public',
            //     // 'Vary': 'Accept-Encoding'
            // }

        }

    if (fs.existsSync(credentialsPath) && manifest) {

        var s3Credentials = JSON.parse(fs.readFileSync(credentialsPath));

        gulp.src('**', { cwd: manifest.conf.dest })
            .pipe(s3(s3Credentials, options))
            .on('end', function(e){
                let urlProductionApp = path.join(pathProduction, options.uploadPath);
                console.log( "Deploy complete on: \n" +  urlProductionApp);
                opn(urlProductionApp);
            });
    }
    else{

        console.log( "El archivo "+ credentialsPath + " no existe, renombre s3Creentials.json.tmpl y vuelva a intentar");
    }

});
