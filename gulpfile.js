const gulp = require('gulp');
const obfuscator = require('gulp-javascript-obfuscator');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');

gulp.task('js', () => {
  return gulp.src('js/*.js')
    .pipe(obfuscator({ compact: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('html', () => {
  return gulp.src('index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.parallel('js', 'html'));
