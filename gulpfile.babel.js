import gulp from 'gulp';
import pug from 'gulp-pug';
import webserver from 'gulp-webserver';
import del from 'del';
import image from 'gulp-image';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import browserify from 'gulp-bro';
import babelify from 'babelify';

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

const js = () =>
  gulp
    .src('src/js/main.js')
    .pipe(
      browserify({
        debug: process.env.NODE_ENV === 'development',
        transform: [
          babelify.configure({ presets: ['@babel/preset-env'] }),
          ['uglifyify', { global: true }],
        ],
      }),
    )
    .pipe(gulp.dest('dist/js'));

const ws = () => gulp.src('dist').pipe(webserver({ livereload: true }));

const watch = () => {
  gulp.watch('src/**/*.pug', html);
  gulp.watch('src/**/*.scss', css);
  gulp.watch('src/**/*.js', js);
};

export const dev = gulp.series(
  gulp.parallel(clean),
  gulp.parallel(html, css, js, img),
  gulp.parallel(ws, watch),
);
