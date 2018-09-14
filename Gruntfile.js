module.exports = function(grunt) {

	// 1. All configuration goes here
	grunt.initConfig({

		// 2. All functions go here.
		watch: {
			grunt: {
				files: [ 'Gruntfile.js' ],
				options: {
					reload: true
				}
			},
			styles: {
				files: [
					'bower_components/responsive-foundation/css-dev/**/*.scss',
					'css-dev/**/*.scss',
				],
				tasks: [ 'styles' ],
				options: {
					spawn: false
				}
			}
		},
		sass: {
			options: {
				outputStyle: 'compressed',
				sourceMap: true,
				indentType: 'space',
				indentWidth: 2,
				precision: '5',
				includePaths: [
					'node_modules/responsive-foundation/css-dev',
					'css-dev/'
				],
				bundleExec: true,
			},
			prod: {
				files: {
					'kss-assets/kss.css': 'css-dev/style.scss',
				}
			}
		},
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-sass' );

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask( 'styles',   [ 'sass' ] );
	grunt.registerTask( 'default',  [ 'watch' ] );
};
