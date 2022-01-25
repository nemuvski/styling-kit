const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss');

gulp.task('build', () => {
  return gulp.src('./scss/**/*.s[ca]ss')
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      postcss([
        require('autoprefixer'),
        require('postcss-nested')
      ])
    )
    .pipe(gulp.dest("./css"))
})

gulp.task('build:watch', () => {
  gulp.watch('./scss/**/*.s[ca]ss', gulp.series('build'))
})
