const gulp = require('gulp');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const jsmin = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const less = require('gulp-less');
const path = require('path');

// 1. html的压缩
// npm i gulp-htmlmin -D
gulp.task('htmlmin', function() {
    return gulp
        .src('./src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/html'));
});


// 2. css压缩
// npm i gulp-cssmin -D
gulp.task('cssmin', function() {
    return gulp
        .src('./src/css/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css'));
})

// 3. 压缩js
// npm i gulp-uglify -D
gulp.task('jsmin', function() {
    return gulp
        .src(['./src/js/*.js', '!src/js/*.min.js'])
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/js'));
});

// 4. 压缩图片
// npm i gulp-imagemin -D
gulp.task('runimg', function () {
    return gulp.src('src/images/*.{png,gif,jpg,ico,jpeg,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});



// 5. less编译
// npm i gulp-less -D
gulp.task('less', function() {
    return gulp
        .src('./src/css/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./src/css'));
});




