module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'dist/server/v1/user.js': 'server/v1/user.js'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/server/v1/user.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: [''],
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });
                        nodemon.on('config:update', function() {
                            setTimeout(function() {
                                require('open')('http://localhost:3000');
                            }, 1000);
                        });
                        nodemon.on('restart', function() {});
                    }
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-nodemon');
    require('load-grunt-tasks')(grunt);

    // Default task(s).
    grunt.registerTask('default', ['nodemon']);

    grunt.registerTask('install', 'install the backend and frontend dependencies', function() {
        var async = require('async');
        var exec = require('child_process').exec;
        var done = this.async();

        var runCmd = function(item, callback) {
            process.stdout.write('running "' + item + '"...\n');
            var cmd = exec(item);
            cmd.stdout.on('data', function(data) {
                grunt.log.writeln(data);
            });
            cmd.stderr.on('data', function(data) {
                grunt.log.errorlns(data);
            });
            cmd.on('exit', function(code) {
                if (code !== 0) throw new Error(item + ' failed');
                grunt.log.writeln('done\n');
                callback();
            });
        };

        async.series({
                npm: function(callback) {
                    runCmd('npm install', callback);
                }
            },
            function(err, results) {
                if (err) done(false);
                done();
            });
    });

};
