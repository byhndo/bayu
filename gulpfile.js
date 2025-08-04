const gulp = require('gulp');
const obfuscator = require('gulp-javascript-obfuscator');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

gulp.task('js', () => {
  return gulp.src([
    'js/bio.js',
    'js/photos.js',
    'js/router.js',
    'js/app.js'
  ])
  .pipe(obfuscator({ compact: true }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('html', () => {
  return gulp.src('index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', gulp.parallel('js', 'html', 'css'));
