var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var del = require('del');
var pkg = require('./package.json');

gulp.task('clean', function(cb) {
	del('dist', cb);
});

gulp.task('scripts', function() {
	return gulp.src('src/justifizer.js')
		.pipe($.eslint())
		.pipe($.header('/*! <%= pkg.name %> v<%= pkg.version %> */\n', { pkg: pkg }))
		.pipe($.rename('justifizer.dev.js'))
		.pipe(gulp.dest('dist'))
		.pipe($.replace('__justifizeRatio__', '__jr'))
		.pipe($.uglify({ preserveComments: 'some' }))
		.pipe($.rename('justifizer.min.js'))
		.pipe(gulp.dest('dist'))
		.on('error', function(err) {
			console.error(err);
		});
});

gulp.task('default', ['scripts'], function() {
	gulp.watch('src/*.js', ['scripts']);
});