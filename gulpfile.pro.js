/**
 * Created by xuchaozheng on 2016/11/16.
 */
'use strict';
var gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    revCollector = require('gulp-rev-collector'),
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    jshint = require('gulp-jshint'),
    fs = require('fs-extra'),
    tar = require('tar-fs'),
    minimist = require('minimist'),
    copy = require('gulp-copy'),
    Promise = require("bluebird"),
    moment = require('moment'),
    buildPath = 'build/public',
    paths = {
        src: {
            js: './client/js/**/*.js',
            lib: './client/lib/*.js',
            css: './client/css/*.styl',
            img: './client/images/*.*',
            html: 'client/page/*.html'
        },
        dest: {
            js: buildPath + '/js',
            lib: buildPath+ '/lib',
            css: buildPath + '/css',
            img: buildPath + '/images',
            html: buildPath,
            revjs: './rev'
        },
        rev: './rev',
        revs: './rev/*.json',
        revjs: './rev-manifest.js.json',
        revimg: './rev-manifest.img.json',
        revcss: './rev-manifest.css.json'
    };

gulp.task('build:js', function () {
    return gulp.src([paths.src.js])
        .pipe(jshint())
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(paths.dest.js))
        .pipe(rev.manifest(paths.revjs,{
            merge: true
        }))
        .pipe(gulp.dest(paths.rev));
});
gulp.task('build:lib', function () {
    return gulp.src(paths.src.lib)
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest.lib));
});
gulp.task('build:clean', function () {
    return gulp.src(['./build',paths.rev])
        .pipe(clean());
});
gulp.task('build:css', function () {
    return gulp.src(paths.src.css)
        .pipe(stylus())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rev())
        .pipe(gulp.dest(paths.dest.css))
        .pipe(rev.manifest(paths.revcss,{
            merge: true
        }))
        .pipe(gulp.dest(paths.rev));
});
gulp.task('build:img', function () {
    return gulp.src(paths.src.img)
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest(paths.dest.img))
        .pipe(rev.manifest(paths.revimg,{
            merge: true
        }))
        .pipe(gulp.dest(paths.rev));
});
gulp.task('build:html', function () {
    return gulp.src(paths.src.html)
        .pipe(htmlmin(
            {
                collapseWhitespace: true
            }
        ))
        .pipe(gulp.dest(paths.dest.html));
});
gulp.task('rev', function() {
    return gulp.src([paths.revs, './'+buildPath+'/**/*.html','./'+buildPath+'/**/*.css','./'+buildPath+'/**/*.js'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(buildPath));
});
gulp.task('cp:serve', function () {
    return gulp.src(['server.js', './serve/**', './config/**'])
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

function build () {
    gulp.run(gulpsync.sync(['build:clean', ['build:html','build:js', 'build:css','build:img','build:lib'], 'rev', 'cp:serve','tar:files']));
}

module.exports = build;