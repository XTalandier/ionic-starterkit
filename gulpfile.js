var gulp = require('gulp'),
  seq = require('run-sequence'),
  connect = require('gulp-connect'),
  less = require('gulp-less'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  cssmin = require('gulp-cssmin'),
  order = require('gulp-order'),
  concat = require('gulp-concat'),
  ignore = require('gulp-ignore'),
  rimraf = require('gulp-rimraf'),
  templateCache = require('gulp-angular-templatecache'),
  mobilizer = require('gulp-mobilizer'),
  ngAnnotate = require('gulp-ng-annotate'),
  replace = require('gulp-replace'),
  ngFilesort = require('gulp-angular-filesort'),
  streamqueue = require('streamqueue'),
  rename = require('gulp-rename'),
  path = require('path');

var config = {
    dest: 'www',
    cordova: true,
    js: {
      libs: [
        //'./bower_components/angular/angular.js',
        './bower_components/ionic/js/ionic.bundle.js',
        './bower_components/ngCordova/dist/ng-cordova.min.js',
        './bower_components/angular-animate/angular-animate.js',
        './bower_components/angular-sanitize/angular-sanitize.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js'
      ]
    },
    css: {
      libs: [
        './bower_components/ionic/css/ionic.min.css'
      ]
    }
  }
  ;

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});


gulp.task('clean', function (cb) {
  return gulp.src([
    path.join(config.dest, 'index.html'),
    path.join(config.dest, 'images'),
    path.join(config.dest, 'css'),
    path.join(config.dest, 'js'),
  ], {read: false})
    .pipe(rimraf());
});

gulp.task('images', function () {
  var stream = gulp.src('app/images/**/*');
  return stream.pipe(gulp.dest(path.join(config.dest, 'images')));
});

gulp.task('fonts', function () {
  var stream = gulp.src('app/fonts/**');
  return stream.pipe(gulp.dest(path.join(config.dest, 'fonts')));
});

gulp.task('html', function () {
  var inject = [];
  gulp.src(['./app/templates/*.html', './app/html/**/*.html'])
    .pipe(replace('<!-- inject:js -->', inject.join('\n    ')))
    .pipe(gulp.dest(config.dest));
});

gulp.task('less', function (done) {
  gulp.src(['./app/less/app.less'])
    .pipe(less({
      paths: [path.resolve(__dirname, 'src/less'), path.resolve(__dirname, 'bower_components')]
    }))
    .pipe(mobilizer('app.css', {
      'app.css': {
        hover: 'exclude',
        screens: ['0px']
      },
      'hover.css': {
        hover: 'only',
        screens: ['0px']
      }
    }))
    //.pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.join(config.dest, 'css')));
  seq('css', done);

});

gulp.task('css', function () {
  gulp.src(config.css.libs)
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest(path.join(config.dest, 'css')));

});

gulp.task('js', function () {
  streamqueue({objectMode: true},
    gulp.src('./app/js/**/*.js').pipe(ngFilesort()),
    gulp.src(['app/templates/**/*.html']).pipe(templateCache({module: 'starter'}))
  )
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    //.pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dest, 'js')));
});

gulp.task('bowercomponents', function () {
  streamqueue({objectMode: true},
    gulp.src(config.js.libs)
  )
    .pipe(sourcemaps.init())
    .pipe(concat('vendors.js'))
    .pipe(ngAnnotate())
    //.pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dest, 'js')));
});

gulp.task('watch', function () {
  gulp.watch(['./app/html/**/*', './app/js/**/*.html', './app/templates/*.html'], ['html']);
  gulp.watch(['./app/less/**/*'], ['less']);
  gulp.watch(['./app/js/**/*.js', './app/templates/*.html'], ['js']);
  gulp.watch(['./app/images/**/*'], ['images']);
});


gulp.task('build', function (done) {
  var tasks = ['html', 'images', 'less', 'js', 'bowercomponents', 'fonts'];
  seq('clean', tasks, done);
});


gulp.task('default', function (done) {
  var tasks = [];

  seq('build', done);
});












