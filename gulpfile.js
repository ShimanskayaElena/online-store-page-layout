'use strict';

var gulp = require('gulp');

var browserSync = require('browser-sync').create();  

var sourcemaps = require('gulp-sourcemaps');

var concatCss = require('gulp-concat-css');

var minifyCss = require('gulp-minify-css'); 

var rename = require("gulp-rename"); 

var notify = require("gulp-notify");

var autoprefixer = require('gulp-autoprefixer');

var debug = require('gulp-debug');

gulp.task('html', function () {
  return gulp.src('src/index.html')
  .pipe(debug({title: 'debug:html src'}))
  .pipe(gulp.dest('build/'))
  .pipe(notify("Done HTML!")); 
});

gulp.task('css', function () {
  return gulp.src(['src/css/bower_components/normalize-css/normalize.css', 'src/css/font-awesome-4.6.3/css/font-awesome.min.css', 'src/css/fonts.css', 'src/css/index.css', 'src/css/header.css', 'src/css/content-wrapper.css', 'src/css/right-column.css', 'src/css/portfolio.css', 'src/css/left-column.css', 'src/css/footer.css'])
    .pipe(sourcemaps.init())
    .pipe(debug({title: 'debug:css src'}))
    .pipe(concatCss("index.css"))
    .pipe(debug({title: 'debug:css concat'}))
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(minifyCss())
    .pipe(rename('index.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css/'))
    .pipe(notify("Done CSS!"));
});

gulp.task('watcher', function () {
    gulp.watch(['src/index.html'], ['html']); 
    gulp.watch(['src/css/*.css'], ['css']); 
});

gulp.task('browser-sync',  function() {
    browserSync.init({
        server: 'build'
    });
    browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});
    
gulp.task('default', [ 'browser-sync', 'watcher']);