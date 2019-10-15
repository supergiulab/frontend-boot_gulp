const gulp         = require("gulp");
const sass         = require("gulp-sass");
const del          = require("del");
const bs           = require("browser-sync").create();
const concat       = require("gulp-concat");
const rename       = require("gulp-rename");
const uglify       = require("gulp-uglify");
const babel        = require("gulp-babel");
const postcss      = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano      = require("cssnano");

const entryCss = 'assets/css/**/*.scss',
	  entryJs  = 'assets/js/**/*.js',
	  dist     = 'dist';

let sassOpt = {
	errLogToConsole: true,
	outputStyle: "expanded" // "compressed"
}

gulp.task('clean', (done) => {
	del([dist])
	done();
});

gulp.task('css', (done) => {
	gulp.src(entryCss)
	.pipe(sass(sassOpt).on('error', sass.logError))
	.pipe(postcss([ autoprefixer(), cssnano() ]))
	.pipe(gulp.dest(dist))
	.pipe(bs.reload({stream: true}))
	done();
});

gulp.task('css:dev', (done) => {
	gulp.src(entryCss)
		.pipe(sass(sassOpt).on('error', sass.logError))
		.pipe(gulp.dest(dist))
		.pipe(bs.reload({stream: true}))
	done();
});

gulp.task('js', (done) => {
	gulp.src(entryJs)
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(dist))
		.pipe(rename('scripts.min.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest(dist))
	done();
});

gulp.task('watch', gulp.series('css', () => {
	bs.init({
		server: { baseDir: './' }
	});

	gulp.watch(entryCss, gulp.series('css'));
	gulp.watch([entryCss, './index.html']).on('change', bs.reload);
}));

const out = gulp.series('clean', 'css');
gulp.task('out', out);