var gulp = require('gulp');
var browserify = require('browserify');
var source = require("vinyl-source-stream");
var reactify = require('reactify');

gulp.task('build.copy', function() {
  gulp.src('src/javascripts/*.js')
    .pipe(gulp.dest('public/javascripts'));
  gulp.src('src/*.html')
    .pipe(gulp.dest('public'));
  gulp.src('src/stylesheets/*.css')
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('browserify', function(){
  var b = browserify({
    entries: ['./src/javascripts/hello.jsx'],
    transform: [reactify]
  });
  return b.bundle()
    .pipe(source('hello.js'))
    .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('build', function() {
  gulp.run('build.copy');
  gulp.run('browserify');
})

gulp.task('run', function() {
  gulp.run('build');
  var exec = require("child_process").exec
  exec('json-server db.json')
});
