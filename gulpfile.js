const gulp = require('gulp');
const clip = require('gulp-clip-empty-files');
const sass = require('gulp-sass')(require('sass'));
const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');

function optSvg(done) {
  gulp
    .src('./assets/*.orig.svg', { allowEmpty: true })
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [{ removeViewBox: false }],
        }),
      ])
    )
    .pipe(rename((filepath) => {
      // e.g. path={ dirname: '.', basename: 'sample.orig', extname: '.svg' }
      return {
        dirname: filepath.dirname,
        // 末尾の.origを除く
        basename: filepath.basename.replace(/\.orig$/, ''),
        extname: filepath.extname,
      }
    }))
    .pipe(gulp.dest('./assets'));
  done();
}

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

exports.optSvg = optSvg;
exports.buildSass = buildSass;
exports.watchSass = watchSass;
