const gulp = require("gulp");
const sass = require("gulp-sass");
const del  = require("del");
const bs   = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");

const entry = 'assets/css/**/*.scss',
	  dist  = 'dist';

let sassOpt = {
	errLogToConsole: true,
	outputStyle: "expanded" // "compressed"
}

gulp.task('clean', (done) => {
	del([dist])
	done();
});

gulp.task('css', (done) => {
	gulp.src(entry)
	.pipe(sass(sassOpt).on('error', sass.logError))
	.pipe(gulp.dest(dist))
	.pipe(autoprefixer())
	.pipe(bs.reload({stream: true}))
	done();
});

const out = gulp.series('clean', 'css');
gulp.task('out', out);

gulp.task('watch', gulp.series('css', () => {
	bs.init({
		server: { baseDir: './' }
	});

	gulp.watch(entry, gulp.series('css'));
	gulp.watch([entry, './index.html']).on('change', bs.reload);
}));