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

    it('creates files', function () {
        assert.file([
            './package.json',
            './gulp_opts.js',
            './gulpfile.js',
            // './source/index.html',
            './README.md',
            './.gitignore',
            './autotune-build',
            './autotune-config.json',
            './s3Credentials.json.tmpl',
            // './.babelrc',
            './.jshintrc',

        ]);
    });

});
