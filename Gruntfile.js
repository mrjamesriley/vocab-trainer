module.exports = function(grunt) {

  grunt.initConfig({
    'http-server': {
      'dev': {
        root: '',
        port: 8282,
        host: '0.0.0.0',
        showDir: true
      }
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('server', ['http-server']);

};
