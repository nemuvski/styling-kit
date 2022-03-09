const gulp = require('gulp');
const clip = require('gulp-clip-empty-files');
const sass = require('gulp-sass')(require('sass'));
const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');

function buildSass(done) {
  gulp
    .src('./scss/**/*.s[ca]ss')
    .pipe(
      stylelint({
        failAfterError: false,
        reporters: [{ formatter: 'string', console: true }],
      })
    )
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([require('autoprefixer')({ grid: 'autoplace' }), require('postcss-nested')]))
    .pipe(clip())
    .pipe(gulp.dest('./css'));

  done();
}

function watchSass() {
  gulp.watch('./scss/**/*.s[ca]ss', gulp.series('buildSass'));
}

exports.buildSass = buildSass;
exports.watchSass = watchSass;
