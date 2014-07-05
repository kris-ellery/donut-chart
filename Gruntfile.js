module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    path: {
      prod: 'production',
      dev: 'development',
      views: 'views',
      styles: 'styles',
      scripts: 'scripts',
    },

    meta: {
      banner:
        '/* \n' +
        ' * Project: <%= pkg.title %>\n' +
        ' * Description: <%= pkg.description %>\n' +
        ' * Version: <%= pkg.version %>\n' +
        ' * \n' +
        ' * 2014 <%= pkg.author.name %> | <%= pkg.author.url %>\n' +
        ' */\n\n'
    },

    watch: {
      css: {
        files: [ '<%= path.dev %>/<%= path.styles %>/**/*.scss' ],
        tasks: [ 'css' ]
      },
      js: {
        files: [ '<%= path.dev %>/<%= path.scripts %>/**/*.js' ],
        tasks: [ 'js' ]
      },
      html: {
        files: [ '<%= path.dev %>/<%= path.views %>/**/*.html' ],
        tasks: [ 'html' ]
      }
    },

    clean: {
      css: [ '<%= path.prod %>/<%= path.styles %>/**/*' ],
      js: [ '<%= path.prod %>/<%= path.scripts %>/**/*' ],
      html: [ '<%= path.prod %>/**/*.html' ]
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: false,
          removeCommentsFromCDATA: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true
        },
        files: [ { expand: true, cwd: '<%= path.dev %>/<%= path.views %>', src: [ '**/*.html' ], dest: '<%= path.prod %>' } ]
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded',
          banner: '<%= meta.banner %>'
        },
        files: { '<%= path.prod %>/<%= path.styles %>/donut-chart.css': [ '<%= path.dev %>/<%= path.styles %>/application.scss' ] }
      }
    },

    autoprefixer: {
      dist: {
        files: { '<%= path.prod %>/<%= path.styles %>/donut-chart.css': [ '<%= path.prod %>/<%= path.styles %>/donut-chart.css' ] }
      }
    },

    csscomb: {
      dist: {
        files: { '<%= path.prod %>/<%= path.styles %>/donut-chart.css': [ '<%= path.prod %>/<%= path.styles %>/donut-chart.css' ] }
      }
    },

    csso: {
      dist: {
        options: {
          restructure: false,
          report: 'min',
          banner: '<%= meta.banner %>'
        },
        files: { '<%= path.prod %>/<%= path.styles %>/donut-chart.min.css': [ '<%= path.prod %>/<%= path.styles %>/donut-chart.css' ] }
      }
    },

    stylestats: {
      src: [ '<%= path.prod %>/<%= path.styles %>/donut-chart.css', '<%= path.prod %>/<%= path.styles %>/donut-chart.min.css' ]
    },

    concat: {
      options: {
        banner: '<%= meta.banner %>',
        separator: '\n\n'
      },
      dist: {
        src: [
          '<%= path.dev %>/<%= path.scripts %>/donut-chart.js',
          '<%= path.dev %>/<%= path.scripts %>/demo.js',
         ],
        dest: '<%= path.prod %>/<%= path.scripts %>/donut-chart.js'
      }
    },

    jshint: {
      beforeconcat: [ '<%= concat.dist.src %>' ],
      afterconcat: [ '<%= concat.dist.dest %>' ]
    },

    uglify: {
      options: {
        mangle: false,
        report: 'min',
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: [ '<%= path.prod %>/<%= path.scripts %>/donut-chart.js' ],
        dest: '<%= path.prod %>/<%= path.scripts %>/donut-chart.min.js'
      }
    },

    notify: {
      css: {
        options: {
          title: '<%= pkg.title %>',
          message: 'CSS task completed!'
        }
      },
      js: {
        options: {
          title: '<%= pkg.title %>',
          message: 'JS task completed!'
        }
      },
      html: {
        options: {
          title: '<%= pkg.title %>',
          message: 'HTML task completed!'
        }
      },
      build: {
        options: {
          title: '<%= pkg.title %>',
          message: 'Build task completed!'
        }
      }
    }

  }); // grunt.initConfig()

  grunt.registerTask('css', [
    'clean:css',
    'sass',
    'autoprefixer',
    'csscomb',
    'csso',
    'stylestats',
    'notify:css'
  ]);

  grunt.registerTask('js', [
    'clean:js',
    'concat',
    'jshint',
    'uglify',
    'notify:js'
  ]);

  grunt.registerTask('html', [
    'clean:html',
    'htmlmin',
    'notify:html'
  ]);

  grunt.registerTask('build', [
    'css',
    'js',
    'html',
    'notify:build'
  ]);

  grunt.registerTask('default', [ 'build' ]);

};
