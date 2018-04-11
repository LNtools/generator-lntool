'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-lntool:app', function () {
    before(function () {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({someAnswer: true})
            .toPromise();
    });

    
    it('create package.json', function () {
        assert.file([
            './package.json',
        ]); 
    });
    
    it('create gulp_opts.js', function () {
        assert.file([
            './gulp_opts.js',
        ]); 
    });
    
    it('create gulpfile.js', function () {
        assert.file([
            './gulpfile.js',
        ]); 
    });

    it('create README', function () {
        assert.file([
            './README.md',
        ]); 
    });

    it('create gitignore', function () {
        assert.file([
            './.gitignore',
        ]); 
    });

    it('create autotune-build', function () {
        assert.file([
            './autotune-build',
        ]); 
    });

    it('create autotune-config.json', function () {
        assert.file([
            './autotune-config.json',
        ]); 
    });
    
    it('create s3Credentials.json.tmpl', function () {
        assert.file([
            './s3Credentials.json.tmpl',
        ]); 
    });   
     
    it('create babelrc', function () {
        assert.file([
            './.babelrc',
        ]); 
    });

    it('create jshintrc', function () {
        assert.file([
            './.jshintrc',

        ]);
    });

});


describe('generator-lntool:app-templates', function () {
    before(function () {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({someAnswer: true})
            .toPromise();
    });


});
