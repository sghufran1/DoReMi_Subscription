// eslint-disable-next-line no-undef
const gulp = require('gulp');
// eslint-disable-next-line no-undef
const fs = require('fs');
// eslint-disable-next-line no-undef
const ts = require('gulp-typescript');
// eslint-disable-next-line no-undef
const util = require('util');
// eslint-disable-next-line no-undef
const exec = util.promisify(require('child_process').exec);
// eslint-disable-next-line no-undef
const del = require('del');
const tsProject = ts.createProject('tsconfig.json', {
  target: 'es6',
});

// eslint-disable-next-line no-undef
const moment = require('moment');
// eslint-disable-next-line no-undef
const nodemon = require('gulp-nodemon');

gulp.task('cleanDist', function() {
  return del(['dist']);
});

gulp.task('build', () => {
  const tsResult = tsProject
    .src()
    .pipe(tsProject())
    // eslint-disable-next-line no-undef
    .on('error', () => process.exit(1));
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('copyPackageLock', () => {
  return gulp.src('package-lock.json').pipe(gulp.dest('dist'));
});

gulp.task('copyPackageJson', () => {
    return gulp.src('package.json').pipe(gulp.dest('dist'));
  });

gulp.task('copyInputFiles', () => {
    return gulp.src('src/Inputs/*').pipe(gulp.dest('dist/Inputs'));
  });

gulp.task(
  'duplicatedFiles',
  gulp.series(
    'copyPackageJson',
    'copyPackageLock',
    'copyInputFiles'
  ),
);

gulp.task('start', (done) => {
  console.log('Application started');
  done();
});

gulp.task('build', gulp.series('cleanDist', 'build', 'duplicatedFiles'));

gulp.task('dev', gulp.series('duplicatedFiles', 'build', 'start'));
