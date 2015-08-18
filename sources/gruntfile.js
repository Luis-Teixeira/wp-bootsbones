var LIVERELOAD_PORT = 35729;

module.exports = function(grunt) {

    var path = require('path');

    grunt.initConfig({

        themes_js: {
            all:[
                //'bower_components/bootstrap-sass/assets/javascripts/bootstrap/*.js',
                'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
                'js/bones-scripts.js',
                'js/scripts.js'
            ]
        },

        themes_css: {
            all:[
                //'vendor/some-vendor-css.css',
                '../library/css/style.css'
            ]
        },

        pkg: grunt.file.readJSON('package.json'),

        // chech our JS
        jshint: {
            options: {
                "bitwise": true,
                "browser": true,
                "curly": true,
                "eqeqeq": true,
                "eqnull": true,
                "esnext": true,
                "immed": true,
                "jquery": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "node": true,
                "strict": false,
                "trailing": true,
                "undef": true,
                "globals": {
                    "jQuery": true,
                    "alert": true,
                    "require": true,
                    "module": true
                }
            },
            all: [
                'gruntfile.js',
                'js/scripts.js'
            ]
        },

        //concat and minify our JS
        uglify: {
            dist: {
                files: {
                    '../library/js/scripts.min.js': [
                        '<%= themes_js.all %>'
                    ]
                },
            },

            dev: {
                options: {
                    beautify: true
                },
                files: {
                    '../library/js/scripts.min.js': [
                        '<%= themes_js.all %>'
                    ]
                }
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'compact',
                    sourcemap: 'inline'
                },
                files: {
                    '../library/css/style.css': 'scss/style.scss',
                    '../library/css/login.css': 'scss/theme-extras/login.scss',
                    //'../library/css/admin.css': 'scss/theme-extras/admin.scss'
                }
            },

            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '.css_tmp/style.css': 'scss/style.scss',
                    '.css_tmp/login.css': 'scss/theme-extras/login.scss',
                    //'.css_tmp/admin.css': 'scss/admin.scss'
                }
            }
        },

        autoprefixer: {
            options: {
              browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            multiple_files: {
              expand: true,
              flatten: true,
              src: '.css_tmp/*.css', // -> src/css/file1.css, src/css/file2.css
              dest: '../library/css/' // -> dest/css/file1.css, dest/css/file2.css
            },
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
            },
            target: {
                files: {
                  '../library/css/style.css': [
                     '<%= themes_css.all %>'
                ]
              }
            }
        },

        concat: {
            options: {
              separator: ';',
            },
            dist: {
              src: ['<%= themes_css.all %>'],
              dest: '../library/css/style.css',
            },
        },

        // notify cross-OS
        notify: {
            scss: {
                options: {
                    title: 'Grunt, grunt!',
                    message: 'SCSS is all gravy'
                }
            },
            js: {
                options: {
                    title: 'Grunt, grunt!',
                    message: 'JS is all good'
                }
            },
            dist: {
                options: {
                    title: 'Grunt, grunt!',
                    message: 'Theme ready for production'
                }
            }
        },

        clean: {
            dist: {
                src: ['../library/css/','../library/js/','.css_tmp'],
                options: {
                    force: true
                }
            },

            tmp: {
                src: ['.css_tmp'],
                options: {
                    force: true
                }
            },

            images: {
                src: ['../library/images/'],
                options: {
                    force: true
                }
            }
        },

        copyto: {
            dist: {
                files: [
                    {expand: true, src: ['images/**'], dest: '../library/',filter: 'isFile'}
                ]
            }
        },

        // watch for changes
        watch: {

            grunt: {
                files: ['gruntfile.js'],
            },

            scss: {
                files: ['scss/**/*.scss'],
                tasks: [
                    'sass:dev',
                    'concat',
                    'notify:scss'
                ]
            },

            css: {
                files: ['vendor/**/*.css'],
                tasks: [
                    'sass:dev',
                    'concat:dist'
                    ]
            },

            js: {
                files: [
                    '<%= jshint.all %>'
                ],
                tasks: [
                    'jshint',
                    'uglify:dev',
                    'notify:js'
                ]
            },

            php: {
                files: ['../*.php','*.php','../../*.php'],
                tasks: [],
                options: {
                    livereload: true
                }
            },

            img: {
                files: ['images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'],
                tasks: ['copyto'],
            },

            remove: {
                files: ['images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'],
                tasks: ['clean:images', 'copyto'],    // Added copy task after clean
                options: {
                  event: ['deleted']
                }
            },

            livereload: {
                options: {
                  livereload: LIVERELOAD_PORT
                },
                files: [
                  '*.php',
                  '../../*.php',
                  '../library/js/{,*/,*/*/}*.js',
                  '../library/css/{,*/}*.css',
                  'vendor/{,*/}*.css',
                  'scss/**/*.scss',
                  '../library/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

    });

    // Load NPM's via matchdep
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Development task
    grunt.registerTask('default', [
        'jshint',
        'uglify:dev',
        'sass:dev',
        'concat'
    ]);

    // Production task
    grunt.registerTask('dist', function() {
        grunt.task.run([
            'clean:dist',
            'jshint',
            'uglify:dist',
            'sass:dist',
            'autoprefixer',
            'cssmin',
            'clean:tmp',
            //'copyto:dist',
            'notify:dist'

        ]);
    });
};
