var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babel = require('gulp-babel');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('transform', function() {
    return gulp.src('./src/*.js')
        .pipe(babel({
            presets: ["es2015", "react"]
        }))
        .pipe(gulp.dest('public'));
})

gulp.task('js', ['transform'], function() {
    // Assumes a file has been transformed from
    // ./app/src/main.jsx to ./app/dist/main.js
    return browserify('./public/index.js')
    .transform(babelify)
        .bundle()
        .on('error', gutil.log)
        .pipe(source('index.js'))
        .pipe(buffer())
        		.pipe(sourcemaps.init({ loadMaps: true }))
		        .pipe(uglify()) // Use any gulp plugins you want now
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public'))
});

gulp.task('default', ['js'], function() {
    gulp.watch('./src/*.js', ['js']);
});