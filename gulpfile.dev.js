/**
 * Created by xuchaozheng on 2016/11/16.
 */
var gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer'),
    clean = require('gulp-clean'),
    exec = require('child_process').exec,
    config = require('./config/config'),
    devPath = 'public',
    paths = {
        src: {
            js: './client/js/**/*.js',
            lib: './client/lib/*.js',
            css: './client/css/*.styl',
            img: './client/images/*.*',
            html: 'client/page/*.html'
        },
        dest: {
            js: devPath + '/js',
            lib: devPath+ '/lib',
            css: devPath + '/css',
            img: devPath + '/images',
            html: devPath
        }
    };
gulp.task('build:js', function () {
    return gulp.src([paths.src.js])
        .pipe(gulp.dest(paths.dest.js))
});
gulp.task('build:lib', function () {
    return gulp.src(paths.src.lib)
        .pipe(gulp.dest(paths.dest.lib));
});
gulp.task('build:css', function () {
    return gulp.src(paths.src.css)
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.dest.css))
});
gulp.task('build:img', function () {
    return gulp.src(paths.src.img)
        .pipe(gulp.dest(paths.dest.img))
});
gulp.task('build:html', function () {
    return gulp.src(paths.src.html)
        .pipe(gulp.dest(paths.dest.html));
});

gulp.task('dev:clean', function () {
    return gulp.src([devPath])
        .pipe(clean());
});
gulp.task('watch:all', function () {
    gulp.watch(paths.src.img, ['build:img']);
    gulp.watch(paths.src.css, ['build:css']);
    gulp.watch(paths.src.js, ['build:js']);
    gulp.watch(paths.src.html, ['build:html']);
});
gulp.task('run:serve', function () {
    return new Promise(function (resolve, reject) {
        var cmd = exec('npm run serve', {maxBuffer: 50000 * 1024}, function (err, stdout) {
            if(err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
        cmd.stdout.pipe(process.stdout);
        cmd.stderr.pipe(process.stderr);
    });

});
function build () {
    gulp.run(gulpsync.sync(['dev:clean', ['build:html','build:js', 'build:css','build:img','build:lib'], 'watch:all', 'run:serve']));
}

module.exports = build;