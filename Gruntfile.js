module.exports = function(grunt) {

  // Require it at the top and pass in the grunt instance.
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    availabletasks: {
      tasks: {}
    },
    compass: {
      ofw: {
        options: {
          sassDir: 'sites/all/themes/open_framework/sass',
          cssDir: 'sites/all/themes/open_framework/css',
          environment: 'production',
        }
      }
    },
    drush: {
      ccall: {
        args: ['cc', 'all']
      }
    },
    watch: {
      files: ['**/*.scss'],
      tasks: ['compass:ofw', 'drush:ccall']
    },
    browserSync: {
      bsFiles: {
        src : 'sites/all/themes/open_framework/css/*.css'
      },
      options: {
        watchTask: true,
        reloadDelay: 2000,
        reloadDebounce: 1000,
        proxy: "grunt.dev",
        reloadOnRestart: true,
        browser: ["google chrome", "firefox", "safari"],
        port: 8080,
        logConnections: true,
        injectChanges: false
      },
    }
  });

  // Load Tasks.
  grunt.loadNpmTasks('grunt-available-tasks');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-drush');

  // Register Tasks.
  grunt.registerTask('default',['availabletasks']);

  // OFW compile and clear drush cache.
  grunt.registerTask('ofw',['compass:ofw', 'drush:ccall']);

  // Live reload and sync with browser.
  grunt.registerTask('sync', ['browserSync', 'watch']);

};
