var gulp = require("gulp");
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require("gulp-rename");
var webpack = require('gulp-webpack');
var less = require('gulp-less');
var path = require('path');
var cssmin = require('gulp-cssmin');


gulp.task('css', function() {
    return gulp.src('src/**/*.css')
        .pipe(css2js())
        .pipe(gulp.dest("./src/"));
});

gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('js', function() {
    return gulp.src('./js/src/**/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./'));
});



gulp.task('less', function() {
    return gulp.src('./css/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('./css'));
});