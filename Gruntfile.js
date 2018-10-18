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
					'node_modules/responsive-foundation/css-dev/**/*.scss',
					'css-dev/**/*.scss',
					'demo/src/css-dev/**/*.scss'
				],
				tasks: [ 'styles' ],
				options: {
					spawn: false
				}
			},
			kss: {
				files: [
					'/demo/src/**/*.hbs'
				],
				tasks: [ 'styles' ],
				options: {
					spawn: false
				}
			},
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
					'node_modules/normalize-scss/sass',
					'node_modules/mathsass/dist/',
					'node_modules/highlight.js/styles/',
					'css-dev/',
					'demo/src/css-dev/'
				],
				bundleExec: true,
			},
			prod: {
				files: {
					'kss-assets/kss.css': 'css-dev/style.scss',
					'demo/src/demo.css': 'demo/src/css-dev/demo.css'

				}
			}
		},
		kss: {
			options: {
				title: 'BU KSS Demo Style Guide',
				builder: 'builder.js',
				css: [
				  "/style.css",
				],
				// js: [
				//   "/script.js",
				// ],
				extend: 'extend',
				gitURL: 'https://github.com/bu-ist/id-kss-builder/',
				gitURLCSSDEV: 'https://github.com/bu-ist/id-kss-builder/tree/master/src',
				exampleStylesheetURL: 'https://www.bu.edu/wp-content/themes/responsive-framework-2-x/style.min.css'
			},
			dist: {
				src: [
					['demo/src']
				],
				dest: 'demo/_styleguide'
			}
		},
		browserSync: {
			bsFiles: {
				src : 'demo/_styleguide/*.html'
			},
			options: {
				watchTask: true,
				server: {
					baseDir: "./demo/_styleguide"
				}
			}
		}
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-kss' );
	grunt.loadNpmTasks( 'grunt-browser-sync' );

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask( 'styles',   [ 'sass', 'kss' ] );
	grunt.registerTask( 'build',    [ 'styles', 'kss' ] );
	grunt.registerTask( 'default',  [ 'kss','browserSync','watch' ] );
};
