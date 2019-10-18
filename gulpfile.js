const gulp         = require("gulp");
const sass         = require("gulp-sass");
const del          = require("del");
const bs           = require("browser-sync").create();
const concat       = require("gulp-concat");
const rename       = require("gulp-rename");
const uglify       = require("gulp-uglify");
const browserify   = require("browserify");
const babelify     = require("babelify");
const source       = require("vinyl-source-stream");
const buffer       = require("vinyl-buffer");
const sourcemaps   = require("gulp-sourcemaps");
const postcss      = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano      = require("cssnano");

const entryCss   = 'assets/css/**/*.scss',
	  entryJsDir = 'assets/js/',
	  entryJs    = 'app.js',
	  entryJsW   = 'assets/js/**/*.js',
	  dist       = 'dist';

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
	.pipe( sourcemaps.init({ loadMaps: true }) )
	.pipe(postcss([ autoprefixer(), cssnano() ]))
	.pipe( sourcemaps.write( './' ) )
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
	return browserify({
		entries: [entryJsDir + entryJs]
	})
	.transform( babelify, { presets: ['@babel/preset-env'] } )
	.bundle()
	.pipe( source( entryJs ) )
	.pipe( rename({ extname: '.min.js' }) )
	.pipe( buffer() )
	.pipe( sourcemaps.init({ loadMaps: true }) )
	.pipe( uglify() )
	.pipe( sourcemaps.write( './' ) )
	.pipe( gulp.dest(dist) )
	done();
});

gulp.task('js:dev', (done) => {
	return browserify({
		entries: [entryJsDir + entryJs]
	})
	.transform( babelify, { presets: ['@babel/preset-env'] } )
	.bundle()
	.pipe( source( entryJs ) )
	.pipe( rename({ extname: '.min.js' }) )
	.pipe( buffer() )
	.pipe( sourcemaps.init({ loadMaps: true }) )
	.pipe( sourcemaps.write( './' ) )
	.pipe( gulp.dest(dist) )
	done();
});

gulp.task('watch', gulp.series('css', 'js', () => {
	bs.init({
		server: { baseDir: './' }
	});

	gulp.watch(entryCss, gulp.series('css'));
	gulp.watch(entryJsW, gulp.series('js'));
	gulp.watch([entryJsDir, entryCss, './index.html']).on('change', bs.reload);
}));

gulp.task('default', gulp.series('clean', 'css:dev', 'js:dev', 'watch'));