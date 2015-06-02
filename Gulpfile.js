var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('styles', function(){
  gulp.src(['sass/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('default', ['browser-sync'], function(){
  gulp.watch("sass/**/*.scss", ['styles']);
  gulp.watch("*.html", ['bs-reload']);
  gulp.watch("scripts.js", ['bs-reload']);
});