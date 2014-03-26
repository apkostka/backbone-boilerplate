'use strict';

module.exports = function (grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
 
     // This task uses James Burke's excellent r.js AMD builder to take all
    // modules and concatenate them into a single file.
    requirejs: {
      release: {
        options: {
          mainConfigFile: "app/js/config.js",
          generateSourceMaps: true,
          include: ["main"],
          out: "dist/js/source.min.js",
          optimize: "uglify2",

          // Since we bootstrap with nested `require` calls this option allows
          // R.js to find them.
          findNestedDependencies: true,

          // Setting the base url to the distribution directory allows the
          // Uglify minification process to correctly map paths for Source
          // Maps.
          baseUrl: "app/js",

          name: 'vendor/require',

          // Wrap everything in an IIFE.
          wrap: true,

          // Do not preserve any license comments when working with source
          // maps.  These options are incompatible.
          preserveLicenseComments: false
        }
      }
    },

    compass: {
      dev: {
        options: {
          config: './app/style/config.rb',
          sassDir: './app/style/sass',
          imagesDir: './app/img',
          cssDir: './app/style',
          environment: 'development',
          outputStyle: 'expanded',
          force: true
        }
      },
      prod: {
        options: {
          config: './app/style/config.rb',
          sassDir: './app/style/sass',
          imagesDir: './app/img',
          cssDir: './dist/style',
          environment: 'production',
          outputStyle: 'compressed',
          force: true
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: './app/img/src',
          src: ['*.{png,jpg,gif}'],
          dest: './app/img/'
        }]
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['app/img/*.jpg'], dest: 'dist/img', flatten: true},
        ]
      }
    },

    processhtml: {
      release: {
        files: {
          "dist/index.html": ["app/index.html"]
        }
      }
    },

    browser_sync: {
      files: {
        src: './app/style/screen.css'
      },
      options: {
          host: "localhost",
          watchTask: true
      }
    },

    watch: {
      options: {
        livereload: true
      },
      styles: {
        files: ['./app/style/**/*.{sass,scss}','./app/img/ui/*.png'],
        tasks: ['compass:dev']
      },
      images: {
        files: ['./app/img/src/*.{png,jpg,gif}'],
        tasks: ['imagemin']
      }
    },

    build: {
      tasks: ['requirejs', 'compass:prod', 'imagemin', 'processhtml'],
      packageConfig: 'pkg',
      packages: '*.json',
      jsonSpace: 2,
      jsonReplacer: undefined,
      gitAdd: '--all'
    }
  });
 
  // Development task checks and concatenates JS, compiles SASS preserving comments and nesting, runs dev server, and starts watch
  grunt.registerTask('default', ['compass:dev', 'imagemin', 'browser_sync', 'watch']);
  grunt.registerTask('compile', ['compass:prod', 'requirejs', 'processhtml', 'copy']);
 }