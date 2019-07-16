import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

gulp.task('js', () => {
    return browserify('js/main.js')
        .transform('babelify', {presets: ['@babel/env']})
        .bundle()
        .on("error", function (err) { console.error(err); this.emit("end"); })
        .pipe(source('app.js')) // Readable Stream -> Stream Of Vinyl Files
        .pipe(buffer()) // Vinyl Files -> Buffered Vinyl Files
        // Pipe Gulp Plugins Here
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
         }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('js/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series('js', 'watch'));
