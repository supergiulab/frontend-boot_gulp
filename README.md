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

## Autoprefixer
install gulp-autoprefixer in project root

`npm i gulp-autoprefixer -D`

in gulpfile.js add autoprefixer

```
const autoprefixer = require('gulp-autoprefixer');
```

in "sass" task add autoprefixer before dest

```
...
let autoprefixOpt = {
	browsers: ['last 2 versions', '> 5%', 'FIrefox ESR']
}
...

...
.pipe(autoprefixer(autoprefixOpt))
...
```

