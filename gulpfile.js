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

gulp.task('build.react', function(){
  var b = browserify({
    entries: ['./src/javascripts/main.js'],
    transform: [reactify]
  });
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('build', ['build.copy','build.react']);

gulp.task('json-server', function() {
  var jsonServer = require('json-server')
  var object = require('./db.json');

  var router = jsonServer.router(object) // Express router
  var server = jsonServer.create()       // Express server
  var port = 3000;
  server.use(router)
  server.listen(port)
  console.log('json-server is ready at port:' +  port)
})

gulp.task('run', ['build', 'json-server']);
