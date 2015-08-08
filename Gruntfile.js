module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        clean: {
            dist: {
                src: ['dist']
            }
        },
        copy: {
            files: {
                src: ['sites/**/*', 'assets/images/**/*'],
                dest: 'dist/'
            }
        },
        less: {
            all: {
                options: {
                },
                files: [
                    {
                        expand: true,
                        cwd: './',
                        dest: 'dist/',
                        src: ['assets/**/*.less'],
                        ext: '.css'
                    }
                ]
            }
        },
        concat: {
            options: {
                separator: '\n',
            },
            all: {
                src: ['assets/**/*.js'],
                dest: 'dist/assets/js/all.js'
            }
        },
		jshint: {
            all: {
                src: ['assets/**/*.js'],
                options: {
                    bitwise: true,
                    camelcase: true,
                    curly: true,
                    devel:true,
                    eqeqeq: true,
                    forin: true,
                    immed: true,
                    indent: 4,
                    latedef: true,
                    newcap: true,
                    noarg: true,
                    noempty: true,
                    nonew: true,
                    quotmark: 'single',
                    regexp: true,
                    undef: true,
                    unused: true,
                    trailing: true,
                    maxlen: 120
                }
            }
		},
        watch: {
            assets: {
                options: {
                    spawn: false
                },
                files: ['assets/images/**/*', 'assets/js/**/*'],
                tasks: ['copy', 'concat']
            },
            less: {
                options: {
                    spawn: false
                },
                files: ['assets/**/*.less'],
                tasks: ['less']
            },
            html: {
                options: {
                    spawn: true
                },
                files: ['sites/**/*.html'],
                tasks: ['copy']
            },
            jshint: {
                files: ['assets/**/*.js'],
                tasks: ['jshint']
            },
            livereload: {
                options: {
                    livereload: {
                        port: 35729
                    }
                },
                files: ['dist/**/*.css', 'dist/**/*.js', 'dist/**/*.html']
            }
        },
        connect: {
            dev: {
                options: {
                    port: 9002,
                    base: 'dist',
                    keepalive: true,
                    hostname: '*'
                }
            }
        },
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= connect.dev.options.port%>/sites/index.html'
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 6
            },
            watch: ['watch:assets', 'watch:jshint', 'watch:less', 'watch:html', 'watch:livereload', 'connect:dev']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('build', ['clean', 'jshint', 'copy', 'less', 'concat']);
    grunt.registerTask('dev', ['build', 'open', 'concurrent']);
};