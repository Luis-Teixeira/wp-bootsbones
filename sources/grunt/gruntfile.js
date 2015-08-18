
var LIVERELOAD_PORT = 35729;


module.exports = function(grunt) {

    var path = require('path');

    grunt.initConfig({

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
                '../js/scripts.js'
            ]
        },
        // concat_in_order: {
        //     dist: {
        //       files: {
        //         '../js/tmp/tmp-script.js': ['../js/scripts.js']
        //       },
        //       options: {
        //           extractRequired: function(filepath, filecontent) {
        //               var workingdir = path.normalize(filepath).split(path.sep);
        //               workingdir.pop();

        //               var deps = this.getMatches(/\*\s*@depend\s(.*\.js)/g, filecontent);
        //               deps.forEach(function(dep, i) {
        //                   var dependency = workingdir.concat([dep]);
        //                   deps[i] = path.join.apply(null, dependency);
        //               });
        //               return deps;
        //           },
        //           extractDeclared: function(filepath) {
        //               return [filepath];
        //           },
        //           onlyConcatRequiredFiles: true
        //       }
        //     }
        // },
        // concat and minify our JS
        // uglify: {
        //     dist: {
        //         files: {
        //             '../js/scripts.min.js': [
        //                 '../js/tmp/tmp-script.js'
        //             ]
        //         },
        //     },

        //     dev: {
        //         options: {
        //             beautify: true
        //         },
        //         files: {
        //             '../js/scripts.min.js': [
        //                 '../js/tmp/tmp-script.js'
        //             ]
        //         }
        //     }
        // },

        // compile your sass
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '../css/style.css': '../scss/style.scss',
                    '../css/ie.css': '../scss/ie.scss',
                    '../css/login.css': '../scss/login.scss',
                    '../css/admin.css': '../scss/admin.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '../css/style.css': '../scss/style.scss',
                    '../css/ie.css': '../scss/ie.scss',
                    '../css/login.css': '../scss/login.scss',
                    '../css/admin.css': '../scss/admin.scss'
                }
            }
        },

        // watch for changes
        watch: {
            grunt: {
                files: ['gruntfile.js'],
            },
            scss: {
                files: ['../scss/**/*.scss'],
                tasks: [
                    'sass:dev',
                    'notify:scss'
                ],
                // options: {
                //     livereload: true
                // }
            },
            // php: {
            //     files: ['../*.php','*.php'],
            //     tasks: [],
            //     options: {
            //         livereload: true
            //     }
            // },
            js: {
                files: [
                    '<%= jshint.all %>'
                ],
                tasks: [
                    'jshint',
                    'concat_in_order:dist',
                    'uglify:dev',
                    'notify:js'
                ],
                // options: {
                //     livereload: true
                // }
            },

            livereload: {
                options: {
                  livereload: LIVERELOAD_PORT
                },
                files: [
                  '*.php',
                  '../*.php',
                  '../js/{,*/,*/*/}*.js',
                  '../css/{,*/}*.css',
                  '../images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // check your php
        phpcs: {
            application: {
                dir: '../*.php'
            },
            options: {
                bin: '/usr/bin/phpcs'
            }
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
                src: ['../dist'],
                options: {
                    force: true
                }
            }
        },

        copyto: {
            dist: {
                files: [
                    {cwd: '../', src: ['**/*'], dest: '../dist/'}
                ],
                options: {
                    ignore: [
                        '../dist{,/**/*}',
                        '../doc{,/**/*}',
                        '../grunt{,/**/*}',
                        '../scss{,/**/*}',
                        '../bower_components{,/**/*}',
                        '../bower.json',
                        '../js/theme{,/**/*}',
                        '../js/tmp{,/**/*}',
                        '../js/scripts.js'
                    ]
                }
            }
        }
    });

    // Load NPM's via matchdep
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Development task
    grunt.registerTask('default', [
        'jshint',
        'concat_in_order',
        'uglify:dev',
        'sass:dev'
    ]);

    // Production task
    grunt.registerTask('dist', function() {
        grunt.task.run([
            'jshint',
            'concat_in_order',
            'uglify:dist',
            'sass:dist',
            'clean:dist',
            'copyto:dist',
            'notify:dist'
        ]);
    });

    // Production task
    grunt.registerTask('new', function() {
        grunt.task.run([
           'sass:dev'
        ]);
    });
};
