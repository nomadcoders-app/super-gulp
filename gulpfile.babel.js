import gulp from 'gulp';
import pug from 'gulp-pug';
import webserver from 'gulp-webserver';
import del from 'del';
import image from 'gulp-image';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';

const sass = gulpSass(dartSass);

const clean = () => del('dist');

const html = () => gulp.src('src/index.pug').pipe(pug()).pipe(gulp.dest('dist'));

const img = () => gulp.src('src/img/*').pipe(image()).pipe(gulp.dest('dist/img'));

const css = () =>
  gulp
    .src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('dist/css'));

const ws = () => gulp.src('dist').pipe(webserver({ livereload: true }));

const watch = () => {
  gulp.watch('src/**/*.pug', html);
  gulp.watch('src/**/*.scss', css);
};

export const dev = gulp.series(
  gulp.parallel(clean),
  gulp.parallel(html, css, img),
  gulp.parallel(ws, watch),
);
