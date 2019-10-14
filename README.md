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
