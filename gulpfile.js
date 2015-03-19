var gulp = require('gulp');

gulp.task('build.copy', function() {
  gulp.src('src/javascripts/*.js')
    .pipe(gulp.dest('public/javascripts'));
  gulp.src('src/*.html')
    .pipe(gulp.dest('public'));
  gulp.src('src/stylesheets/*.css')
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('build', function() {
  gulp.run('build.copy');
})
