const gulp = require('gulp');
const deploy = require('gulp-gh-pages');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const prefix = require('autoprefixer');
const cp = require('child_process');
const postcss = require('gulp-postcss');
const csswring = require('csswring');
const cssnano = require('cssnano');
const del = require('del');

const env = process.env.NODE_ENV || 'prod';
const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', done => {
  browserSync.notify(messages.jekyllBuild);
  if (env === 'prod') {
    return cp.spawn(jekyll, ['build'], { stdio: 'inherit' }).on('close', done);
  } else {
    return cp
      .spawn(jekyll, ['build', '--config', '_config.yml,_config.dev.yml'], {
        stdio: 'inherit'
      })
      .on('close', done);
  }
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], () => browserSync.reload());

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', () => {
  const processors = [
    prefix({ browsers: ['> 5%', 'last 3 versions'] }),
    csswring,
    cssnano
  ];
  return gulp
    .src('_scss/main.scss')
    .pipe(
      sass({
        includePaths: ['scss'],
        onError: browserSync.notify
      })
    )
    .pipe(postcss(processors))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('assets/css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md/js/image/json files, run jekyll & reload BrowserSync
 */
gulp.task('watch', () => {
  gulp.watch('_scss/*.scss', ['sass']);
  gulp.watch(
    [
      './**/*.html',
      '_data/*.json',
      'assets/scripts/*.js',
      'assets/images/*.*',
      './**/*.md'
    ],
    ['jekyll-rebuild']
  );
});

/**
 * Delete .publish directory
 */
gulp.task('clean', () => del('.publish/**/*'));

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 * To run locally:
 * $ NODE_ENV=dev gulp
 */
gulp.task('default', ['browser-sync', 'watch']);

/**
 * Deploy to GitHub Pages
 */
gulp.task('deploy', ['jekyll-build'], () =>
  gulp.src('./_site/**/*').pipe(deploy())
);
