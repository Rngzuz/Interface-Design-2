'use strict';
var gulp = require('gulp');
var pump = require('pump');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

//string|string[] of path(s) to file(s)
var files = [
    'scss/variables.scss',
    'scss/normalize.scss',
    'scss/typography.scss',
    'scss/grid.scss',
    'scss/general.scss',
    'scss/form.scss',
    'scss/pane.scss'
];

gulp.task('style', function () {
    pump([
        gulp.src(files),
        sourcemaps.init(),
        sass.sync({
            indentWidth: 4,
            indentType: 'space',
            outputStyle: 'expanded'
        }).on('error', sass.logError),
        autoprefixer({
            browsers: [
                'last 4 versions'
            ],
            cascade: true
        }),
        concat('style.css'),
        sourcemaps.write(),
        gulp.dest('')
    ]);
});

gulp.task('default', [
    'style'
]);

gulp.task('watch', function () {
    gulp.watch(files, ['style']);
});