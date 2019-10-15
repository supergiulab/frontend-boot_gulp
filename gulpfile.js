const gulp = require("gulp");
const sass = require("gulp-sass");
const del  = require("del");
const bs   = require("browser-sync").create();

const entry = 'assets/css/**/*.scss',
	  dist  = 'dist'

gulp.task('css', function(done){
	gulp.src(entry)
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest(dist))
	.pipe(bs.reload({stream: true}))
	done();
});

gulp.task('clean', function(done) {
	del([dist])
	done();
});

gulp.task('watch', gulp.series('css', function(){
	bs.init({
		server: { baseDir: './' }
	});

	gulp.watch(entry, gulp.series('css'));
	gulp.watch(entry).on('change', bs.reload);
}));