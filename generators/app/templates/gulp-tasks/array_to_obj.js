var gulp = require('gulp');
var file = require('gulp-file');
var request = require('request');



/**
* sample: `$ gulp array_to_obj --url=http://olcreativa.lanacion.com.ar/dev/get_url/?key2=1ZA5BroFXGh_ZvlNHC8s-AHBNV7hiILxQdrClLx9Ob-A&gid=0`
*/
gulp.task('array_to_obj', function(cb) { // build para Especiales
    var NESTED_ARRAY_URL = 'http://olcreativa.lanacion.com.ar/dev/get_url/?key2=1ZA5BroFXGh_ZvlNHC8s-AHBNV7hiILxQdrClLx9Ob-A&gid=0';
    var pat = /^\-\-url\=(.+)$/i;

    var url = process.argv.filter(function(d){
        return d.match(pat);
    })[0];

    url = url ? url.match(pat)[1] : NESTED_ARRAY_URL;


    var file = require('gulp-file');
    var request = require('request');


    request(url, function (error, response, body) {
      console.log('body:', typeof body); // Print the HTML for the Google homepage.

        var data = JSON.parse(body);
        var header = data[0]
        data = data.splice(1)
        var data = data.map(function(d){
            var o = {};

            for (var i = 0; i < d.length; i++){

                o[header[i]] = d[i];
            }

            return o;

        });


      return file('array-to-json-output.json', JSON.stringify( data ), { src: true })
            .pipe(gulp.dest('.'));

    });

});
