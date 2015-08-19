/**
 * Created by tongda on 15/8/19.
 */
'use strict';
var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
    return event.type === 'changed';
}

gulp.task('watch', ['scripts:watch','inject'], function () {

    gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject']);

    gulp.watch([
        path.join(conf.paths.src, '/app/**/*.css'),
        path.join(conf.paths.src, '/app/**/*.scss'),
        path.join(conf.paths.src, '/styles/{,*/}*.scss')
    ], function(event) {
        if(isOnlyChange(event)) {
            gulp.start('styles');
        } else {
            gulp.start('inject');
        }
    });


    gulp.watch([
        path.join(conf.paths.src, '/app/**/*.html')
    ], function(event) {
        browserSync.reload(event.path);
    });
});