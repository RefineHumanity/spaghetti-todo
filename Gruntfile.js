module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			options: {
				livereload: true,
			},

			scripts: {
			    files: ['**/**/*.js'],
			    tasks: ['jshint'],
			    options: {
			      spawn: true,
			    },
			},

			views: {
				files: ['views/*.ejs', 'views/*.html', 'public/partials/*.html', 'public/stylesheets/*.css'],
			},
		},

		jshint: {
			all: ['Gruntfile.js', '*.js', 'models/*.js', 'public/javascripts/*.js', 'routes/*.js'],
		},
	});

	grunt.registerTask('speak', function() {
		console.log("Speaking.");
	});

	grunt.registerTask('yell', function() {
		console.log("Yelling!");
	});

	grunt.registerTask('both', ['speak', 'yell']);

	grunt.registerTask('default', 'both');

/*Run this task with the grunt watch command.*/
	grunt.loadNpmTasks('grunt-contrib-watch');
/*grunt jshint*/
	grunt.loadNpmTasks('grunt-contrib-jshint');
};