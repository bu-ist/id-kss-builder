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
					'demo/src/**/*.hbs',
					'extend/partials/*.hbs',
					'extend/partials/**/*.hbs',
					'extend/*.js'
				],
				tasks: [ 'build' ],
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
					'demo/src/demo.css': 'demo/src/css-dev/demo.scss'

				}
			}
		},
		kss: {
			options: {
				title: 'BU KSS Demo Style Guide',
				builder: 'builder.js',
				css: [
				  "demo.css",
				],
				// js: [
				//   "script.js",
				// ],
				debug: true,
				extend: 'demo/src/extend',
				gitURL: 'https://github.com/bu-ist/id-kss-builder/',
				gitURLCSSDEV: 'https://github.com/bu-ist/id-kss-builder/tree/develop/demo/src/',
				exampleStylesheetURL: 'https://www.bu.edu/wp-content/themes/responsive-framework-2-x/style.min.css',
				themes: [
					{ name: 'BU Today', slug: 'bu-today', classes: 'publication-butoday', hideclass: ['bostonia', 'research'] },
					{ name: 'Bostonia', slug: 'bostonia', classes: 'publication-bostonia', hideclass: ['butoday', 'research'] },
					{ name: 'Research Magazine', slug: 'research', classes: 'publication-research', hideclass: ['butoday', 'bostonia'] },
				]
			},
			dist: {
				src: [
					['demo/src']
				],
				dest: 'demo/_styleguide'
			}
		},
		copy: {
			css: {
				options: {
					mode: true
				},
				src: 'demo/src/demo.css',
				dest: 'demo/_styleguide/demo.css'
			},
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
	grunt.loadNpmTasks( 'grunt-contrib-copy' );

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask( 'styles',   [ 'sass', 'kss', 'copy:css' ] );
	grunt.registerTask( 'build',    [ 'styles', 'kss', 'copy:css' ] );
	grunt.registerTask( 'default',  [ 'kss','browserSync','watch' ] );
};
