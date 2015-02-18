var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var del = require('del');

gulp.task('clean', function(cb) {
	del('dist', cb);
});

gulp.task('scripts', function() {
	return gulp.src('src/justifizer.js')
		.pipe($.eslint())
		.pipe($.rename('justifizer.dev.js'))
		.pipe(gulp.dest('dist'))
		.pipe($.replace('__justifizeRatio__', '__jr'))
		.pipe($.uglify())
		.pipe($.rename('justifizer.min.js'))
		.pipe(gulp.dest('dist'))
		.on('error', function(err) {
			console.error(err);
		});
});

gulp.task('default', ['scripts'], function() {
	gulp.watch('src/*.js', ['scripts']);
});