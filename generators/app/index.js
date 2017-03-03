'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');
var vendor_links = require('./vendor_links');


module.exports = generators.extend({
  constructor: function () {
    var testLocal;

    generators.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },

  prompting: function () {
    if (!this.options['skip-welcome-message']) {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the glorious ' + chalk.red('generator-lntool') + ' generator!'
      ));
    }

    var prompts = [{
        type    : 'input',
        name    : 'appname',
        message : 'Your project name',
        default : this.appname // Default to current folder name
      },
      {
        type    : 'input',
        name    : 'description',
        message : 'Project description',
        default : this.description // Default to current folder name
      },
      {
        type: 'confirm',
        name: 'autotuneProject',
        message: 'Is It an Autotune project?',
        default: true,
        // when: function (answers) {
        //   return answers.features.indexOf('includeBootstrap') === -1;
        // }
      },
      {
        type: 'confirm',
        name: 'includeAnalytics',
        message: 'Include Analytics code to project?',
        default: true,
      },
      {
        type    : 'input',
        name    : 'repository',
        message : 'Repository url',
        default : "" // Default to current folder name
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Which additional features would you like to include?',
        choices: [
          {
            name: 'Jquery',
            value: 'includeJquery',
            checked: true
          }, {
            name: 'D3.js v4',
            value: 'includeD3js',
            checked: false
          }, {
            name: 'underscore',
            value: 'includeUnderscore',
            checked: false
          }, {
            name: 'D3-queue',
            value: 'includeD3_queue',
            checked: false
          }, {
            name: 'Hammerjs',
            value: 'includeHammerjs',
            checked: false
          }, {
            name: 'Vue.js',
            value: 'includeVuejs',
            checked: false
          }
        ],
      },
    ];

    return this.prompt(prompts).then(function (answers) {

      answers.date = new Date();
      this.features = answers;

    }.bind(this));
  },

  writing: {
    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        {
          date: (new Date).toISOString().split('T')[0],
          name: this.pkg.name,
          version: this.pkg.version
        }
      );

      this.fs.copy(
        this.templatePath('gulp-tasks/**/*'),
        this.destinationPath('gulp-tasks/'));

      this.fs.copy(
        this.templatePath('conf.js'),
        this.destinationPath('conf.js'));
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          name: _s.slugify(this.features.appname),
          version: this.pkg.version,
          description: this.features.description,
          repository: this.features.repository,
        }
      );
    },

    git: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'));

      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes'));

      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'), this.features);
    },

    autotune: function () {

      if(this.features.autotuneProject){
        this.fs.copy(
          this.templatePath('autotune-build'),
          this.destinationPath('.autotune-build'));

        this.fs.copyTpl(
          this.templatePath('autotune-config.json'),
          this.destinationPath('autotune-config.json'), this.features);
      }

    },

    html: function () {
      var bsPath, bsPlugins;

      // path prefix for Bootstrap JS files
      this.features.vendor_links = vendor_links;
      this.fs.copyTpl(
        this.templatePath('source/index.html'),
        this.destinationPath('source/index.html'), this.features  );
    },

    bower: function () {
      var bowerJson = {
        name: _s.slugify(this.features.appname),
        private: true,
        version: this.pkg.version,
        dependencies: {}
      };

      // if (this.includeJquery) {
      //   bowerJson.dependencies['jquery'] =  '^3.1.1';
      // }

      // if (this.includeD3js) {
      //   bowerJson.dependencies['d3'] =  '^4.4.0';
      // }

      // if (this.includeD3_queue) {
      //   bowerJson.dependencies['d3-queue'] =  '^3.0.3';
      // }

      // if (this.includeHammerjs) {
      //   bowerJson.dependencies['hammerjs'] =  '2.0.4';
      // }

      this.fs.writeJSON('bower.json', bowerJson);
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
    },

    editorConfig: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    styles: function () {
      this.fs.copy(
        this.templatePath("source/scss/**/*"),
        this.destinationPath("source/scss/"));
    },

    scripts: function () {
      this.fs.copy(
        this.templatePath('source/js/**/*'),
        this.destinationPath('source/js/')
      );
    },

    data: function () {
      this.fs.copy(
        this.templatePath('source/data/**/*'),
        this.destinationPath('source/data/')
      );
    },

    thumbnail_autotune: function () {
      this.fs.copy(
        this.templatePath('thumbnail.*'),
        this.destinationPath('./')
      );
    },


    misc: function () {
      mkdirp('source/img');
      // mkdirp('app/fonts');
    }

    // h5bp: function () {
    //   this.fs.copy(
    //     this.templatePath('favicon.ico'),
    //     this.destinationPath('app/favicon.ico')
    //   );

    //   this.fs.copy(
    //     this.templatePath('apple-touch-icon.png'),
    //     this.destinationPath('app/apple-touch-icon.png')
    //   );

    //   this.fs.copy(
    //     this.templatePath('robots.txt'),
    //     this.destinationPath('app/robots.txt'));
    // },

  }, // end writing

  install: function () {

    this.npmInstall();
    this.runInstall('bower');
  },

  end: function () {
  }
});
