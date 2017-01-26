var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');

gulp.task('connect', function() {
        connect.server({
                root: 'dist/',
                livereload: true
        });
});

gulp.task('html', function buildHTML() {
        return gulp.src('src/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('html:watch', function() {
        gulp.watch('src/*.pug', ['html'])
});

gulp.task('img', function() {
        gulp.src('src/images/*.{jpeg,jpg,gif,ico,png}')
        .pipe(gulp.dest('dist/img/'))
});

gulp.task('img:watch', function() {
        gulp.watch('src/images/*.{jpeg,jpg,gif,ico,png}' ['img']);
});

gulp.task('sass', function() {
        gulp.src('src/styles/**.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(connect.reload());
});

gulp.task('sass:watch', function() {
        gulp.watch('src/styles/**.scss', ['sass']);
});

gulp.task('js', function() {
        gulp.src('src/scripts/**.js')
        .pipe(gulp.dest('dist/scripts/'))
});

gulp.task('js:watch', function() {
        gulp.watch('src/scripts/**.js', ['js']);
});

gulp.task('build', ['sass', 'img', 'js', 'html']);

gulp.task('dev', ['html:watch', 'sass:watch', 'img:watch', 'js:watch', 'connect']);
