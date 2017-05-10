var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var srcs = {
    pages: ['src/*.html'],
    resources:['src/Resources/*']
};
var dists = {
    pages:'dist',
    resources:'dist/Resources'
}
var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(srcs.pages)
        .pipe(gulp.dest(dists.pages))
        .on('error', gutil.log);
});

gulp.task("copy-resources", function () {
    return gulp.src(srcs.resources)
        .pipe(gulp.dest(dists.resources))
        .on('error', gutil.log);
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest("dist"))
        .on('error', gutil.log);
}

gulp.task("default", ["copy-html","copy-resources"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);