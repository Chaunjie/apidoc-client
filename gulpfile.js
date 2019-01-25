var gulp = require('gulp');
var sh = require('shelljs');
var uglify = require('gulp-uglify');

gulp.task('deploy-serve', function (done) {
  var path = '/Users/xuchengjie/vue/apidoc/lib/*';
  var serverPath = '/var/www/apidoc/serve/lib';

  var command = 'scp -r ' + path + ' ssh chaunjie:' + serverPath;
  sh.exec(command, function () {
    done();
  })
})

gulp.task('deploy-client', function (done) {
  var path = '/Users/xuchengjie/vue/apidoc-client/dist/*';
  var serverPath = '/var/www/apidoc/web';

  var command = 'scp -r ' + path + ' ssh chaunjie:' + serverPath;
  sh.exec(command, function () {
    done();
  })
})

gulp.task('default', ['deploy-client', 'deploy-serve'], function () {
    console.log('发布成功');
})

gulp.task('build', function (done) {
  sh.exec(`npm run build`, function () {
    console.log('build success')
    return gulp.src('dist/js/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'));
    // done()
  })
})