# Gulp Setup

## Install Gulp
install gulp in project folder

`$ npm i gulp -D`

*check folder permissions*

### Setup gulpfile.js
create gulpfile.js in project root

`touch gulpfile.js`

require gulp and set the default task

```
var gulp = require('gulp');

gulp.task('default', function(){
	console.log("GULP!");
});
```

## Compile SASS/SCSS
install gulp-sass in project folder

`$ npm i gulp-sass -D`

### Setup styles task
in gulpfile.js add a task for styles

first set input and output dir
```
var entry = 'assets/css/**/*.scss',
	dist  = 'dist';
```

add styles task
```
gulp.task('css', function(){
	gulp.src(entry)
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest(dist))
});
```

## Setup clean task
install del in project folder

`$ npm i del -D`

create the task in gulp file

```
gulp.task('clean', function(done) {
	del([dist])
	done();
});
```

## Setup watch task
in gulpfile.js

```
gulp.task('watch', function() {
	gulp.watch(entry, gulp.series('css'));
});
```

## Browser Sync
install browser-sync in project root

`npm i browser-sync -D`

in gulpfile.js add browser-sync and attach it to watch task

```
const browserSync = require("browser-sync").create();

gulp.task('watch', gulp.series('css', function(){
	bs.init({
		server: { baseDir: './' }
	});

	gulp.watch(entry, gulp.series('css'));
	gulp.watch(entry).on('change', bs.reload);
}));
```

## Autoprefixer + Cssnano
install postcss, autoprefixer, cssnano

`npm i postcss autoprefix cssnano -D`

in gulpfile.js pipe postcss and pass autoprefixer e cssnano instances

```
...
.pipe(postcss([ autoprefixer(), cssnano() ]))
...
```

to define autoprefixer supported browsers add browserslist parameter to package.json

```
"browserslist": [
	"last 2 version",
	"> 1%",
	"IE 10",
	"IE 9"
]
```

## Concatenate and minify Javascript
install dependencies in project root

`npm i gulp-concat gulp-rename gulp-uglify -D`

in gulpfile.js require dependencies and add "script" task

```
const concat = require("gulp-cocat");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

gulp.task('js', (done) => {

});
```

## Compile ES6
install dependencies in project root

`npm i @babel/core @babel/preset-env gulp-babel -D`

require dependencies

`const babel = require("gulp-babel");`

pipe babel

```
...
.pipe(babel({
	presets: [
		['@babel/env', { modules: false }]
	]
}))
...
```