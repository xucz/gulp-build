/**
 * Created by xuchaozheng on 2016/11/16.
 */
var paths = {
    src: {
        js: './client/js/**/*.js',
        lib: './client/lib/*.js',
        css: './client/css/*.styl',
        img: './client/images/*.*',
        html: 'client/page/*.html'
    },
    rev: './rev',
    revs: this.rev + '/*.json',
    revjs: this.rev + '/rev-manifest.js.json',
    revimg: this.rev + '/rev-manifest.img.json',
    revcss: this.rev + '/rev-manifest.css.json'
};
console.log(paths)