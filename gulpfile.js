var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var static2000 = require('static2000');
var del = require('del');
var browserSync = require('browser-sync');

gulp.task('clean', function(cb) {
	del(['*.html', 'js/**/*.js', 'css/**/*.css', 'img'], cb);
});

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
		.pipe($.uglify())
		.pipe(gulp.dest('js'));
});

gulp.task('css', function() {
	return gulp.src('src/css/*.scss')
		.pipe($.sass())
		.pipe($.autoprefixer())
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
	return static2000()
		.pipe(gulp.dest('.'));
});

gulp.task('serve', function(cb) {
	browserSync({
		server: {
			baseDir: '.'
		}
	});
});

gulp.task('default', ['css', 'html', 'js'], function() {
	gulp.watch('src/js/**/*.js', ['js', browserSync.reload]);
	gulp.watch('src/css/**/*.scss', ['css']);
	gulp.watch('src/**/*.jade', ['html', browserSync.reload]);

	browserSync({
		server: {
			baseDir: '.'
		}
	});
});
