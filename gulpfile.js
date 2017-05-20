const gulp = require('gulp');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');

gulp.task('default', ['minify-js', 'minify-css']);

gulp.task('minify-js', function() {
  gulp.src('src/*.js')
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(minify({
      ext: {
        src: '-debug.js',
        min: '.js',
      },
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function () {
  return gulp.src('src/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist'));
});
