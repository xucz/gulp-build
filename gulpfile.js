/**
 * Created by xuchaozheng on 2016/11/16.
 */
var minimist = require('minimist');
var gulp = require('gulp');
var options = minimist(process.argv.slice(2));
var isDev = options.env === 'develop' ? true : false;

var build = isDev?require('./gulpfile.dev'):require('./gulpfile.pro');

gulp.task('build', function () {
    build();
});
