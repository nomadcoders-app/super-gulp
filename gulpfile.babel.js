import gulp from 'gulp';
import gpug from 'gulp-pug';
import webserver from 'gulp-webserver';
import del from 'del';

const clean = () => del('dist');

const pug = () => gulp.src('src/*.pug').pipe(gpug()).pipe(gulp.dest('dist'));

const ws = () => gulp.src('dist').pipe(webserver({ livereload: true }));

const watch = () => gulp.watch('src/**/*.pug', pug);

export const dev = gulp.series(
  gulp.parallel(clean),
  gulp.parallel(pug),
  gulp.parallel(ws, watch),
);
