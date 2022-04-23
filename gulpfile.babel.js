import gulp from 'gulp';
import gPug from 'gulp-pug';
import webserver from 'gulp-webserver';
import gImage from 'gulp-image';
import del from 'del';

const clean = () => del('dist');

const pug = () => gulp.src('src/*.pug').pipe(gPug()).pipe(gulp.dest('dist'));

const img = () => gulp.src('src/img/*').pipe(gImage()).pipe(gulp.dest('dist/img'));

const ws = () => gulp.src('dist').pipe(webserver({ livereload: true }));

const watch = () => gulp.watch('src/**/*.pug', pug);

export const dev = gulp.series(
  gulp.parallel(clean),
  gulp.parallel(pug, img),
  gulp.parallel(ws, watch),
);
