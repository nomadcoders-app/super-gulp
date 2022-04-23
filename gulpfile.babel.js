import gulp from 'gulp';
import gpug from 'gulp-pug';
import del from 'del';

const clean = () => del('dist');

const pug = () => gulp.src('src/*.pug').pipe(gpug()).pipe(gulp.dest('dist'));

const prepare = gulp.series(clean);

const compile = gulp.series(pug);

export const dev = gulp.series(prepare, compile);
