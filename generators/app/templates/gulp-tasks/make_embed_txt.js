var gulp = require('gulp');

var conf = require('../conf').conf;
// load file as sync
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync(conf.autotuneJson, 'utf8'));


// default task
gulp.task('make_embed_txt', function(cb) {
    
    console.log(obj.base_url);
    
    fs = require('fs')
    fs.readFile('source/embed.txt.tmpl', 'utf8', function (err,tmpl) {
        if (err) {
            return console.log(err);
        }
      
        var embedTxt = tmpl
            .replace(/\{\{slug\}\}/gi, obj.slug)
            .replace(/\{\{base_url\}\}/gi, obj.base_url);
      
        // console.log(embedTxt);
        
        // write file and run callback
        fs.writeFile('source/embed.txt', embedTxt, cb);

    });

});
