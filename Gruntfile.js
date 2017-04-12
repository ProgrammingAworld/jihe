/**
 * Created by jason on 16/2/3.
 */


module.exports = function(grunt) {

    var webpack = require("webpack"),
        grunt = require("grunt"),
        lodash = require("lodash");
    // Project configuration.
    grunt.initConfig({
        less: {
            dev: {
                files: {
                    "public/stylesheets/main.css": "src/less/main.less"
                }
            },
            production: {
                files: {
                    "public/stylesheets/main.css": "src/less/main.less"
                },
                plugins: [
                    new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                    new (require('less-plugin-clean-css'))({advanced: true})
                ],
                options: {
                    compress: true
                }
            }
        },
        watch: {
            less: {
                files: ["src/less/**/*.less", "src/less/**/*.css"],
                tasks: ["less:dev", "copy:production"],
                options: {
                    nospawn: true
                }
            }
        },
        webpack: {
            dev: {
                entry: {
                    index: ['babel-polyfill', 'whatwg-fetch', './src/js/views/index.jsx']
                },
                output: {
                    path: __dirname + '/public/javascripts/local',
                    filename: '[name].js'
                },
                externals: {
                    "lodash": "_"
                },
                module: {
                    loaders: [{
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015', 'react', 'stage-2', 'stage-3']
                        }
                    }]
                },
                watch: true,
                keepalive: true
            },
            production: {
                entry: {
                    index: ['babel-polyfill', 'whatwg-fetch', './src/js/views/index.jsx']
                },
                output: {
                    path: __dirname + '/public/javascripts/local',
                    filename: '[name].js'
                },
                externals: {
                    "lodash": "_"
                },
                module: {
                    loaders: [{
                        test: /.jsx?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015', 'react', 'stage-2', 'stage-3']
                        }
                    }]
                },
                plugins:[
                    new webpack.DefinePlugin({
                        'process.env':{
                            'NODE_ENV': JSON.stringify('production')
                        }
                    })
                ]
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            production: {
                files: {
                    'public/javascripts/local/index.js': ['public/javascripts/local/index.js']
                }
            }
        },
        exec: {
            devjs: {
                command: 'grunt webpack:dev --force'
            },
            clearNpm: {
                command: 'rm -rf node_modules/fenbeitong-jslib'
            },
            updateNpm: {
                command: 'npm update'
            },
            start: {
                command: 'nodemon bin/www'
            }
        },
        copy: {
            production: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/images',
                        src: ['**'],
                        dest: 'public/images'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('devjs', ["webpack:dev"]);
    grunt.registerTask('devcss', ["watch"]);
    grunt.registerTask('product', ["less:production", "webpack:production", "uglify:production", "copy:production"]);
    grunt.registerTask('update', ["exec:clearNpm", "exec:updateNpm"]);
    grunt.registerTask('start', ["exec:start"]);

    // Default task(s).
    grunt.registerTask('default', ['update', 'product']);

};