var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var sass = require('gulp-sass');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

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

gulp.task('autoprefix', function () {
    return gulp.src('dist/styles/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/styles/'));
});

gulp.task('usemin', ['autoprefix'], function () {
  return gulp.src('./*.html')
      .pipe(usemin({
        css: [minifyCss(), 'concat'],
        js: [uglify()]
      }))
      .pipe(gulp.dest('build/'));
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("sass/**/*.scss", ['styles']);
  gulp.watch("*.html", ['bs-reload']);
  gulp.watch("dist/scripts/*.js", ['bs-reload']);
});