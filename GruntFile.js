module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            // define the files to lint
            files: ['GruntFile.js', 'src/js/cryptolink.js','src/js/gui.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                "undef": true,
                "unused": true,
                "eqeqeq": true,
                "immed": true,
                "latedef": true,
                "newcap": true,
                "noempty": true,
                "nonew": true,
                  // more options here if you want to override JSHint defaults
                globals: {
                    module: true,
                    exports: true,
                    console: true,
                    window: true,
                    document: true,
                    Float32Array: true,
                    Image: true,
                    $: true,
                    CryptoJS: true,
                    LZString: true,
                    setTimeout: true,
                    clearTimeout: true,
                    ace: true,
                    JPEGEncoder: true,
                    FileReader: true,
                    zxcvbn: true,
                }
            }
        },
        concat: {
            options: {
                separator: ';\n\n',
            },
            decoder: {
                src: [
                    'src/js/vendor/modernizr-2.6.2.min.js',
                    'src/js/vendor/jquery-1.10.2.min.js',
                    'src/js/vendor/lz-string-1.3.0.js',
                    'src/js/vendor/core.js',
                    'src/js/vendor/enc-base64.js',
                    'src/js/vendor/enc-utf16.js',
                    'src/js/vendor/aes.js',
                    'src/js/vendor/tmpl.js',
                    'src/js/cryptolink.js',
                ],
                dest: 'src/js/bundles/cryptolink.js',
            },
            gui: {
                src: [
                    'src/js/cryptolink.bundle.js',
                    'src/js/vendor/zxcvbn-async.js',
                    'src/js/vendor/jquery.qrcode-0.6.0.min.js',
                    'src/js/vendor/jpeg.js',
                    'src/js/vendor/fastclick.js',
                    'src/js/gui.js',
                ],
                dest: 'src/js/bundles/cryptolink.gui.js',
            },
        },
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['concat:decoder','concat:gui'],
                options: {
                    spawn: false,
                    debounceDelay: 250,
                }
            }
        },
        nodestatic: {
            server: {
                options: {
                    port: 8080,
                    base: 'src/'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-nodestatic');

    grunt.registerTask('default', ['jshint','concat:decoder','concat:gui','nodestatic','watch']);
};
