/** test OL methods */
var OL_bucketImg = require('../source/js/ol/src/bucketImg');
var OL_paramToObj = require('../source/js/ol/src/param_to_obj');
var OL_getGdocUrlCdn = require('../source/js/ol/src/get_gdoc_url_cdn');

var assert = require('assert');

describe('Testing OL class', function() {
    describe('OL.bucketImg(_src, _w)', function() {

        let img_no_bucket  = "https://imagenpng.com/wp-content/uploads/2015/09/imagenes-png-635x508.png";
        let img_bucket  = "https://bucket.glanacion.com/lntools/anexos/fotos/75/375.jpg";
        let width_img = 300;

        it("Not from bucket must be equal", function(){
            // t.pass("Not from bucket must be equal");
            assert.ok(img_no_bucket == OL_bucketImg(img_no_bucket, width_img));
        });

        it("Url from bucket", function(){

            let url = OL_bucketImg(img_bucket, width_img);
            assert.ok(url != img_no_bucket);
        });


    });


    describe('OL.paramToObj(u)', function() {
        let u = "https://localhost:8080/#distrito=Buenos%20Aires&partido=&tv_style=true";

        it('try get url', function() {
            let params = OL_paramToObj(u);

            // assert.equal(-1, [1,2,3].indexOf(4));
            assert.ok(params);
        });

        it('Return obj from hash');
        it('Return empty obj from empty hash'); // let url_patt = "https://olcreativa.lanacion.com.ar/dev/get_url/?key2={{gkey}}&output=json&gid={{gid}}"

    });

    describe('OL.getGdocUrlCdn(gdoc_url)', function() {
        let gdoc = "https://docs.google.com/spreadsheets/d/11baUj5Hr88o_LVdknuJp0pV3ydSm9YFGeEDuY66s9Lw/edit#gid=0";

        it('try get url', function() {
            let url = OL_getGdocUrlCdn(gdoc);

            // assert.equal(-1, [1,2,3].indexOf(4));
            assert.ok(url);
        });

        it('Check url pattern'); // let url_patt = "https://olcreativa.lanacion.com.ar/dev/get_url/?key2={{gkey}}&output=json&gid={{gid}}"

    });

});
