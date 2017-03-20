var gulp = require('gulp');
var pump = require('pump');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('style', function () {
    pump([
        gulp.src('css/*.css'),
        sourcemaps.init(),
        autoprefixer({
            browsers: ['last 2 versions'],
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
    gulp.watch('css/*.css', ['style']);
});