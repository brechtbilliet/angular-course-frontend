(function() {
	'use strict';
	var gulp = require('gulp'),
		concat = require('gulp-concat'),
		sourcemaps = require('gulp-sourcemaps'),
		templateCache = require('gulp-angular-templatecache'),
		connect = require('gulp-connect'),
		gOpen = require('gulp-open'),
		del = require('del'),
		Q = require('Q'),
		cssMinify = require('gulp-minify-css'),
		uglify = require('gulp-uglify'),
		util = require('gulp-util'),
		uncache = require('gulp-uncache'),
		runSequence = require('run-sequence');
	util.log('gulp task');
	var jsDependencies = [
			'bower_components/jquery/dist/jquery.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/bootstrap/dist/js/bootstrap.js',
			'bower_components/lodash/lodash.js',
			'bower_components/angular-spinner/angular-spinner.js',
			'bower_components/toastr/toastr.js'
		],
		cssDependencies = [
			'bower_components/bootstrap/dist/css/bootstrap.css',
			'bower_components/toastr/toastr.css',
			'bower_components/font-awesome/css/font-awesome.css'
		];

	gulp.task('html', function() {
		return gulp.src('app/**/*.html')
			.pipe(templateCache({
				module: 'app',
				root: 'app/'
			}))
			.pipe(concat('scripts.js'))
			.pipe(gulp.dest('dev'));
	});

	gulp.task('compile-javascript', ['html'], function() {
		return gulp.src(jsDependencies.concat(['app/**/*.js', 'dev/scripts.js']))
			.pipe(sourcemaps.init())
			.pipe(concat('scripts.js'))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('dev'))
	});

	gulp.task('compile-css', function() {
		return gulp.src(cssDependencies.concat(['style/screen.css']))
			.pipe(sourcemaps.init())
			.pipe(concat('screen.css'))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('dev'))
	});
	gulp.task('uncache-index', function() {
		return gulp.src(['index.html', 'config.json'])
			.pipe(uncache({
				append: 'time'
			}))
			.pipe(gulp.dest('dev'))
			.pipe(connect.reload());
	});

	gulp.task('copy-fonts', function() {
		return gulp.src('bower_components/font-awesome/fonts/*.*')
			.pipe(gulp.dest('dev/fonts'));
	});
	gulp.task('copy-modernizr', function() {
		return gulp.src('bower_components/modernizr/modernizr.js')
			.pipe(gulp.dest('dev'));
	});

	gulp.task('clear-dev', function() {
		var deferred = Q.defer();
		del(['dev/**/*.*', 'dev/fonts', 'dev/test'], function() {
			deferred.resolve();
		});
		return deferred.promise;
	});


	/* interaction */
	gulp.task('start-server', function() {
		connect.server({
			livereload: true,
			root: 'dev'
		});
	});

	gulp.task('watch-changes', function() {
		gulp.watch(['app/*.js', 'app/**/*.js'], function() {
			runSequence('compile-javascript', 'uncache-index');
		});
		gulp.watch('app/**/*.html', function() {
			runSequence('compile-javascript', 'uncache-index');
		});
		gulp.watch('style/screen.scss', function() {
			runSequence('compile-css', 'uncache-index');
		});
		gulp.watch('index.html', function() {
			runSequence('uncache-index');
		});
	});
gulp.task('open-browser', function() {
	var options = {
		url: 'http://localhost:8080'
	};
	return gulp.src('./index.html')
		.pipe(gOpen('', options));
});

gulp.task('default', function() {
	runSequence('clear-dev', 'compile-javascript',
		'compile-css', 'uncache-index', 'copy-fonts',
		function() {
			gulp.run('start-server');
			gulp.run('watch-changes');
			gulp.run('open-browser');
		});
});
}());