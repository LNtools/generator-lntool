const gulp = require('gulp');
const file = require('gulp-file');
const request = require('request');



/**
* sample: `$ gulp array_to_obj --url=https://olcreativa.lanacion.com.ar/dev/get_url/?key2=1ZA5BroFXGh_ZvlNHC8s-AHBNV7hiILxQdrClLx9Ob-A&gid=0`
*/
gulp.task('array_to_obj', function(cb) { // build para Especiales
    let NESTED_ARRAY_URL = 'https://olcreativa.lanacion.com.ar/dev/get_url/?key2=1ZA5BroFXGh_ZvlNHC8s-AHBNV7hiILxQdrClLx9Ob-A&gid=0';
    let pat = /^\-\-url\=(.+)$/i;

    let url = process.argv.filter(function(d){
        return d.match(pat);
    })[0];

    url = url ? url.match(pat)[1] : NESTED_ARRAY_URL;


    let file = require('gulp-file');
    let request = require('request');


    request(url, function (error, response, body) {
      console.log('body:', typeof body); // Print the HTML for the Google homepage.

        let data = JSON.parse(body);
        let header = data[0]
        data = data.splice(1)
        data = data.map(function(d){
            let o = {};

            for (let i = 0; i < d.length; i++){

                o[header[i]] = d[i];
            }

            return o;

        });


      return file('array-to-json-output.json', JSON.stringify( data ), { src: true })
            .pipe(gulp.dest('.'));

    });

});
