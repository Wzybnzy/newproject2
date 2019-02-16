var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel'); // 7.0.1 8.0.0
var server = require('gulp-webserver');


gulp.task('devSass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./src/css/'));
});


gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', gulp.series('devSass'));
    gulp.watch('./src/js/*.js', gulp.series('devJs'));
});


gulp.task('devJs', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./src/js/'));
});


gulp.task('server', function() {
    return gulp.src('./src/')
        .pipe(server({
            port: 9898,
            open: true,
            livereload: true
        }));
});


gulp.task('dev', gulp.series('devSass', 'devJs', 'server', 'watch'));

//线上环境
gulp.task('uglify', function() {
    return gulp.src('./src/js/all.js')
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'));

});


gulp.task('build', gulp.parallel('minCss', 'minJs'));