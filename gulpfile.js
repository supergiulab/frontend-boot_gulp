var gulp = require("gulp");
var sass = require("gulp-sass");
var del  = require("del");

var entry = 'assets/css/**/*.scss',
	dist  = 'dist'

gulp.task('css', function(done){
	gulp.src(entry)
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest(dist))
	done();
});

gulp.task('clean', function(done) {
	del([dist])
	done();
});

gulp.task('watch', function() {
	gulp.watch(entry, gulp.series('css'));
});