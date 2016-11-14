/**
 * Created by xuchaozheng on 2016/11/10.
 */
'use strict';
var gulp = require('gulp');
require('shelljs/global');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var stylus = require('gulp-stylus');
var gulpsync = require('gulp-sync')(gulp);
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var fs = require('fs-extra');
var Promise = require("bluebird");
var copy = require('gulp-copy');
var notify = require("gulp-notify");
//var glob = require("glob");
var minimist = require('minimist');
var gulpif = require('gulp-if');
var tar = require('tar-fs');
var moment = require('moment');

var options = minimist(process.argv.slice(2));
var isProduct = options.env === 'production' ? true : false;
var buildPath = isProduct ? 'build/public':'public';

gulp.task('build:js', function () {
   return gulp.src(['./client/js/**/*.js'])
            //.pipe(notify("Found file: <%= file.relative %>!"))
            .pipe(gulpif(isProduct, jshint()))
            .pipe(gulpif(isProduct, uglify()))
            //.pipe(rename('abc.js'))
            .pipe(gulpif(isProduct, rev()))
            .pipe(gulp.dest(buildPath + '/js'))
            .pipe(gulpif(isProduct, rev.manifest('rev-manifest.js.json',{
               merge: true
            })))
            .pipe(gulpif(isProduct, gulp.dest('./rev')));
});
gulp.task('build:lib', function () {
    return gulp.src('./client/lib/*.js')
        .pipe(gulpif(isProduct, uglify()))
        .pipe(gulp.dest(buildPath + '/lib'));
});
gulp.task('build:clean', function () {
    return gulp.src(['./build','./rev'])
        .pipe(clean());
});
gulp.task('dev:clean', function () {
    return gulp.src(['./public'])
        .pipe(clean());
});
gulp.task('build:css', function () {
    return gulp.src('./client/**/*.styl')
            //.pipe(notify("Found file: <%= file.relative %>!"))
            .pipe(stylus())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulpif(isProduct, rev()))
            .pipe(gulp.dest(buildPath))
            .pipe(gulpif(isProduct, rev.manifest('rev-manifest.css.json',{
                merge: true
            })))
            .pipe(gulpif(isProduct, gulp.dest('./rev')));
});
gulp.task('build:img', function () {
    return gulp.src('./client/**/*.png')
            .pipe(gulpif(isProduct, imagemin()))
            .pipe(gulpif(isProduct, rev()))
            .pipe(gulp.dest(buildPath))
            .pipe(gulpif(isProduct, rev.manifest('rev-manifest.img.json',{
                merge: true
            })))
            .pipe(gulpif(isProduct, gulp.dest('./rev')));
});
gulp.task('build:html', function () {
    return gulp.src('client/page/*.html')
        .pipe(gulpif(isProduct, htmlmin(
            {
                collapseWhitespace: true
            }
        )))
        .pipe(gulp.dest(buildPath));
});
gulp.task('rev', function() {
    return gulp.src(['./rev/*.json', './'+buildPath+'/**/*.html','./'+buildPath+'/**/*.css','./'+buildPath+'/**/*.js'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(buildPath));
});
gulp.task('cp:serve', function () {
    //console.log('cp')
    //cp('-R', ['node_modules','server.js'], 'build');

    return gulp.src(['server.js'])
        .pipe(copy('./build'));
});
gulp.task('cp:node_modules', function () {
    return Promise.promisify(fs.copy)('./node_modules', './build/node_modules');
});
gulp.task('tar:files', function () {
    var now = moment();
    var fileName = now.format("YYYY-MM-DD-hh-mm-ss");
    return tar.pack('./build').pipe(fs.createWriteStream('release/'+fileName+'.tar'));
});
gulp.task('build', function () {
    var buildList = ['build:html','build:js', 'build:css','build:img','build:lib'];
    if(isProduct) {
        gulp.run(gulpsync.sync(['build:clean', buildList, 'rev', 'cp:serve','tar:files']));
    } else {
        gulp.run(gulpsync.sync(['dev:clean', buildList]));
    }

});