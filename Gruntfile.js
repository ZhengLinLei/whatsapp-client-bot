module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                report: 'min',
                mangle: true
            },
            js: {
                files: [{
                    expand: true,
                    cwd: './src/',
                    src: '**/*.js',
                    dest: 'dist/',
                    ext : '.min.js',
                }]
            }
        }
    })
}